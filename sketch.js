var trex, trex_running, trex_collided;
var ground, invisibleGround, cactus1, cactus2, cactus3, groundImage, cactus4, cactus5, cactus6;
var dieSound, jumpSound, checkSound;
var cloud, cloudsGroup, cloudImage;
var score = 0
var gameState = "play";
var gameOver, gameOverImage;
var newImage, cactiGroup, cloudGroup;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  dieSound = loadSound("die.mp3")
  jumpSound = loadSound("jump.mp3")
  checkSound = loadSound("checkPoint.mp3")
  cactus1 = loadImage("obstacle1.png")
  cactus2 = loadImage("obstacle2.png")
  cactus3 = loadImage("obstacle3.png")
  cactus4 = loadImage("obstacle4.png")
  cactus5 = loadImage("obstacle5.png")
  cactus6 = loadImage("obstacle6.png")

  gameOverImage = loadImage("gameOver.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

}

function setup() {
  createCanvas(600, 200);
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImage)
  gameOver.visible = false
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)

  trex.scale = 0.6;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  cactiGroup = new Group()
  cloudGroup = new Group()

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  console.log("Hello" + 5)

}

function draw() {
  background(180);

  if (gameState === "play") {
    trex.changeAnimation("running", trex_running)
    gameOver.visible = false
    score = score + Math.round(frameRate() / 250);
    ground.velocityX = -6;

    if (score % 100 === 0 && score !=0) {
      checkSound.play();
    }

    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
      jumpSound.play();
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //spawn the clouds
    spawnClouds();
    spawnCactus()
    if (cactiGroup.isTouching(trex)) {
      dieSound.play();
      gameState = "end"
    }
  } else if (gameState === "end") {

    gameOver.visible = true
    ground.velocityX = 0
    trex.changeAnimation("collided", trex_collided);
    cactiGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    cactiGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    if (keyDown("enter") || mousePressedOver(gameOver)) {
      score = 0
      cactiGroup.destroyEach();
      cloudGroup.destroyEach();

      gameState = "play"



    }
  }

  console.log(gameState)
  text("Score: " + score, 77, 16);




  trex.velocityY = trex.velocityY + 0.8

  trex.collide(invisibleGround);


  drawSprites();
}

function spawnCactus() {




  if (frameCount % 60 === 0) {

    cactus = createSprite(600, 160, 14, 30);
    cactiGroup.add(cactus);


    cactus.velocityX = -6

    var rishu = Math.round(random(1, 6))



    switch (rishu) {

      case 1:
        cactus.addImage(cactus1);
        break;

      case 2:
        cactus.addImage(cactus2);
        break;

      case 3:
        cactus.addImage(cactus3);
        break;



      case 4:
        cactus.addImage(cactus4);
        break;


      case 5:
        cactus.addImage(cactus5);
        break;


      case 6:
        cactus.addImage(cactus6);
        break;

      default:
        break;



    }
    cactus.scale = 0.4
  }
}








function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudGroup.add(cloud);


    //assigning lifetime to the variable
    cloud.lifetime = 134

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
  }
}