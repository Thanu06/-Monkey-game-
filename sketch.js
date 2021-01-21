var player, player_running;
var bananaImg, obstacleImg, bgImg;
var ObstaclesGroup, bananaGroup;
var score;
var ground;
var jungle;


function preload() {
  bgImg = loadImage("jungle.jpg");

  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  bananaImg = loadImage("banana.png");

  obstacleImg = loadImage("stone.png");
}



function setup() {
  createCanvas(400, 400);

  jungle = createSprite(200, 200, 400, 400);
  jungle.velocityX = -4;
  jungle.addImage("Background", bgImg);
  jungle.x = jungle.width / 2;
  console.log(jungle.x);
  console.log(jungle.width);
  

  player = createSprite(60, 380, 20, 50);
  player.addAnimation("player", player_running);
  player.scale = 0.2;

  ground = createSprite(200, 380, 400, 20);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  ObstaclesGroup = new Group();
  bananaGroup = new Group();

  score = 0;

}

function draw() {
  background(220);

  drawSprites();
  
  

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (jungle.x < 0) {
    jungle.x = jungle.width / 2;
  }

 if (keyDown("space") && player.y>=300) {
    player.velocityY=-12;
  }
//console.log(player.y);
  player.velocityY = player.velocityY + 0.8;

  player.collide(ground);

  spwanFood();
  spawnObstacles();
  
  if(bananaGroup.isTouching(player))
     {
     score=score+2;
       bananaGroup.destroyEach();
       
      
     }
  
   if (ObstaclesGroup.isTouching(player))
  {
    player.scale=0.15;
  }

  switch (score) {
    case 10:player.scale=0.12
      break;
      case 20:player.scale=0.14
      break;
      case 30:player.scale=0.16
      break;
      case 40:player.scale=0.18
      break;
      
    
  }

 

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,50,50);          

}

function spwanFood() {
  if (frameCount % 150 == 0) {
    var banana = createSprite(400, 320, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 134;

    bananaGroup.add(banana);
  }

}

function spawnObstacles() {
  if (frameCount % 100 == 0) {
    var stone = createSprite(400, 365, 10, 40);
    stone.velocityX = -6;
    stone.addImage(obstacleImg);
    stone.scale = 0.15;
    stone.lifetime = 70;

    ObstaclesGroup.add(stone);
  }
}