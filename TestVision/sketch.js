const gap = 4;
const margin = 10;
let  canvasSize = 400;
//2D Levels Array of [sizeArray,deltaColor] 
const levels = [ [2,64],[2,62],[2,60],
                 [3,58],[3,54],[3,52],
                 [4,48],[4,44],[4,42],[4,40],
                 [5,38],[5,36],[5,34],[5,32],[5,30],
                 [6,29],[6,28],[6,27],[6,26],[6,25],[6,24],[6,23],[6,22],[6,21],[6,20]
               ] 

let currentLevel = 0;
let currentSizeArray = 2;
let currentDeltaColor = 64;
let currentArray = [];//2D array of the square items 

let gameStart = false;
let clickEnable = false;
let touchEnable = true;

let currentColor0 = [];//Ramdom color for the square item
let currentColor1 = [];//Different color for only one square item
function randomColor(){
  colorMode(RGB); 
  let r = Math.floor(random()*255);//The r(ed) takes random value from 0 to 255
  let g = Math.floor(random()*255);//The g(reen) takes random value from 0 to 255
  let b = Math.floor(random()*255);//The b(lue) takes random value from 0 to 255
  currentColor0 = color(r,g,b);
  
  //then make color1 from color0 with currentDeltaColor +/- to random Red or Green or Blue
  let cTemp = [r,g,b]; 
  let i = Math.floor(random()*3);
  if (cTemp[i]>currentDeltaColor){ 
      cTemp[i] -= currentDeltaColor;
  }else{
      cTemp[i] += currentDeltaColor; 
  }
  currentColor1 = color(cTemp[0],cTemp[1],cTemp[2]);
  print(currentColor0.levels);
  print(currentColor1.levels);
}

//Initial a zero 2D square array size = n
function create2DZeroSquareArray(n){
  return Array.from(Array(n), () => new Array(n).fill(0));
}

//Make a random item = 1 in the zero 2D square array
function randomOneSquare(array2D){
  len = array2D.length;
  let i = Math.floor(random()*len);
  let j = Math.floor(random()*len);
  print(i,j);
  array2D[i][j] = 1;
  return array2D;
}

//Draw the game square board at x,y with size = w and 2 colors base on 2D square array
function drawBoard (x,y,w,c0,c1,array2D,showAnswer){
   background(255);
   let len = array2D.length;
   colorMode(RGB);
   let w1 = (w - (len-1)*gap)/len; 
   let y1 = y;
   for (let i = 0; i < len; i++) { 
      let x1 = x;
      for (let j = 0; j < len; j++){
         if (array2D[i][j] == 0){
            fill(c0);//color0 for item = 0
            noStroke();
         }
         else{
            fill(c1);//color1 for item = 1
            if (showAnswer){//showAnswer = true when Game Over
               strokeWeight(2*gap);
               stroke(0);//Show black boder of the different square when game over 
            }
         }
         square(x1, y1, w1, gap);
         x1 += (w1+gap);
      }
      y1 += (w1+gap);  
   }
}

//Checking Mouse on Square Items
function mouseMoved(){ 
  if (gameStart){
     let pixelColor = get(mouseX, mouseY);
     //Must use JSON.stringify() to compare 2 arrays
     if  (JSON.stringify(pixelColor) === JSON.stringify(currentColor0.levels) ||
          JSON.stringify(pixelColor) === JSON.stringify(currentColor1.levels)
         ){
            cursor(HAND);
            clickEnable = true;
     }else{
            cursor(ARROW);
            clickEnable = false;
     }
   }
}

//Checking mouse click right (different-color) square item or not 
function mouseClicked() {
  if (gameStart & clickEnable){    
      let pixelColor = get(mouseX, mouseY);
      if (JSON.stringify(pixelColor) === JSON.stringify(currentColor1.levels)){
           currentLevel += 1;
           if (currentLevel < levels.length){
              currentSizeArray = levels[currentLevel][0];
              currentDeltaColor = levels[currentLevel][1];
           }
           currentArray = randomOneSquare(create2DZeroSquareArray(currentSizeArray));
           randomColor();
      }
      else{
           cursor(ARROW);
           gameStart = false;
      }
  }
}

//When run on touch screen as Iphone
function touchStarted() {      
   if (gameStart & touchEnable){
      touchEnable = false;
      let pixelColor = get(mouseX, mouseY);
      if (JSON.stringify(pixelColor) === JSON.stringify(currentColor1.levels)){
            currentLevel += 1;
            if (currentLevel < levels.length){
               currentSizeArray = levels[currentLevel][0];
               currentDeltaColor = levels[currentLevel][1];
            }
            currentArray = randomOneSquare(create2DZeroSquareArray(currentSizeArray));
            randomColor();
       }
       else{
         if (JSON.stringify(pixelColor) === JSON.stringify(currentColor0.levels)){
            gameStart = false;
         }   
         
       }
       return true;
   }  
}
function mousePressed() {
   return false;
}    

///////////////////////////////////////////
function setup() {
  if (windowWidth<windowHeight)
     {canvasSize = windowWidth;
  }
  else{
     canvasSize = 400;
  }
  
  createCanvas(canvasSize, canvasSize);
  para1 = createElement('p', "");
  currentSizeArray = levels[currentLevel][0];
  currentDeltaColor = levels[currentLevel][1];
  //Create a square 2D Array with only one item = 1, all others = zero
  currentArray = randomOneSquare(create2DZeroSquareArray(currentSizeArray));
  
  //Create a ramdom color(Red, Green, Blue) for color0 and color1 
  randomColor();
  
  gameStart = true;
}

function draw() {  
  if (gameStart){       
   drawBoard (margin,margin,canvasSize-2*margin,currentColor0,currentColor1,currentArray,false);
   touchEnable = true;
    para1.html("Level: "+currentLevel);
  }else{
    drawBoard (margin,margin,canvasSize-2*margin,currentColor0,currentColor1,currentArray,true);
    para1.html("Game over at level "+currentLevel);
  }
  
}