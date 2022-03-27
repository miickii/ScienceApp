class Atom {
    constructor(atomicNumber, element, symbol, atomicMass, numberOfNeutrons, numberOfProtons, numberOfElectrons, period, group, phase, radioactive, natural, metal, nonMetal, metalloid, type, electroNegativity, meltingPoint, boilingPoint, numberOfIsotopes, discoverer, year, numberOfShells, numberOfValence) {
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
        
        let pos = createVector(width/2, height/2);
        let vel = p5.Vector.random2D();
        //let vel = createVector(0, 0);
        let acc = createVector(0, 0);
        this.speed = 1;
        this.pos = pos;
        this.vel = vel.setMag(this.speed);
        this.acc = acc;

        // Electron ring, position and velocity
        this.electronRingR = 21.5+10; // 21.5 is calculated because drawmargin max value is 15 + nucleus radius which is 6.5 = 21.5
        this.electronR = 4; // Electron radius
        this.electronPos = createVector(0, 0);
        this.electronAngle = random(1, 360); // This puts the electron in a random position around the atom
        this.electronSpeed = 0.02;
        //atom.size = 32;
        this.size = 32;
        this.r = this.size/2;

        this.selected = false;

        //let atomMass = atom.atomMass;
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        // Calculating the position of electron with trigonometri
        let x = this.electronRingR * cos(this.electronAngle);
        let y = this.electronRingR * sin(this.electronAngle);
        let newPos = createVector(x, y);

        this.electronPos.set(this.pos.x+x, this.pos.y+y); // Setting the eletron position to the newly calculated position relatively to the current position of the atom
        this.electronAngle += this.electronSpeed;
    }

    drawAtom() {
        this.drawCore();
        this.drawElectrons();
    }

    applyForce(force) {
        this.acc.add(force);
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

    drawElectrons() {
        // Draw electron ring
        stroke(255, 200);
        strokeWeight(1);
        noFill();
        ellipse(this.pos.x, this.pos.y, this.electronRingR*2);

        // Draw electrons
        stroke(255, 200);
        strokeWeight(1);
        fill(255, 255, 0);
        ellipse(this.electronPos.x, this.electronPos.y, this.electronR*2);

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
        if (mouseX > this.pos.x-this.r && mouseX < this.pos.x+this.r && mouseY > this.pos.y-this.r && mouseY < this.pos.y+this.r) {
            return true;
        }

        return false;
    }
}