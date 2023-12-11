let gameStarted = false;
let theSky;
let backgroundY1;
let backgroundY2;
let scrollSpeed = 2;
let soundtrack,hit;
let bird;
let balloons;
let obstaclesArray = [];
let lastGemTime = 0;
let gameLevel = 1;

// Default P5JS functions: preload, setup, draw ///////////////////////////////////
function preload() {
  theSky = loadImage("assets/sky.jpg");
  soundtrack = loadSound("assets/soundtrack.mp3");
  hit = loadSound("assets/hit.mp3");
}

function setup() {
  new Canvas(windowWidth, windowHeight);
  world.gravity.y = 2;//set gravity for game (p5play)
  backgroundY1 = 0;
  backgroundY2 = height;

  //Show Start Dialog
  const modalStartDialog = document.getElementById("start-dialog");
  modalStartDialog.style.display = "block";
  //When Start button click
  document.getElementById("start-button").addEventListener("click", (e) => {
    soundtrack.loop(); //start playing soundtrack (loop)
    modalStartDialog.style.display = "none"; //Close Start Dialog
    makeBalloons();
    makeBird();
    gameStarted = true;
  });
}
function draw() {
  scrollingDownBackground();
  if (gameStarted) {
    bird.moveTowards(mouse);
    createGroupOfObstacles();
    obstaclesArray.forEach(scrollingObstacles);
    obstaclesArray.forEach(removeOffScreenObstaclesAndCheckCollision);
    checkCollision(balloons, bird);
  }
}
// End Default P5JS functions/////////////////////////////////////////////

//Make the scrolling-down background
function scrollingDownBackground() {
  image(theSky, 0, backgroundY1, windowWidth, windowHeight);
  image(theSky, 0, backgroundY2, windowWidth, windowHeight);
  backgroundY1 += scrollSpeed;
  backgroundY2 += scrollSpeed;
  if (backgroundY1 >= height) {
    backgroundY1 = -height;
  }
  if (backgroundY2 >= height) {
    backgroundY2 = -height;
  }
}

//Make the balloons (static Sprite P5 Play)
function makeBalloons() {
  balloons = new Sprite();
  balloons.x = width / 2;
  balloons.y = height-150;
  balloons.width = 100;
  balloons.height = 200;
  balloons.img = "assets/balloons.png";
  balloons.collider = "static";
}

//Make the bird (kinematic Sprite P5 Play)
function makeBird() {
  noStroke();
  bird = new Sprite();
  bird.x = width / 2;
  bird.y = height / 2;
  bird.diameter = 80;
  bird.img = "assets/bird.png";
  bird.collider = "kinematic";
}

///Make a Group (p5play) of Obstacles (p5play Sprites) then push to obstaclesArray
//typeOfSprites = "Squares" or "Dots" or "Rectangles" or "Pigs" or "Airplane"
function makeGroupOfObstacles(amount, typeOfSprites) {
  groupObs = new Group();
  groupObs.y = 10;
  groupObs.bounciness = 0.3;
  groupObs.moveTowards(balloons, gameLevel);
  while (groupObs.length < amount) {
    let obs = new groupObs.Sprite();
    if (typeOfSprites == "Squares") {
      obs.width = random(20, 80);
      obs.height = obs.width;
      obs.rotationSpeed = 5;
      obs.x = random(0, width);
      obs.textSize = 18;
      obs.text = gameLevel;
    }
    if (typeOfSprites == "Dots") {
      obs.diameter = random(20, 80);
      obs.x = random(0, width);
      obs.speed = 3;
      obs.direction = random(0,180);
      obs.textSize = 18;
      obs.text = gameLevel;
    }
    if (typeOfSprites == "Rectangles") {
      obs.width = random(20, 80);
      obs.height = random(20, 80);
      obs.x = width / 2;
      obs.y = random(0, 30);
      obs.rotationSpeed = 1;
      obs.textSize = 18;
      obs.text = gameLevel;
    }
    if (typeOfSprites == "Pigs") {
      obs.scale = random(0.3,1.1);
      obs.img = "assets/pig.png";
      obs.x = random(0, width);
      obs.moveTowards(balloons, 0.01);
      obs.speed = obs.scale;
    }
    if (typeOfSprites == "Airplane") {
      obs.scale = random(0.5,1.1);
      obs.collider = "kinematic";
      obs.img = "assets/airplane.png";
      obs.x = 0;
      obs.y = random(5,height/3);
      obs.moveTowards(balloons, 0.01);
      obs.direction = -10;
      obs.speed = 10*obs.scale;
      obs.bounciness = 2;
    }
  }
  obstaclesArray.push(groupObs);
}

//scrolling down all obstacles in a group
function scrollingObstacles(groupObs) {
  for (let i = 0; i < groupObs.length; i++) {
    groupObs[i].position.y += scrollSpeed;
  }
}

//Remove group of obstacles with length = 0 and Remove all obstacles outside the canvas, check collision with balloons simultaneously
function removeOffScreenObstaclesAndCheckCollision(groupObs, index) {
  length = groupObs.length;
  if (length == 0) {
    obstaclesArray.splice(index, 1);
    //console.log("Removing group of obstacle at index:", index);
  } else {
    for (let i = length - 1; i >= 0; i--) {
      if (checkCollision(groupObs[i])) {
        //Check collision with the balloons
        break;
      }
      if (//Not remove when the obstacle above the screen 
        groupObs[i].position.x + groupObs[i].width / 2 < 0 ||
        groupObs[i].position.x - groupObs[i].width / 2 > width ||
        groupObs[i].position.y - groupObs[i].height / 2 > height
      ) {
        console.log("Removing obstacle at index:", i);
        groupObs[i].remove();
      }
    }
  }
}
//Process when there is a collision
function checkCollision(obstacle) {
  if (obstacle.collides(balloons)) {
    soundtrack.stop(0.01);
    hit.play();
    gameStarted = false;
    balloons.img = "assets/boom.png";
    //Show GameOver Dialog
    const modalGameOverDialog = document.getElementById("game-over-dialog");
    modalGameOverDialog.style.display = "block";
    //When Play again button click
    document
      .getElementById("play-again-button")
      .addEventListener("click", (e) => {
        location.reload();
      });
    return true;
  } else {
    return false;
  }
}

function createGroupOfObstacles() {
  if (frameCount - lastGemTime > 5 * 60) {
    if (frameCount % 5 === 0) {
      makeGroupOfObstacles(gameLevel * 2, "Squares");
    } else if (frameCount % 5 === 1) {
      makeGroupOfObstacles(gameLevel * 2, "Dots");
    } else if (frameCount % 5 === 2) {
      makeGroupOfObstacles(gameLevel * 2, "Rectangles");
    } else if (frameCount % 5 === 3) {
      makeGroupOfObstacles(gameLevel * 2, "Pigs");
    } else {
      makeGroupOfObstacles(1, "Airplane");
    }
    lastGemTime = frameCount;
  }
  if (frameCount < 20000) {
    gameLevel = Math.floor(1 + frameCount / 500); //increase the gameLevel
  }
}
