class Atom {
    constructor(atomicNumber, element, symbol, atomicMass, numberOfNeutrons, numberOfProtons, numberOfElectrons, period, group, phase, radioactive, natural, metal, nonMetal, metalloid, type, electroNegativity, meltingPoint, boilingPoint, numberOfIsotopes, discoverer, year, numberOfShells, numberOfValence, simpleColor) {
        this.atomicNumber = atomicNumber;
        this.element = element;
        this.symbol = symbol;
        this.atomicMass = atomicMass;
        this.numberOfNeutrons = numberOfNeutrons;
        this.numberOfProtons = numberOfProtons;
        this.numberOfElectrons = numberOfElectrons;
        this.period = period;
        this.group = group;
        this.phase = phase;
        this.radioactive = radioactive;
        this.natural = natural;
        this.metal = metal;
        this.nonMetal = nonMetal;
        this.metalloid = metalloid;
        this.type = type;
        this.electroNegativity = electroNegativity;
        this.meltingPoint = meltingPoint;
        this.boilingPoint = boilingPoint;
        this.numberOfIsotopes = numberOfIsotopes;
        this.discoverer = discoverer;
        this.year = year;
        this.numberOfShells = numberOfShells;
        this.numberOfValence = numberOfValence;
        this.simpleColor = simpleColor;
        
        let pos = createVector(width/2, height/2);
        let vel = p5.Vector.random2D();
        //let vel = createVector(0, 0);
        let acc = createVector(0, 0);
        //let acc = p5.Vector.random2D();
        this.speed = 1;
        this.pos = pos;
        this.vel = vel.setMag(this.speed);
        this.acc = acc;
        this.targetPos = createVector(0, 0);
        this.direction = createVector(0, 0);

        this.electrons = []; // Array containing a vector with the position for each electron
        this.electronAngles = []; // Angle of each electron compared to center of atom
        // Electron ring, position and velocity
        this.electronRingR = 21.5+10; // 21.5 is calculated because drawmargin max value is 15 + nucleus radius which is 6.5 = 21.5
        this.electronR = 4; // Electron radius
        this.electronPos = createVector(0, 0);
        //this.electronAngle = random(1, 360); // This puts the electron in a random position around the atom
        this.electronSpeed = 0.02;
        this.spinElectrons = true;
        //atom.size = 32;
        this.size = 32;
        this.r = this.size/2;

        this.simpleSize = 32;
        this.simpleR;

        this.selected = false;
        // Checks to see if the atom is in display mode (will stop the loop)
        this.onDisplay = false;
        this.moleculeMode = false;

        if (!this.moleculeMode) this.initialElectronPositions();
    }

