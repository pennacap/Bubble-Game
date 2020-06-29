
let value = 0;
let lgroup;
let bgroup;
let lives = 200;
let gameState = 0;
let time = new Date();
let score = 0;
function preload(){
  Bubble = loadImage("bubble.jpg")
}
function setup() {
  createCanvas(400,400);
  //createSprite(400, 200, 50, 50);
  lgroup = createGroup();
  bgroup = createGroup();
  shooter = createSprite(200,200,20,20)
  shooter.visible = false;
}

function draw() {
  background(240,240,240);  
  drawSprites();
  if(gameState == 1){
  push();
  //angleMode(DEGREES);
  text(lives, 190, 190);
  translate(width/2, height/2)
  if (keyIsDown(LEFT_ARROW)) {
    value -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    value += 5;
  }
  if (lives <= 0){
    gameState = 2;
    for(var i = 0; i < bgroup.length; i++){
      if(((bgroup.get(i).x>400 || bgroup.get(i).x<0)&&(bgroup.get(i).y>400 || bgroup.get(i).y<0))||(bgroup.get(i).velocityY==0 || bgroup.get(i).velocityX==0)){
        bgroup.get(i).remove();
      }
    }
    for(var i = 0; i < bgroup.length; i++){
      //if(lgroup.isTouching(bgroup.get(i))){
        bgroup.get(i).remove();
      //}
    }
    bgroup.clear();
    lgroup.clear();
    //time2 = Math.round(time.getTime()/1000);
    
    lives = 200;
  }
  score++;
  isTouchingBubb();
  rotate(value)
  triangle(0, -10, -10, 10, 10, 10);
  //console.log(radians(value))
  genBubble();
  bubbleShooter();
  pop();
}
if(gameState == 2){
  text("Time Lasted: "+Math.round(score/30)+" seconds", 150, 200);
}
if (gameState!=1){
  text("Press R to (re)start", 150, 220);
}
}
function keyPressed() {
  if (keyCode == 32){
    genBull()
  }
  if (keyCode == 82){
    gameState = 1;
    //time1 = Math.round(time.getTime()/1000);
  }
  
}
function genBull(){
  var laser = createSprite(200, 200, 1, 20);
  laser.setSpeed(5, value-90);
  laser.shapeColor = "red";
  laser.life = 30;
  laser.rotation = value;
  lgroup.add(laser);
}
function isTouchingBubb(){
  for(var i = 0; i < bgroup.length; i++){
    if(lgroup.isTouching(bgroup.get(i))){
      bgroup.get(i).remove();
    }
  }
}
function bubbleShooter(){
  if(bgroup.isTouching(shooter)){
    lives--;
  }
}
function genBubble(){
  if(frameCount % 60 == 0){
    x = Math.round(random(0, 400));
    y = Math.round(random(0, 400))
    var bubble = createSprite(x, y, 1, 1);
    bubble.addImage(Bubble);
    bubble.scale = 0.125;
    bubble.setVelocity(random(-1.5, 1.5), random(-1.5,1.5));
    bgroup.add(bubble);
  }
}
