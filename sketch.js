let canvas;

let pTable;
let elements = [];

let titleScreen;
let onTitle = true;

let atomDisplayScreen;
let onAtomDisplay = false;
let uiBox;

let hasClicked = false;

function setup() {
  // Getting the canvas div and saving it as a variable, then setting the canvas as a child of that div
  let canvasDiv = select("#canvas");
  canvas = createCanvas(400, 400);
  canvas.parent(canvasDiv);

  pTable = new PTable();
  titleScreen = new TitleScreen();

/*
  elementInput = createInput();
  elementInput.size(80, 25);
  elementInput.position(width/2-elementInput.width/2, height/2-elementInput.height/2);
  elementInput.input(findElement);


  textAlign(CENTER);
  textSize(50);*/

}

function draw() {
  background(0);
  if (onTitle) {
    elements = titleScreen.show();
  } else if (onAtomDisplay) {
    atomDisplayScreen.update();
  }

  /*stroke(255);
  strokeWeight(1);
  line(126.5, 0, 126.5, height);
  line(273.5, 0, 273.5, height);

  textSize(30);
  fill(100, 255, 255);
  text("TYPE FORMULA", elementInput.x+elementInput.width/2, elementInput.y-30);*/
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) hasClicked = true;
}

function mouseReleased() {
  hasClicked = false;
}

//TODO
// Lav det sådan at når man har tilføjet sine atomer vil de svæve rundt med deres spindende elektroner rundt om
// Man skal kunne vælge hvor mange atomer man vil have i atomDisplayScreen
// Gøre noget med magnetisme
// Be able to also add new atoms from the atomDisplayScreen in a similar fashion as the title screen
// Remove spaces when checking for the atoms included in the formula
// If the given formula includes () or numbers, the program should recognize that it's a chemical substance and act accordingly// There should be pregiven option on the title screen for stuff like liquid simulation (you can choose the liquid), solid physics simulation etc...
// Math functions you can add (maybe with a + button, that displays the available math operations)
// Games (Merno portals would be cool)
// From title screen there should be a function to type in already known information, from which the program automatically gives all relevant quantities with the given information (stofmængde, concentration, volumen, osv...)
// Various animations: Heat, cold, explosions, particles for different things, rain, snow, lightning, electricity (try to code it yourself), osv...
// 

//KEMI
// Man kan tilføje varme med en knap som vil få atomerne til at bevæge sig hurtigere
// Man kan tilføje kulde som vil gøre dem langsommere.
// Man kan tilføje mange atomer og lave liquid simulation
// Match atomets farve til dens gruppe i det periodiske system
// For example if H2O was written, a water simulation would appear, or if some metal was given it should give a physics simulation of the solid state of that metal with the right density and forces applied (make option to resize with mouse, and other things of that nature)
// From the atomsDisplayScreen there should be options to do calculations of all sorts:
// Should display Molarmass for the displayed atoms
// Should be able to do calculations with Molarmass, like måger over bjerge, which can calculate stofmængde, which it can then use with no-cv.
// Given a chemical substance in place of just atoms example: KBrO3, it would automatically calculate the molarmass for the substance.
// There should be fields for the triangles to input values in, and calculate different quantities

//FYSIK
// Fysik mode: den bliver zoomet ud så atomerne bliver til små partikler eller kugler, hvor der derefter kan ske forskellige fysik reaktioner
// Fussion and Fission as well as radioactive decation. Be able to spawn neutrons that will direct themselfes towards the core and create reactions
// From the created atoms of fission and fussion, you should be able to click the atoms and get the chemical demonstration again

//MATEMATIK
// Statistic program that can perform binom and other relevant formulas from the various topics.
// Use statistics with the atoms, chemicals substances, physic objects and quantities (speed, acceleration, radioactivity, osv...)
// Compare the probability for different things. If you calculate your own probability it should compare it with a lot of prewritten probabilites (can find from the youtube channel that has all kinds of statistics with pictures)
// When doing the comparison, an animation should play almost like a slot machine that will stop at the most similar statistic in terms of their probability



