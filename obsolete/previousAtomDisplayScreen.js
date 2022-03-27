class PreviousAtomDisplayScreen {
    constructor(atoms) {
        this.atoms = [...atoms];
        this.selectedAtom = null;

        //BUG: when there is more of the same type of atom, this code will make them all the same for some reason, same vel, same pos, same size.....
        //FIXED: see titlescreen.js for answer.
        for (let atom of this.atoms) {
            let pos = createVector(width/2, height/2);
            let vel = p5.Vector.random2D();
            let acc = createVector(0, 0);
            atom.speed = floor(random(1, 4));
            atom.pos = pos;
            atom.vel = vel.setMag(atom.speed);
            atom.acc = acc;

            // Electron ring, position and velocity
            /*atom.electronRingR = 21.5; // 21.5 is calculated because drawmargin max value is 15 + nucleus radius which is 6.5 = 21.5
            atom.eletronPos = createVector(atom.pos.x+atom.elecRingR, 0);
            atom.electronVel = createVector(0, 0);*/
            //atom.size = 32;
            atom.size = 32;
            atom.r = atom.size/2;

            atom.selected = false;

            //let atomMass = atom.atomMass;
        }

        this.atoms[0].selected = true;
        this.extendedInfo = false;
        this.extInfoBox = createCheckbox("Extended Information", this.extendedInfo);
        this.extInfoBox.position(0, height+30);
    }



    update() {
        background(0);
        for (let atom of this.atoms) {
            atom.vel.add(atom.acc);
            atom.pos.add(atom.vel);

            /*atom.electronVel.
            atom.eletronPos.add(atom.electronVel);*/
            this.edges(atom);

            if (hasClicked) {
                if (mouseX > atom.pos.x-atom.r && mouseX < atom.pos.x+atom.r && mouseY > atom.pos.y-atom.r && mouseY < atom.pos.y+atom.r) {
                    this.selectedAtom = atom;
                    console.log("now");
                }
            }
        }

        this.show();
    }

    show() {
        for (let atom of this.atoms) {
            /*stroke(255);
            fill(atom.color);
            ellipse(atom.pos.x, atom.pos.y, atom.size);*/

            // Making sure each atom gets created with different positions for the neutrons and protons
            // 300 ok
            let seed = 1230;
            randomSeed(seed*int(atom.AtomicNumber)); // Multiplying by atomic number makes sure that each different atom gets drawn differently, however if there are multiple of same atom, they will all get drawn the same
            this.drawCore(atom);

        }

        // Display info on currently selected atom.
        if (this.selectedAtom != null) {
            this.displayInformation(this.selectedAtom);

        }
    }

    drawCore(atom) {
        let protonNum = parseInt(atom.NumberofProtons);
        let neutronNum = parseInt(atom.NumberofNeutrons);
        let nucleonNum = protonNum+neutronNum;
        // Using the nucleon number we will define the area where protons and neutrons can get drawn, by mapping the number to a number between 1 and the radius of the atom
        let nucleonSize = 13;
        let drawMargin = map(nucleonNum, 1, 294, 6, atom.r-1, true);
        let elecRingR = 21.5+10;
        stroke(255);
        strokeWeight(1);

        //TEST: HHeLiBeBCNOFNeNaMgAlSiPSClArKCaSc
        //TEST: HHeBeCONeCrFeSnAuDsRa
        if (atom.AtomicNumber == 1) {
            // Draw Hydrogen
            fill(255, 0, 0);
            ellipse(atom.pos.x, atom.pos.y, nucleonSize);
        
        } else if (atom.AtomicNumber == 2) {
            // Draw Helium
            fill(255, 0, 0);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x, atom.pos.y+nucleonSize/2, nucleonSize);
        } else if (atom.AtomicNumber == 3) {
            fill(255, 0, 0);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x+nucleonSize/2+2, atom.pos.y, nucleonSize);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x-nucleonSize/2-2, atom.pos.y, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x, atom.pos.y, nucleonSize);
        } else if (atom.AtomicNumber == 4) {
            fill(255, 0, 0);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x+nucleonSize/2+2, atom.pos.y, nucleonSize);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x-nucleonSize/2-2, atom.pos.y, nucleonSize);
            ellipse(atom.pos.x, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x, atom.pos.y, nucleonSize);
        } else if (atom.AtomicNumber == 5) {
            fill(255, 0, 0);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x+nucleonSize/2+2, atom.pos.y, nucleonSize);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x-nucleonSize/2-2, atom.pos.y, nucleonSize);
            ellipse(atom.pos.x, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y+2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y-2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x, atom.pos.y-nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x-nucleonSize/2, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(0, 0, 255);
            ellipse(atom.pos.x+nucleonSize/2, atom.pos.y+nucleonSize/2, nucleonSize);
            fill(255, 0, 0);
            ellipse(atom.pos.x, atom.pos.y, nucleonSize);
        } else {
            for (let i = 1; i <= 30; i++) {
                if (i <= protonNum) {
                    fill(255, 0, 0);
                    ellipse(random(atom.pos.x-drawMargin, atom.pos.x+drawMargin), random(atom.pos.y-drawMargin, atom.pos.y+drawMargin), nucleonSize);
                }
                if (i <= neutronNum) {
                    fill(0, 0, 255);
                    ellipse(random(atom.pos.x-drawMargin, atom.pos.x+drawMargin), random(atom.pos.y-drawMargin, atom.pos.y+drawMargin), nucleonSize);
                }
            }
        }


        stroke(255, 200);
        strokeWeight(1);
        noFill();
        ellipse(atom.pos.x, atom.pos.y, elecRingR*2);
    }

    applyForce(atom, force) {
        this.atoms[atom].acc.add(force);
    }

    edges(atom) {
        if (atom.pos.x <= atom.r) {
            atom.pos.x = atom.r;
            atom.vel.x *= -1;
        } else if (atom.pos.x >= width-atom.r) {
            atom.pos.x = width-atom.r;
            atom.vel.x *= -1;
        }
        if (atom.pos.y <= atom.r) {
            atom.pos.y = atom.r;
            atom.vel.y *= -1;
        } else if (atom.pos.y >= height-atom.r) {
            atom.pos.y = height-atom.r;
            atom.vel.y *= -1;
        }
    }

    displayInformation(atom) {
        // Display information of a selected atom, and toggle extended information if box is checked
        this.extendedInfo = this.extInfoBox.checked();
        if (this.extendedInfo) {
            console.log(atom.AtomicNumber);
            console.log(atom.Symbol);
            console.log(atom.AtomicMass);
            console.log(atom.NumberofElectrons);
        } else {
            console.log(atom.Element);
        }
    }
}