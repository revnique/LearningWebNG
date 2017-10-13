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

  isDragging:boolean = false;


  ngOnInit(){
    this.draw();
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
  
  drawRect(x:number, y:number, width:number, height:number) {
    var canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
  
      ctx.strokeRect(x, y, width, height);
    }
  }
  mouseDown($event:any){
    console.log("mouse down",$event);
    this.isDragging = true;
    this.dragStartX = $event.clientX;
    this.dragStartY = $event.clientY;
  }
  mouseUp($event){
    console.log("mouse up",$event);
    this.isDragging = false;
    this.dragEndX = $event.clientX;
    this.dragEndY = $event.clientY;
    this.drawRect(this.dragStartX,this.dragStartY,50,50);
  }
  drag($event){
    console.log("drag",$event);
  }
  
}
