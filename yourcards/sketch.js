const leftMargin = 50;
const topMargin = 50;
const cardW = 100;
const cardH = 150;
const gap = 20;
const numberOfCards = 4;

//Rank from 2 to A
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
//four French suits: Clubs (♣), Diamonds (♦), Hearts (♥) and Spades (♠)
const SUITS = ['C', 'D', 'H', 'S'];

//Create array of 52 cards in the default order
function createCards() {
	const cards = [];
	for (let r of RANKS) {
		for (let s of SUITS) {
			let card = {//Object --> card with 3 properties rank,suit,turn
                rank: r,
                suit: s,
                turn: false,//false --> show back, true -->show card image
            };  
			cards.push(card);
		}
	}
	return cards;
}

//shuffering an array in a random order for swapping 54 cards
function shuffleCards(array){
	let i,j,temp = 0;
	for (i = array.length - 1; i > 0; i--) {  
		// Generate random number  
		j = Math.floor(Math.random() * (i + 1)); 
		temp = array[i]; 
		array[i] = array[j]; 
		array[j] = temp; 
	} 
	return array; 
} 

let randomCards = shuffleCards(createCards());
let yourCards = [];
function createYourCards(){
    let yc = [];
    for (let i=0;i<numberOfCards;i++){
        temp = randomCards.pop();
        yc.push(temp);
    }
    return yc;
}

let cardImagesLoaded = [];
let cardBackImageLoaded =[];

function loadCardImages(){
  cardImagesLoaded = [];//Delete all first
  for (let i=0;i<numberOfCards;i++){
    let imageFilename = './images/'+yourCards[i].rank+yourCards[i].suit+'.png';
    console.log(imageFilename);
    cardImagesLoaded.push(loadImage(imageFilename));
  }
}

function preload() {
  cardBackImageLoaded = loadImage('./images/back.png');
  yourCards = createYourCards();
  loadCardImages();
}

function next(){
  if (randomCards.length>=numberOfCards){
    yourCards = createYourCards();
    loadCardImages();
  } 
}

//Turn all your cards by click button
function turnAllYourCards() {
  //Using forEach replace For
  yourCards.forEach((card) => card.turn = !(card.turn))
  
  /////
  //for (let i=0;i<numberOfCards;i++){
  //    yourCards[i].turn = !(yourCards[i].turn);
  //}
  
}

//Turn all your cards by pressing Spacebar key
function keyPressed() {
  if (keyCode == 32) {// key = 'Spacebar'
     turnAllYourCards();
  }
}

function showYourCards(){
  for (let i=0;i<numberOfCards;i++){
    if (yourCards[i].turn){
        image(cardImagesLoaded[i],leftMargin+i*cardW+i*gap,topMargin,cardW,cardH);
    }
    else{
        image(cardBackImageLoaded,leftMargin+i*cardW+i*gap,topMargin,cardW,cardH);
    }
  }  
}

function setup() {
  createCanvas(2*leftMargin+numberOfCards*cardW+(numberOfCards-1)*gap,2*topMargin+cardH);
  background("white");
  button1 = createButton('Turn all your cards');
  button1.position(width/2-60, topMargin/3);
  button1.mousePressed(turnAllYourCards);
  para3 = createElement('p',"");
  para3.position(leftMargin, height-20);
  button2 = createButton('Next '+numberOfCards+' cards >>');
  button2.position(width/2-55, height-topMargin+15);
  button2.mousePressed(next);
}

function draw() {
  showYourCards();
  para3.html("Number of Shuffed cards: " + randomCards.length);
  if (randomCards.length<numberOfCards){
    button2.attribute('disabled', '');
  }
}

