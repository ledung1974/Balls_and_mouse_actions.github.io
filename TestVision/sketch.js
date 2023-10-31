const gap = 4;

let currentArray = [];
let currentSizeArray = 5

let currentColor0 = [];
let currentColor1 = [];
const deltaColor = 48;
function randomColor(){
   //Using colorMode is HSB (HUE, SATURATION, BRIGHTNESS)
   let h = Math.floor(random()*360);//The h(ue) parameter takes random value from 0 to 360
   let s = Math.floor(random()*100);//The s(aturation) parameter random takes value from 0 to 100
   let b = Math.floor(random()*255);//The b(rightness) parameter random takes value from 0 to 100
   currentColor0 = color(h,s,b);
   //then make color1 from color0 with deltaColor
   let b1 = b;
   if (b>deltaColor){ 
      b1 -= deltaColor;
   }else{
      b1 += deltaColor; 
   }
   currentColor1 = color(h,s,b1);
}

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
   colorMode(HSB);
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
  //Create a square 2D Array with only one item = 1, all others = zero
  currentArray = randomOneSquare(create2DZeroSquareArray(currentSizeArray));
  
  //Create a ramdom color(HUE, SATURATION, BRIGHTNESS) for color0 and color1 
  randomColor();
}


function draw() {
  background(255);
  drawBoard (4,4,380,currentColor0,currentColor1,currentArray); 
}