let theSky;
let y1;
let y2;
let scrollSpeed = 3;
let mainBall;
let gems =[];
let gem2 = [];
let gem3 = [];
let lastGemTime = 0;
let balloon;


// class Obstacle(){
  
// }






function preload(){
  theSky = loadImage("assets/sky.jpg")
}

function setup() {
	new Canvas(windowWidth, windowHeight);
  y1 = 50;
  y2 = -550;
  makePlayer()
  makeBalloon()
  dotsObstacle();
  removeOffscreenObstacles(gems);
  removeOffscreenObstacles(gem2);
  removeOffscreenObstacles(gem3);
}

function draw() {
  moveBackground()
  mainBall.moveTowards(mouse);
  scrollingObstacle(gems)
  if (frameCount - lastGemTime > 5 * 60) { 
    if (frameCount % 3 === 0) {
      makeGemSquare();
      } 
    else if (frameCount % 3 === 1) {
        makeGemSquare();
        dotsObstacle()
      } 
    else {
        makeGemRect();
      }
      lastGemTime = frameCount; 
    }
    updateGem()
  }






function updateGem(){
    //update and draw the gems in gem3 group
    if (gems) {
      scrollingObstacle(gems)
      }
 
      //update and draw the gems in gem2 group
      if (gem2) {
        scrollingObstacle(gem2)
      }
 
      //update and draw the gems in gems group
      if (gem3) {
        scrollingObstacle(gem3)
      }
  }
 
  



function makePlayer() {
  noStroke();
  mainBall = new Sprite(width / 2, height / 2, 50, "lavender");
  
}


function dotsObstacle() {
  gems = new Group();
  gems.diameter = 10;
  gems.x = () => random(0, width);
  gems.y = 0;
  gems.amount = 200;
}

function makeGemSquare() {
  gem2 = new Group();
  gem2.width = 50;
  gem2.height = 10;
  gem2.x = () => random(0, width);
  gem2.y = 0
  gem2.amount = 100;
}

function makeGemRect() {
  gem3 = new Group();
  gem3.width = 300;
  gem3.height = 10;
  gem3.x = width / 2;
  gem3.y = 0
  gem3.amount = 5;
  while (gem3.length < 9){
  let newGem = new gem3.Sprite();
  newGem.y = gem3.length * 10;
  }
}




//make scrolling background
function moveBackground() {
  image(theSky, 0, y1, windowWidth, windowHeight);
  image(theSky, 0, y2, windowWidth, windowHeight);
  y1 += scrollSpeed;
  y2 += scrollSpeed;
  if (y1 >= windowHeight) {
    y1 = -500;
  }
  if (y2 >= windowHeight) {
    y2 = -500;
  }
}


function scrollingObstacle(gemGroup){
  for (let i = 0; i < gemGroup.length; i++) {
    gemGroup[i].y += scrollSpeed; 
  }
}

function removeOffscreenObstacles(gemGroup) {
  for (let i = gemGroup.length - 1; i >= 0; i--) {
    if (gemGroup[i].y > windowHeight || gemGroup[i].x > windowWidth ) {
      gemGroup[i].remove();
    }
  }
}

function checkCollide(balloon, obstacle){
  if (balloon.collides(obstacle)){
    return true;
  }
}

function makeBalloon(){
  balloon = new Sprite(width / 2, height / 2 + 400, 50, "grey");
}