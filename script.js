/* VARIABLES */
let goldenSnitch, ghost1, ghost2, walls;
let startButton;
let screen = 0;
let img1, img2, img3, img4, img5, img6, img1Name, img2Name, img3Name, img4Name, img5Name, img6Name, goldenSnitchImg, ghost1Img, ghost2Img;
let hpFont, hpSound;

/* PRELOAD LOADS FILES */
function preload(){
  img1 = loadImage ("assets/Dumbledore1.png");
  img2 = loadImage ("assets/wand.png");
  img3 = loadImage ("assets/Cerberus.png");
  img4 = loadImage ("assets/Dobby.png");
  img5 = loadImage ("assets/Snape1.png");
  img6 = loadImage ("assets/Snape2.png");
  goldenSnitch = loadImage ("assets/Golden Snitch.png");
  ghost1 = loadImage ("assets/Moaning Myrtle.png");
  ghost2 = loadImage ("assets/NearlyHeadlessNick.png");
  hpFont = loadFont ("assets/ModernAntiqua-Regular.ttf");
  hpSound = loadSound ("assets/HedwigTheme.mp3");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  background("#7f0909");

// Play Hedwig's Theme
  hpSound.play();

// Set up the home screen
  fill ("#FFFFFF");
  textFont (hpFont);
  text("Welcome to the game!", 150, 150);
  textAlign(CENTER);
  startButton = new Sprite(width/2, height/2 + 100);

// Title
  textSize (30);
  text("The Light at the End", 200, 50);

// Create quote
  textSize (12);
  text("Remember: 'Happiness can be found even in the darkest of times \n if one remembers to turn on the light.' - Professor Dumbledore", width/2, height/2 - 100);
  textAlign(CENTER);

// Write instructions 
  text("Follow the message of Dumbledore by \n venturing to the end of the hall at Hogwarts \n and turning on the light! \n If necessary, you may use the Marauders Map. \n Make sure to avoid the ghosts!", width/2, height/2 - 25);
  
// Create player sprite
  goldenSnitchImg = new Sprite(goldenSnitch, 350, 50, 40, 40);
  goldenSnitch.color = 'white';
  goldenSnitchImg.rotationLock = true;

// Resize goldenSnitch
  goldenSnitch.resize(60,0);

// Remove goldenSnitch
  goldenSnitchImg.pos = { x: -100, y: -100 };

// Create ghost1 sprite
  ghost1Img = new Sprite(ghost1, -50, -50, 40, 40);
  ghost1Img.color = "yellow";
  ghost1Img.rotationLock = true;
  ghost1Img.collider = "k";

// Resize ghost1
  ghost1.resize(60,0);

// Remove ghost1
  //ghost1Img.pos = {x: -100, y: -100};

// Create ghost2 sprite
  ghost2Img = new Sprite(ghost2, -100, -100, 40, 40);
  ghost2Img.color = "blue";
  ghost2Img.rotationLock = true;
  ghost2Img.collider = "k";

// Resize ghost2
  ghost2.resize(60,0);

// Remove ghost2
//ghost2Img.pos = {x: -100, y: -100};

  // Create the walls
  walls = new Group();
  walls.color = 'black';
  walls.collider = 's';

  new walls.Sprite(160, 10, 300, 5,);
  new walls.Sprite(10, height/2, 5, height - 15);  
  new walls.Sprite(150, 60, 5, 100);
  new walls.Sprite(width/2 + 35, 390, 325, 5);
  new walls.Sprite(50, 300, 75, 5); 
  new walls.Sprite(340, 146, 110, 5);
  new walls.Sprite(340, 250, 110, 5);
  new walls.Sprite(285, 198, 5, 109);
  new walls.Sprite(185, 332, 5, 109);
  new walls.Sprite(190, 197, 185, 5);
  new walls.Sprite(395, 200, 5, 380);

// Hide walls
  walls.visible = false;

// Create img1 sprite on screen0
  img1Name = new Sprite(img1, 75, 325, 50, 50);
  img1Name.rotationLock = true;
  img1Name.collider = "k";

// Resize img1
  img1.resize (75,100);

// Create img2 sprite on screen0
  img2Name = new Sprite(img2, 325, 325, 50, 50);
  img2Name.rotationLock = true;
  img2Name.collider = "k";

// Resize img2
  img2.resize (75, 75);

// Create img3 sprite on screen1
  img3Name = new Sprite(img3, -75, -425, 50, 50);
  img3Name.rotationLock = true;
  img3Name.collider = "k";
  img3Name.color = "white";

// Resize img3
  img3.resize (75, 100);

// Remove img3
//img3Name.pos = {x: -100, y: -100};

// Create img4 sprite on screen1
  img4Name = new Sprite(img4, -275, -325, 50, 50);
  img4Name.rotationLock = true;
  img4Name.collider = "k";
  img4Name.color = "white";

// Resize img4
  img4.resize (75, 75);

// Remove img4
//img4Name.pos = {x: -100, y: -100};

// Create img5 sprite on screen2
  img5Name = new Sprite(img5, -75, -325, 50, 50);
  img5Name.rotationLock = true;
  img5Name.collider = "k";
  img5Name.color = "purple";

// Resize img5
  img5.resize (150, 175);
  
// Remove img5
//img5Name.pos = {x: -100, y: -100};

// Create img6 sprite on screen3
  img6Name = new Sprite(img6, -325, -325, 50, 50);
  img6Name.rotationLock = true;
  img6Name.collider = "k";
  img6Name.color = "orange";

// Resize img6
  img6.resize (150,150);

// Remove img6
//img6Name.pos = {x: -100, y: -100};
}

