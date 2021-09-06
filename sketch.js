var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1
var bullet,bubble;
function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 660);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2;

  heading = createElement("h1");
  scoreboard = createElement("h1");
  lifetime=createElement("h1");

  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
 /* textSize(20);
  text("score:"+score,600,100);
*/
  
  if(gameState===1){
    gun.y=mouseY  

if(keyDown("space")){
 shootBullet();

}
 drawblueBubble();
   drawredBubble();
   handleBubbleCollision(blueBubbleGroup);
   handleBubble2Collision(redBubbleGroup);
   handleGameOver(blueBubbleGroup)

  /* if(bulletGroup.isTouching(blueBubbleGroup)){
     score=score+1;
     blueBubbleGroup.destroyEach();
     bulletGroup.destroyEach();
   }
   if(bulletGroup.isTouching(redBubbleGroup)){
    score=score+1;
    bulletGroup.addImage(blastImg)
    redBubbleGroup.destroyEach();
    bulletGroup.destroyEach();
  }
*/
    scoreboard.html("Score:"+score);
    scoreboard.style('color:red');
    scoreboard.position(width-200,20);

    lifetime.html("Life:"+life);
    lifetime.style('color:green');
    lifetime.position(200,20);
  }
  
  console.log(life);
   drawSprites();
     
}

function shootBullet(){
  bullet=createSprite(100,gun.y,10,10);
  bullet.addImage(bulletImg);
  bullet.velocityX=4
  bullet.scale=.2;
  bullet.lifetime=347;
  bulletGroup.add(bullet);
}


function drawblueBubble(){
if (frameCount % 120 === 0){
bubble=createSprite(700,550,20,20);
bubble.y = Math.round(random(100,400));
bubble.addImage(blueBubbleImg);
bubble.scale=.1;
bubble.velocityX=-6;
bubble.lifetime=347;
blueBubbleGroup.add(bubble);

}
}
function drawredBubble(){
  if (frameCount % 100 === 0){
  bubble2=createSprite(700,550,20,20);
  bubble2.y = Math.round(random(420,700));
  bubble2.addImage(redBubbleImg);
  bubble2.scale=.1;
  bubble2.velocityX=-6;
  bubble2.lifetime=347;
  redBubbleGroup.add(bubble2);
  
  }
  }



 function handleBubbleCollision(blueBubbleGroup){
if (life>0 && bulletGroup.isTouching(blueBubbleGroup) ) {
  score=score+1;
  blast=createSprite(bullet.x,gun.y);
  blast.addImage(blastImg);
  blast.scale=.25;
  bulletGroup.destroyEach();
  blueBubbleGroup.destroyEach();
  blast.lifetime=20;
}

  }


  
 function handleBubble2Collision(redBubbleGroup){
  if (life>0 && bulletGroup.isTouching(redBubbleGroup) ) {
    score=score+1;
    blast=createSprite(bullet.x,gun.y);
    blast.addImage(blastImg);
    blast.scale=.25;
    bulletGroup.destroyEach();
    redBubbleGroup.destroyEach();
    blast.lifetime=20;
  }
  
    }


    function handleGameOver(blueBubbleGroup){
    if (blueBubbleGroup.isTouching(backBoard)) {
      life=life-1;
      blueBubbleGroup.destroyEach();
    }
    if (redBubbleGroup.isTouching(backBoard)) {
      life=life-1;
      redBubbleGroup.destroyEach();
    }

   if (life<=0) {
     gameState=2;
     swal({
     title:'Game Over',
     text:"Oops you lost the game....!!!",
     text:"Your Score is "+score,
     imageUrl:
     "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"



     
     })

   }

    }