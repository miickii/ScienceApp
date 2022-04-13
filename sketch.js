let canvas;
let frP;
let frAvg = 0;
let frCounter = 0;

let pTable;
let elements = [];

let titleScreen;
let onTitle = true;

let atomDisplayScreen;
let onAtomDisplay = false;
let uiBox;

let hasClicked = false;
let clickCooldown = 0;

//NEW NEW NEW
let arrayTableMapper;
let randomArray;
let table;
//----------------------------------------------------------------------------------------------------------

function setup() {
  // Getting the canvas div and saving it as a variable, then setting the canvas as a child of that div
  let canvasDiv = select("#canvas");
  canvas = createCanvas(500, 400);
  canvas.parent(canvasDiv);
  frP = createP("");
  frP.position(0, height);

  pTable = new PTable();
  titleScreen = new TitleScreen();

  //NEW NEW NEW
  arrayTableMapper = new ArrayTableMapper();
  /*
  randomArray = arrayTableMapper.createRandomArray(4, 4)
  table = arrayTableMapper.createTable(randomArray);

  // Print value at row 3, column 2 from the randomArray
  console.log(arrayTableMapper.valueAt(3, 2));

  // Print value at row 3, column 2 from the created table
  console.log(table[3][2]);
  //----------------------------------------------------------------------------------------------------------
  */

}

function draw() {
  background(0);
  clickCooldown--;

  if (onTitle) {
    elements = titleScreen.show();
  } else if (onAtomDisplay) {
    atomDisplayScreen.update();
  }

  frAvg += parseFloat(frameRate());
  frCounter++;
  if (frCounter == 1)
  {
    frP.html(floor(frameRate()));
  } else if (frCounter % 10 == 0) {
    frP.html(floor(frAvg / 10));
    frAvg = 0;
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) hasClicked = true;
}

function mouseReleased() {
  hasClicked = false;
}

//TODO
// Create a tips menu next to the canvas, where tips and hints will show up
// You should be able to scroll between the different hints, and there should be categories like general hints, tool hints, "what to do hints", and other types of hints
// TIP: If the water molecule is in the display screen, there should be a tip saying that you you can generate water by going into physics mode
// TIP: Add more atoms or molecules

// Man skal kunne vælge hvor mange atomer man vil have i atomDisplayScreen
// Gøre noget med magnetisme
// Be able to also add new atoms from the atomDisplayScreen in a similar fashion as the title screen
// If the given formula includes () or numbers, the program should recognize that it's a chemical substance and act accordingly// There should be pregiven option on the title screen for stuff like liquid simulation (you can choose the liquid), solid physics simulation etc...
// Math functions you can add (maybe with a + button, that displays the available math operations)
// Games (Merno portals would be cool)
// From title screen there should be a function to type in already known information, from which the program automatically gives all relevant quantities with the given information (stofmængde, concentration, volumen, osv...)
// Various animations: Heat, cold, explosions, particles for different things, rain, snow, lightning, electricity (try to code it yourself), osv...
// [DONE] Lav det sådan at når man har tilføjet sine atomer vil de svæve rundt med deres spindende elektroner rundt om
// [NOT NEEDED] Remove spaces when checking for the atoms included in the formula

//KEMI
// Man kan tilføje varme med en knap som vil få atomerne til at bevæge sig hurtigere
// Man kan tilføje kulde som vil gøre dem langsommere.
// Man kan tilføje mange atomer og lave liquid simulation
// Match atomets farve til dens gruppe i det periodiske system
// Add an option to toggle water in canvas
// For example if H2O was written, a water simulation would appear, or if some metal was given it should give a physics simulation of the solid state of that metal with the right density and forces applied (make option to resize with mouse, and other things of that nature)
// From the atomsDisplayScreen there should be options to do calculations of all sorts:
// Should display Molarmass for the displayed atoms
// Should be able to do calculations with Molarmass, like måger over bjerge, which can calculate stofmængde, which it can then use with no-cv.
// Given a chemical substance in place of just atoms example: KBrO3, it would automatically calculate the molarmass for the substance.
// There should be fields for the triangles to input values in, and calculate different quantities
// In the atomDisplayScreen there should be a checkbox with the option of making the atoms stay still and put the in a table format.
// When atoms are still, they should light up when hovering over with mouse.

//FYSIK-KEMI
// Option to apply energy at mouse position and click. This should stop the function of choosing the selected atom, and just keep the current selected atom fixed
// Applying energy should have an animation
// If we apply enough energy to an atom, the electron should jump out to the next shell. Similarly if we reduce energy, an electron should jump to the shell before it and send out a foton
// When an electron jumps shell position it should have a cool animation.

//FYSIK
// Fysik mode: den bliver zoomet ud så atomerne bliver til små partikler eller kugler, hvor der derefter kan ske forskellige fysik reaktioner
// Fussion and Fission as well as radioactive decation. Be able to spawn neutrons that will direct themselfes towards the core and create reactions
// From the created atoms of fission and fussion, you should be able to click the atoms and get the chemical demonstration again
// Add the option to turn on electricity when mouse is pressed, which will attract magnetic compounds toward the mouse, (water, metal and other compounds with magnetic properties)

//MATEMATIK
// Statistic program that can perform binom and other relevant formulas from the various topics.
// Use statistics with the atoms, chemicals substances, physic objects and quantities (speed, acceleration, radioactivity, osv...)
// Compare the probability for different things. If you calculate your own probability it should compare it with a lot of prewritten probabilites (can find from the youtube channel that has all kinds of statistics with pictures)
// When doing the comparison, an animation should play almost like a slot machine that will stop at the most similar statistic in terms of their probability



