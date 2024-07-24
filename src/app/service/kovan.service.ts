import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class KonvaService {
  private stage!: Konva.Stage;
  private layer!: Konva.Layer;
  private transformer!: Konva.Transformer;
  private selectionRectangle!: Konva.Rect;
  private selecting = false;
  private x1 = 0;
  private y1 = 0;
  private x2 = 0;
  private y2 = 0;

  initialize(container: HTMLDivElement, width: number, height: number): void {
    this.stage = new Konva.Stage({
      container: container,
      width: width,
      height: height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.transformer = new Konva.Transformer();
    this.layer.add(this.transformer);

    this.selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
      listening: false,
    });
    this.layer.add(this.selectionRectangle);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.stage.on('mousedown touchstart', this.onStartSelection.bind(this));
    this.stage.on('mousemove touchmove', this.onMoveSelection.bind(this));
    this.stage.on('mouseup touchend', this.onEndSelection.bind(this));
    this.stage.on('click tap', this.onStageClick.bind(this));
  }

  private onStartSelection(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>): void {
    if (e.target !== this.stage) return;

    e.evt.preventDefault();
    const pointer = this.stage.getPointerPosition();
    if (!pointer) return;

    this.x1 = pointer.x;
    this.y1 = pointer.y;
    this.x2 = this.x1;
    this.y2 = this.y1;

    this.selectionRectangle.width(0);
    this.selectionRectangle.height(0);
    this.selecting = true;
  }

  private onMoveSelection(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>): void {
    if (!this.selecting) return;

    e.evt.preventDefault();
    const pointer = this.stage.getPointerPosition();
    if (!pointer) return;

    this.x2 = pointer.x;
    this.y2 = pointer.y;

    this.selectionRectangle.setAttrs({
      visible: true,
      x: Math.min(this.x1, this.x2),
      y: Math.min(this.y1, this.y2),
      width: Math.abs(this.x2 - this.x1),
      height: Math.abs(this.y2 - this.y1),
    });
  }

  private onEndSelection(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>): void {
    this.selecting = false;
    if (!this.selectionRectangle.visible()) return;

    e.evt.preventDefault();
    this.selectionRectangle.visible(false);

    const shapes = this.stage.find('.rect');
    const box = this.selectionRectangle.getClientRect();
    const selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    this.transformer.nodes(selected);
  }

  private onStageClick(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>): void {
    if (this.selectionRectangle.visible()) return;

    if (e.target === this.stage) {
      this.transformer.nodes([]);
      return;
    }

    if (!e.target.hasName('rect')) return;

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = this.transformer.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      this.transformer.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      const nodes = this.transformer.nodes().slice();
      nodes.splice(nodes.indexOf(e.target), 1);
      this.transformer.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      const nodes = this.transformer.nodes().concat([e.target]);
      this.transformer.nodes(nodes);
    }
  }

  addImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const konvaImage = new Konva.Image({
          x: 80,
          y: 80,
          image: img,
          width: img.width / 2,
          height: img.height / 2,
          name: 'rect',
          draggable: true,
        });
        this.layer.add(konvaImage);
        this.layer.draw();
        this.transformer.nodes([konvaImage]);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

 
  clearCanvas(): void {
    this.layer.removeChildren();
    this.layer.draw();
    this.transformer.nodes([]);
  }

  drawText(text: string): void {
    const textNode = new Konva.Text({
      x: 50,
      y: 70,
      fontSize: 30,
      text: text,
      name: 'rect',
      draggable: true,
    });
    this.layer.add(textNode);
    this.layer.draw();
    this.transformer.nodes([textNode]);
  }

  deleteSelected() {
    const selectedNodes = this.transformer.nodes();
    selectedNodes.forEach(node => {
      node.remove();
    });
    this.transformer.nodes([]);
    this.layer.draw();
  }

}
