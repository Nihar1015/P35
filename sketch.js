//Create variables here

var dogImg, happyDogImg
var dog
var foodStock
var foodS 
var milkImg
var feed;
var fedTime, lastfed
var foodObj


function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  milkImg = loadImage("Milk.png");
}

function setup() {
  createCanvas(1200, 800);
  
  database = firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value", readStock);

  dog = createSprite(250, 350, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  
  
}


function draw() {  
  background(46,139,87);

  Food.display();

   feed = createButton("Feed the Dog");
   feed.position(700,95);
   feed.mousePresses(feedDog);

   addFood = createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePresses(addFoods);

   fedTime = database.ref('FeedTime');
   fedTime.on("value", function(data){
     lastFed = data.val();
   })

  
  }

  fill(255,255,254);
  textSize(15);
  if(lasFed==0){
    text("Last Fed:" + lastfed%12 + "PM", 350,30);
  }else if(lastfed == 0){
    text("Last Fed: 12 AM", 350,30);
  }else{
    text("Last Fed:" + lastfed + "AM", 350,30);
  }
  drawSprites();
  //add styles here
  fill("white");
  textSize(15);
  text("Use the up arrow key to feed Acid", 140, 20);
  text("Food remaining:" + foodS, 200, 250);
  



function readStock(data){
  foodS = data.val();
  console.log(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
  

}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



