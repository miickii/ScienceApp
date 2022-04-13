class AtomDisplayScreen {
    constructor(atoms, molecules) {
        this.width = width;
        this.height = height;

        this.atoms = [];
        this.selectedAtom = null;
        this.atomDiameter = 63; // 63 is the diameter of an electron ring
        this.atomR = this.atomDiameter/2;
        for (let atom of atoms) {
            this.atoms.push(new Atom(atom.AtomicNumber, atom.Element, atom.Symbol, atom.AtomicMass, atom.NumberofNeutrons, atom.NumberofProtons, atom.NumberofElectrons, atom.Period, atom.Group, atom.Phase, atom.Radioactive, atom.Natural, atom.Metal, atom.Nonmetal, atom.Metalloid, atom.Type, atom.Electronegativity, atom.MeltingPoint, atom.BoilingPoint, atom.NumberOfIsotopes, atom.Discoverer, atom.Year, atom.NumberofShells, atom.NumberofValence, atom.simpleColor));
        }

        this.molecules = new Array(molecules.length);
        for (let i = 0; i < molecules.length; i++) {
            for (let atom of molecules[i]) {
                this.atoms.push(new Atom(atom.AtomicNumber, atom.Element, atom.Symbol, atom.AtomicMass, atom.NumberofNeutrons, atom.NumberofProtons, atom.NumberofElectrons, atom.Period, atom.Group, atom.Phase, atom.Radioactive, atom.Natural, atom.Metal, atom.Nonmetal, atom.Metalloid, atom.Type, atom.Electronegativity, atom.MeltingPoint, atom.BoilingPoint, atom.NumberOfIsotopes, atom.Discoverer, atom.Year, atom.NumberofShells, atom.NumberofValence, atom.simpleColor));
            }
        }

        this.tableCols = 4;
        this.colMargin = 30;
        this.rowMargin = 10;
        this.tableWidth = (this.atomDiameter * this.tableCols) + this.colMargin*(this.tableCols-1); // The number of atoms in a column * the space an atom occupies
        this.tablePos = [(width-this.tableWidth)/2, 50]; // First index is x value, second index is y value

        this.atoms[0].selected = true;
        this.extendedInfo = false;
        this.extInfoBox = createCheckbox("Extended Information", this.extendedInfo);
        this.extInfoBox.position(0, height+40);

        this.displayMode = false;
        this.displayModeBox = createCheckbox("Display Mode");
        this.displayModeBox.position(0, height+70);

        this.simpleMode = false;
        this.simpleModeBox = createCheckbox("Simple Mode");
        this.simpleModeBox.position(0, height+100);

        this.infoMode = false;
        this.infoBoxXOff = 80;
        this.infoBoxWidth = 150;
        this.infoBoxHeight = height/2;
        this.atomBoxSize = 80;
        this.atomBoxXOff = 80;
        
        /*
        this.atomNumberP = select("#atomic-number");
        this.symbolP = select("#atom-symbol");
        this.massP = select("#atomic-mass");*/
    }

    update() {
        background(0);
        /*stroke(255);
        strokeWeight(2);
        line((width-this.tableWidth)/2, 0, (width-this.tableWidth)/2, height);
        line(width-(width-this.tableWidth)/2, 0, width-(width-this.tableWidth)/2, height);*/
        this.displayMode = this.displayModeBox.checked();
        this.simpleMode = this.simpleModeBox.checked();

        for (let i = 0; i < this.atoms.length; i++) {
            if (this.simpleMode) this.atoms[i].moleculeMode = true;
            else this.atoms[i].moleculeMode = false;

            if (this.displayMode) {
                let column = i % this.tableCols;
                let row = floor(i / this.tableCols);
                this.atoms[i].tableDisplay(column, row, this.colMargin, this.rowMargin, this.tablePos[0], this.tablePos[1]);
            } else {
                this.atoms[i].applyForce(createVector(0, 0));

                this.atoms[i].update();
                this.atoms[i].edges();
            }

            this.atoms[i].drawAtom();
        }

        if (hasClicked && clickCooldown <= 0) {
            for (let atom of this.atoms) {
                if (atom.clicked()) {
                    this.selectedAtom = atom;
                    this.infoMode = true;
                    break;
                }
                this.selectedAtom = null;
                this.infoMode = false;
            }

            this.repositionTable(this.infoMode);
            clickCooldown = 20;
        }

        this.show();
}

    show() {
        // Display info on currently selected atom.
        if (this.infoMode) {
            this.informationBox(this.selectedAtom, this.infoBoxWidth, this.infoBoxHeight);
        } else {
            // Resetting the x offset
            this.atomBoxXOff = this.atomBoxSize;
            this.infoBoxXOff = this.infoBoxWidth;
        }
    }

    /*applyForce(atom, force) {
        this.atoms[atom].acc.add(force);
    }*/

    repositionTable(compress) {
        if (compress) {
            // If the info of the current selected atom is showing
            this.width = width - this.infoBoxWidth;
            this.tableCols = 2;
        } else {
            this.width = width;
            this.tableCols = 4;
        }

        this.tableWidth = (this.atomDiameter * this.tableCols) + this.colMargin*(this.tableCols-1); // The number of atoms in a column * the space an atom occupies
        this.tablePos = [(this.width-this.tableWidth)/2, 50]; // First index is x value, second index is y value
    }

    informationBox(atom, boxWidth, boxHeight) {
        // Display information of a selected atom, and toggle extended information if box is checked
        this.extendedInfo = this.extInfoBox.checked();
        if (this.extendedInfo) {
            let x = width-boxWidth;
            let y = 0;
            let xOff = this.infoBoxXOff;

            let number = atom.atomicNumber;
            let mass = "" + parseFloat(atom.atomicMass).toFixed(3);
            let symbol = atom.symbol;
            let name = atom.element;
            let neutrons = atom.numberOfNeutrons;
            let protons = atom.numberOfProtons;
            let electrons = atom.numberOfElectrons;
            let type = atom.type;
            let electroNegativity = atom.electroNegativity;

            // Moving the box into view
            if (this.infoBoxXOff <= 0) {
                this.infoBoxXOff = 0;
            } else {
                this.infoBoxXOff -= 20;
            }
            stroke(255, 0, 0);
            strokeWeight(3);
            fill(255, 0, 0, 175);
            rect(x+xOff, y, boxWidth, boxHeight);
            fill(255, 0, 0);
            rect(x+xOff, y, boxWidth, boxHeight/25);
            rect(x+xOff, boxHeight-boxHeight/25, boxWidth, boxHeight/25);

            strokeWeight(0);
            fill(0);
            textSize(18);
            textAlign(CENTER);
            text(name, x+xOff+boxWidth/2, y+30);

            textSize(12);
            textAlign(LEFT);
            text("Symbol: " + symbol, x+xOff+7, y+50);
            text("Atomic Number: " + number, x+xOff+7, y+50+17);
            text("Atomic Mass: " + mass + " u", x+xOff+7, y+50+17*2);
            text("Neutrons: " + neutrons, x+xOff+7, y+50+17*3);
            text("Protons: " + protons, x+xOff+7, y+50+17*4);
            text("Electrons: " + electrons, x+xOff+7, y+50+17*5);
            text("Type: " + type, x+xOff+7, y+50+17*6);
            text("Electronegativity: " + electroNegativity, x+xOff+7, y+50+17*7);

        } else {
            this.atomBox(atom, width-this.atomBoxSize, 0, this.atomBoxSize, 'LEFT');
        }
    }

    atomBox(atom, x, y, boxSize, direction) {
        let xOff = this.atomBoxXOff;

        let number = atom.atomicNumber;
        let mass = "" + parseFloat(atom.atomicMass).toFixed(2);
        let symbol = atom.symbol;
        let name = atom.element;

        // Moving the box into view
        switch (direction) {
            case 'LEFT':
                if (this.atomBoxXOff <= 0) {
                    this.atomBoxXOff = 0;
                } else {
                    this.atomBoxXOff -= 10;
                }
        }

        stroke(255, 0, 0);
        strokeWeight(2);
        fill(255, 0, 0, 200);
        rect(x+xOff, y, boxSize, boxSize);

        strokeWeight(0);
        fill(0);
        textSize(14);
        textAlign(LEFT);
        text(number, x+xOff+5, y+20);

        textAlign(RIGHT)
        text(mass, x+xOff+boxSize-5, y+20);

        textSize(28);
        textAlign(CENTER);
        text(symbol, x+xOff+boxSize/2, y+boxSize/2+10);

        textSize(14);
        text(name, x+xOff+boxSize/2, y+boxSize-10);
    }
}