/* DRAW LOOP REPEATS */
function draw() {
  
// Display Start Button
  startButton.collider = "k";
  startButton.color = "#FEF24E";
  startButton.text = "Start";
  
// Check start button
  if (startButton.mouse.presses()) {
    showScreen1();
    print("pressed");
    screen = 1;
  }
  
// Move the golden snitch
   if (screen == 1) {
    background("#E3C565");
    goldenSnitchImg.moveTowards(mouse.x, mouse.y, 1);
    ghostMovement();
  }

// Move to the lose screen 
  if ((screen == 1) && ((goldenSnitchImg.collides(ghost1Img)) || (goldenSnitchImg.collides(ghost2Img)))) {
  showScreen2();
  screen = 2;
  }

// Move to the win screen
  if (goldenSnitchImg.y > 370){
    showScreen3();
    screen = 3;
  }
  
// Golden Snitch cannot go above or below maze
    if (goldenSnitchImg.y < 20) {
      goldenSnitchImg.y = 20;
  } else if (goldenSnitchImg.y > 400){
      goldenSnitchImg.y = 380;
  }
}

/* FUNCTIONS to Display Screen*/
function showScreen1(){
  
// Hide start button 
  startButton.pos = {x: -100, y: -100};
  
// Add Golden Snitch
  goldenSnitchImg.pos = {x: 350, y: 50};
  
// Add ghost1
  ghost1Img.pos = {x: 50, y: 50};

// Add ghost2
  ghost2Img.pos = {x: 100, y: 230};

// Add walls
  walls.visible = true;

// Hide imag1 & img2 from Screen0
//img1.pos = {x: -100, y: -100};
//img2.pos = {x: -100, y: -100};
img1Name.pos = {x: -100, y: -100};
img2Name.pos = {x: -100, y: -100};

// Add img3 & img4 to Screen1
img3Name.pos = {x: 340, y: 330};
img4Name.pos = {x: 340, y: 200};
  
}

// Screen 2
function showScreen2(){
  goldenSnitchImg.vel = {x:0, y: 0};
  walls.visible = false;
  ghost1Img.pos = {x: -100, y: -100};
  ghost2Img.pos = {x: -200, y: -200};
  img1Name.pos = {x: -300, y: -300};
  img2Name.pos = {x: -400, y: -400};
  img3Name.pos = {x: -900, y: -900};
  img4Name.pos = {x: -600, y: -600}; 
  img5Name.pos = {x: 200, y: 300};
  img6Name.pos = {x: -450, y: -450};
  goldenSnitchImg.pos = {x: -500, y: -500};
  background("#2a623d");
  text("Unfortunately, you have played like \n the vomit flavor of Bertie Bott's Every Flavor Beans!", width/2, height/2 - 100);
  text("You have additionally failed in your mission \n to turn on the light!", width/2, height/2 - 50);
  text("Better luck next time young spellcaster!", width/2, height/2);
  //img3.pos = {x: -150, y: -150};
  //img4.pos = {x: -175, y: -175};
  //img5.pos = {x: -125, y: -125};
}

// Screen 3
function showScreen3(){
  goldenSnitchImg.vel = {x:0, y: 0};
  walls.visible = false;
  ghost1Img.pos = {x: -100, y: -100};
  ghost2Img.pos = {x: -200, y: -200};
  img1Name.pos = {x: -400, y: -400};
  img2Name.pos = {x: -500, y: -500};
  img3Name.pos = {x: -700, y: -700};
  img4Name.pos = {x: -800, y: -800};
  img5Name.pos = {x: -900, y: -900};
  img6Name.pos = {x: 200, y: 300}; 
  goldenSnitchImg.pos = {x: -850, y: -850};
  background("#3c4e91");
  text("Fortunately, you have played like \n a pro-Quidditch seeker!", width/2, height/2 - 100);
  text("You have additionally suceeded in your mission \n to turn on the light!", width/2, height/2 -50);
  text("Congratulations young spellcaster!", width/2, height/2);
  //img3.pos = {x: -150, y: -150};
  //img4.pos = {x: -175, y: -175};
  //img5.pos = {x: -125, y: -125};
  //img6.pos = {x: -325, y: -325};
  }

function ghostMovement(){
// Ghost1 vertical movement between y=50 and y=150
  if (ghost1Img.y <= 50) {
    ghost1Img.vel.y = 3;
    ghost1Img.vel.x = 0;
  } else if (ghost1Img.y >= 150) {
    ghost1Img.vel.y = -3;
    ghost1Img.vel.x = 0;
  }
// Ghost2 horizontal movement between x=180 and x=200
  if (ghost2Img.x <= 100) {
    ghost2Img.vel.x = 3;
    ghost2Img.vel.y = 0;
  } else if (ghost2Img.x >= 200) {
    ghost2Img.vel.x = -3;
    ghost2Img.vel.y = 0;
  }
}