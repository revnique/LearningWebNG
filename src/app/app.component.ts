import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dragStartX:number;
  dragStartY:number;
  dragEndX:number;
  dragEndY:number;
  dragEndXold:number;
  dragEndYold:number;
  mainCanvas:any;

  isDrawing:boolean = false;


  ngOnInit(){
    //self.draw();
    let self = this;
    self.mainCanvas = document.getElementById('canvas') as HTMLCanvasElement;
    var canvas = self.mainCanvas;
    var e:any;
    canvas.onmousedown = function(e){
      self.mouseDown(e);
    }
    canvas.onmouseup = function(e){
      self.mouseUp(e);
    } 
    canvas.onmousemove = function(e){
      self.mouseMove(e);
    }
  }

  draw() {
    var canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
  
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
    }
  }
  
  drawRect(x:number, y:number, endX:number, endY:number) {
    var canvas = this.mainCanvas;
    var canvasBox = canvas.getBoundingClientRect();
    // x = x - canvasBox.left;
    // y = y - canvasBox.top;
    // endX = endX - canvasBox.left;
    // endY = endY - canvasBox.top;
    var width = Math.abs(x - endX);
    var height = Math.abs(y - endY);
    height = height < 3 ? 2 : height;
    width = width < 3 ? 2 : width;
    var wentBackwards:boolean = false;
    var wentUpwards:boolean = false;

    if (x > endX){
      wentBackwards = true;
    }
    if (y > endY){
      wentUpwards = true;
    }
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
  
      ctx.strokeStyle="#000099";
      //ctx.strokeRect(x, y, width, height);
      //debugger;
      if(wentBackwards && wentUpwards){
        ctx.strokeRect(endX, endY, width, height);
      } else if(wentUpwards){
        ctx.strokeRect(x, endY, width, height);
      } else if(wentBackwards){
        ctx.strokeRect(endX, y, width, height);
      } else {
        ctx.strokeRect(x, y, width, height);
      }
    }
  }
  
  drawCirc(x:number, y:number, endX:number, endY:number) {
    var canvas = this.mainCanvas;
    var canvasBox = canvas.getBoundingClientRect();
    // x = x - canvasBox.left;
    // y = y - canvasBox.top;
    // endX = endX - canvasBox.left;
    // endY = endY - canvasBox.top;
    var width = Math.abs(x - endX);
    var height = Math.abs(y - endY);
    height = height < 3 ? 2 : height;
    width = width < 3 ? 2 : width;
    var wentBackwards:boolean = false;
    var wentUpwards:boolean = false;

    if (x > endX){
      wentBackwards = true;
    }
    if (y > endY){
      wentUpwards = true;
    }
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
  
      ctx.strokeStyle="#000099";
      //ctx.strokeRect(x, y, width, height);
      //debugger;
      if(wentBackwards && wentUpwards){
        ctx.str(endX, endY, width, height);
      } else if(wentUpwards){
        ctx.strokeRect(x, endY, width, height);
      } else if(wentBackwards){
        ctx.strokeRect(endX, y, width, height);
      } else {
        ctx.strokeRect(x, y, width, height);
      }
    }
  }
  mouseDown($event:any){
    console.log("mouse down",$event);
    this.isDrawing = true;
    var canvas = this.mainCanvas;
    var o = this.getMousePos(canvas, $event);
    this.dragStartX = o.x;
    this.dragStartY = o.y;
  }
  mouseUp($event){
    console.log("mouse up",$event);
    this.isDrawing = false;
    var canvas = this.mainCanvas;
    var o = this.getMousePos(canvas, $event);
    this.dragEndX = o.x;
    this.dragEndY = o.y;
  }

  mouseMove(e:any) {
    if (!this.isDrawing) {
       return;
    }
    
    var canvas = this.mainCanvas;
    var o = this.getMousePos(canvas, e);
    this.dragEndX = o.x;
    this.dragEndY = o.y;
    this.clearIt(e);

    if(this.dragEndX != this.dragEndXold || this.dragEndY != this.dragEndYold){
      this.dragEndXold = this.dragEndX;
      this.dragEndYold = this.dragEndY;
    }

    //debugger;
    this.drawRect(this.dragStartX,this.dragStartY,this.dragEndX,this.dragEndY);
};

clearIt(e:any){
  var context = this.mainCanvas.getContext('2d');
  context.canvas.width = context.canvas.width;
}




  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

  drag($event){
    console.log("drag",$event);
  }
  
}