    update() {
        if (this.onDisplay) {
            // This makes sure that electrons return to original position everytime tableDisplay gets called
            this.onDisplay = false;
            // Make electrons spin again when not in tableDisplay mode
            this.spinElectrons = true;
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        if (!this.moleculeMode) this.setElectronPositions(this.spinElectrons);
    }

    tableDisplay(column, row, colMargin, rowMargin, tableX, tableY) {
        this.spinElectrons = false;
        let colSpace = this.electronRingR*2 + colMargin;
        let rowSpace = this.electronRingR*2 + rowMargin; // Setting the space between each row to the diameter of electron ring + some margin

        let x = column*colSpace+tableX+this.electronRingR;
        let y = row*rowSpace+tableY+this.electronRingR;
        this.targetPos.set(x, y);

        if (p5.Vector.dist(this.pos, this.targetPos) > 10) {
            // if position of atom is not close to the target position
            this.direction.set(p5.Vector.sub(this.targetPos, this.pos));
            this.direction.setMag(10);
            this.pos.add(this.direction);
            if (!this.moleculeMode) this.setElectronPositions(this.spinElectrons);
        } else {
            // Start by setting the electron positions to their original positions
            if (this.onDisplay == false) {
                // Whatever is put in this if statement is only called once upon creating tableDisplay
                this.resetElectronPositions();
                this.onDisplay = true;
            }
            this.pos.set(x, y);
            if (!this.moleculeMode) this.setElectronPositions(this.spinElectrons);
        }

        //this.vel.setMag(0);
        //this.electronSpeed = 0;
    }

    startMoving(elecSpeed) {
        let electronSpeed = elecSpeed || 0.02;

        this.vel.setMag(this.speed);
        this.electronSpeed = electronSpeed;
    }

    drawAtom() {
        if (this.moleculeMode) {
            this.simpleVisualization();
        } else {
            this.drawCore();
            this.drawElectrons();
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    simpleVisualization() {
        stroke(0);
        strokeWeight(1);
        fill(this.simpleColor);
        ellipse(this.pos.x, this.pos.y, this.simpleSize);
    }

    drawElectrons() {
        // Draw electron ring
        stroke(255, 200);
        strokeWeight(1);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.electronRingR*2);

        // Draw electrons
        for (let i = 0; i < this.electrons.length; i++) {
            stroke(255, 200);
            strokeWeight(1);
            fill(255, 255, 0);
            ellipse(this.electrons[i].x, this.electrons[i].y, this.electronR*2);
        }
    }

    resetElectronPositions() {
        // The angle of the first electron
        let curAngle = this.electronAngles[0];
    
        for (let i = 0; i < this.electrons.length; i++) {
            // Subtracting the angle offset from the original angle, so each electron returns to original position
            this.electronAngles[i] -= curAngle;
        }
    }

    initialElectronPositions() {
        // Go to properties/Subshells_and_valence_number for an explanation of electron configuration.
        // TODO: instead of just setting valence num to 2 in transition metals, make an algorithm to correctly determine the amount of electrons in outer shell
        // For transition metals the valence number can be correctly calculated by looking at the configuration of electrons
        if (isNaN(parseInt(this.numberOfValence))) {
            this.numberOfValence = 2;
        }
        let randomStartAngle = random(0, 6);

        let valanceNum = parseInt(this.numberOfValence); // Number of electrons in the outher shell
        for (let i = 0; i < valanceNum; i++) {
            // Calculating the position of electron with trigonometri
            let angleDiff = 360/valanceNum; // This is the angle between each electron. E.g. For 2 electrons it would be 180 degrees, 6 = 60 degrees
            
            // i+1 because the for loop starts at 0. Converting to radians, as it's easier to work with them in p5js
            // adding the randomStartAngle to the angle of electron for each electron
            this.electronAngles[i] = radians(angleDiff*(i+1))+randomStartAngle;

            let x = this.electronRingR * cos(this.electronAngles[i]);
            let y = this.electronRingR * sin(this.electronAngles[i]);

            this.electrons.push(createVector(this.pos.x+x, this.pos.y+y)); // From center of atom, set position to center + x and center + y
        }
    }

    setElectronPositions(spin) {
        // Calculating the position of electron with trigonometri
        for (let i = 0; i < this.electrons.length; i++) {
            // For each electron calculate the new angle
            let x = this.electronRingR * cos(this.electronAngles[i]);
            let y = this.electronRingR * sin(this.electronAngles[i]);

            this.electrons[i].set(this.pos.x+x, this.pos.y+y); // Setting the eletron position to the newly calculated position relatively to the current position of the atom
            // NOT NEEDED
            //if (degrees(this.electronAngles[i]) >= 360) this.electronAngles[i] = 0;

            // After setting the new position for each electron, we want to increase angle slightly for the next frame (if atom not on display)
            if (spin) this.electronAngles[i] += this.electronSpeed;
        }
    }

    drawCore() {
        // Making sure each atom gets created with different positions for the neutrons and protons
        let seed = 1230;
        randomSeed(seed*int(this.atomicNumber)); // Multiplying by atomic number makes sure that each different atom gets drawn differently, however if there are multiple of same atom, they will all get drawn the same

        let protonNum = parseInt(this.numberOfProtons);
        let neutronNum = parseInt(this.numberOfNeutrons);
        let nucleonNum = protonNum+neutronNum;
        // Using the nucleon number we will define the area where protons and neutrons can get drawn, by mapping the number to a number between 1 and the radius of the atom
        let nucleonSize = 13;
        let drawMargin = map(nucleonNum, 1, 294, 6, this.r-1, true);
        stroke(255);
        strokeWeight(1);

        //TEST: HHeLiBeBCNOFNeNaMgAlSiPSClArKCaSc
        //TEST: HHeBeCONeCrFeSnAuDsRa
        if (this.atomicNumber == 1) {
            // Draw Hydrogen
            fill(255, 0, 0);
            ellipse(this.pos.x, this.pos.y, nucleonSize);
        
        } else if (this.atomicNumber == 2) {
            // Draw Helium
            fill(255, 0, 0);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x, this.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x, this.pos.y+nucleonSize/2, nucleonSize);
        } else if (this.atomicNumber == 3) {
            fill(255, 0, 0);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x+nucleonSize/2+2, this.pos.y, nucleonSize);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x-nucleonSize/2-2, this.pos.y, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y+nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x, this.pos.y, nucleonSize);
        } else if (this.atomicNumber == 4) {
            fill(255, 0, 0);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x+nucleonSize/2+2, this.pos.y, nucleonSize);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x-nucleonSize/2-2, this.pos.y, nucleonSize);
            ellipse(this.pos.x, this.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x, this.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y+nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x, this.pos.y, nucleonSize);
        } else if (this.atomicNumber == 5) {
            fill(255, 0, 0);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x+nucleonSize/2+2, this.pos.y, nucleonSize);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x-nucleonSize/2-2, this.pos.y, nucleonSize);
            ellipse(this.pos.x, this.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y+2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y-2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x, this.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x-nucleonSize/2, this.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(this.pos.x+nucleonSize/2, this.pos.y+nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(this.pos.x, this.pos.y, nucleonSize);
        } else {
            for (let i = 1; i <= 30; i++) {
                // Drawing each proton and neutron at a random position between position x of atom +- some margin and position y of atom +- some margin
                if (i <= protonNum) {
                    fill(255, 0, 0);
                    ellipse(random(this.pos.x-drawMargin, this.pos.x+drawMargin), random(this.pos.y-drawMargin, this.pos.y+drawMargin), nucleonSize);
                }
                if (i <= neutronNum) {
                    fill(0, 0, 255);
                    ellipse(random(this.pos.x-drawMargin, this.pos.x+drawMargin), random(this.pos.y-drawMargin, this.pos.y+drawMargin), nucleonSize);
                }
            }
        }
    }

    edges() {
        // Check to see if atom has hit the edge of canvas, and if so, then flip velocity
        if (this.pos.x <= this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        } else if (this.pos.x >= width-this.r) {
            this.pos.x = width-this.r;
            this.vel.x *= -1;
        }
        if (this.pos.y <= this.r) {
            this.pos.y = this.r;
            this.vel.y *= -1;
        } else if (this.pos.y >= height-this.r) {
            this.pos.y = height-this.r;
            this.vel.y *= -1;
        }
    }

    clicked() {
        // Return true if mouse position is in the atom area
        /*if (mouseX > this.pos.x-this.r && mouseX < this.pos.x+this.r && mouseY > this.pos.y-this.r && mouseY < this.pos.y+this.r) {
            return true;
        }*/
        let d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
        if(d <= this.electronRingR) return true;

        return false;
    }
}