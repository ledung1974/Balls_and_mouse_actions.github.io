// P5JS default function
function setup() {
  let ballCanvas = createCanvas(windowWidth,windowHeight-100);
  ballCanvas.position(0,50);
    
  para1 = createElement('p', 'Maximum of balls:');
  para1.position(20, 0);
  
  inputBallMax = createInput(ballMax.toString(),'number');
  inputBallMax.position(para1.x+130, 15);
  inputBallMax.size(35);
  inputBallMax.changed(changeBallMax);

  para2 = createElement('p', 'Current number of balls:');
  para2.position(inputBallMax.x + inputBallMax.width + 10, 0);
  para3 = createElement('p', "--");
  para3.position(inputBallMax.x + inputBallMax.width + 175, 0);
  para4 = createElement('p', "Mouse action: " + mouseAction);
  para4.position(width - 160, 0);
  
  para5 = createElement('p', "Emma say: Please press Spacebar to change Mouse actions >> Create or Pickup a ball !");
  para5.position(20, height+50);

  soundFormats('mp3', 'ogg');
  createSound = loadSound('create.mp3');
  pickupSound  = loadSound('pickup.mp3');
  cursor("progress");
}

// P5JS default function 
function draw() {
  background(canvasBackground);
  displayBall();
  para3.html(balls.length);//Always update the number of balls
  para4.html("Mouse action: " + mouseAction);//Always update the mouse action
}

//Changing the ballMax from InputBallMax element  
function changeBallMax(){
    if (isFinite(inputBallMax.value())){
        n = int(inputBallMax.value());
        if (n>=balls.length && n<numMax){
           ballMax = n;
           if (balls.length == ballMax){
              mouseAction = "Pickup";
              cursor(HAND);
           }
        }
        else
        {
           inputBallMax.value(ballMax);
        }  
    }
    else{
      inputBallMax.value(ballMax);
    }
  
}


//Display all balls 
function displayBall(){
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
    
    for (let j = 0; j < balls.length; j++) {
       if (i != j){
           balls[i].checkCollision(balls[j]);
       } 
    }
  }
}

//Checking Mouse on Canvas
function mouseOnCanvas(){
   if ( width  >= mouseX && 
         0     <= mouseX && 
        height >= mouseY && 
         0     <= mouseY )
      {return true } 
    else 
      {return false}
}

//Create a new ball no collision with other balls
function createNewBallNoCollision (){
  bColor = color(random(255),random(255),random(255));
  tempBall = new Ball(mouseX, mouseY, ballSize, bColor); 
  let noCollision = true;
  for (let i = 0; i < balls.length; i++) {
         if (balls[i].checkCollision(tempBall)){ 
           noCollision = false;
           break;
         }
  }
  if (noCollision){
    append(balls, tempBall);
    createSound.play();
  }
}

//Check when the mouse is clicked (on Canvas only)
function mouseClicked() {
  if (mouseOnCanvas()){
    if (mouseAction == "Create"){
       if (balls.length < ballMax) {
           createNewBallNoCollision();
           if (balls.length == ballMax){
           mouseAction = "Pickup";
           cursor(HAND);
           }
       }
    } 
    else{
       if (mouseAction == "Pickup"){
          for (let i = 0; i < balls.length; i++) {
             if (balls[i].checkMouseOn(mouseX,mouseY)){
                 pickupSound.play();
                 balls.splice(i,1);//Delete the clicked ball from balls
             } 
          }
          if (balls.length == 0){
             mouseAction = "Create";
             cursor("progress");
          }
       }
    }
  }
}



//Changing mouse action by pressing Spacebar key
function keyPressed() {
  if (keyCode == 32) {// key = 'Spacebar'
     if (mouseAction == "Pickup" && balls.length < ballMax) {
         mouseAction = "Create";
         cursor("progress");
     }
     else{
         mouseAction = "Pickup";
         cursor(HAND);
     }
  } 
}

           