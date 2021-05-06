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
  createCanvas(1000, 600);
  
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(850, 200, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  feed = createButton("Feed the Dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood = createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);

   fedTime = database.ref('FeedTime');
   fedTime.on("value", function(data){
     lastfed = data.val();
   })
  
  
}


function draw() {  
  background(46,139,87);

  foodObj.display();
   fill("white");
  textSize(15);
  if(lastfed>=12){
    text("Last Fed:" + lastfed%12 + "PM", 350,30);
  }else if(lastfed == 0){
    text("Last Fed: 12 AM", 350,30);
  }else{
    text("Last Fed:" + lastfed + "AM", 350,30);
  }

 
  

  drawSprites();

  }

  
  
  //add styles here
  
  



function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  console.log(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
  

}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



