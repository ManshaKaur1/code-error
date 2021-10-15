var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rocket , rocketImg ;
var space , spaceImg ;
var bullet , bulletImg ;
var score=0;
var rocketBurstSound , collidedSound ;
var rock , rockImg ;
var gameOver , restart
var invisibleGround ; 
var obstaclesGroup , stone , stone2 , rock ;


function preload(){
  rocketBurstSound = loadSound("rocketBurst.mp3");
  collidedSound = loadSound("collided.wav");

  spaceImg = loadImage("space.jfif");
  rock = loadImage("rock.jpg");
  stone = loadImage("stone.jpg");
  stone2 = loadImage("stone2.jfif");
  
  rocket = loadAnimation("rocket 2.jpg")
  bullet = loadAnimation("bullet.jpg")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
   rocket = createSprite(200,height-70,20,50);
   rocket.addAnimation("rocket")
   rocket.setCollider('circle',0,0,350)

   invisibleGround = createSprite(width/2,height-10,width,125);  
   invisibleGround.shapeColor = "#f4cbaa";

   gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();

  score = 0;
}
 function draw() {
space("spaceImg");
    textSize(20);
    fill("black");
    text("Score: "+ score,30,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    space.velocityY = -(6 + 3*score/100);
}

if (touches.length >0 || keydown("space")) {
    rocketBurstSound.play()
    bullet.velocityY = 2
    obstaclesGroup.destroyEach();
    touches = [];  
 }

trex.velocityY = trex.velocityY + 0.8
rocket.collide(invisibleGround);
if(obstaclesGroup.isTouching(rocket)){
    collidedSound.play()
    gameState = END;
}

else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    rocket.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    if(touches.length>0 || keyDown("SPACE")) {      
        reset();
     touches = []
      }
}
drawSprites();
}