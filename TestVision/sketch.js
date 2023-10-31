const gap = 4;
let currentArray = [];
let currentSizeArray = 4
let currentColor0 = [];
let currentColor1 = [];

function create2DZeroSquareArray(n){
  return Array.from(Array(n), () => new Array(n).fill(0));
}

function randomOneSquare(array2D){
  len = array2D.length;
  let i = Math.floor(random()*len);
  let j = Math.floor(random()*len);
  print(i,j);
  array2D[i][j] = 1;
  return array2D;
}

function drawBoard (x,y,w,c0,c1,array2D){
   len = array2D.length;
   noStroke();
   w1 = (w - (len-1)*gap)/len; 
   let y1 = y;
   for (let i = 0; i < len; i++) { 
      let x1 = x;
      for (let j = 0; j < len; j++){
         if (array2D[i][j] == 0){
            fill(c0);
         }
         else{
            fill(c1);
         }
         square(x1, y1, w1, gap);
         x1 += (w1+gap);
      }
      y1 += (w1+gap);  
   }
   
}

function setup() {
  createCanvas(400, 400);
  currentArray = randomOneSquare(create2DZeroSquareArray(currentSizeArray));  
}


function draw() {
  background(220);
  currentColor0 = color(240,150,150);
  currentColor1 = color(200,150,150);
  
  drawBoard (4,4,380,currentColor0,currentColor1,currentArray); 
}