class AtomDisplayScreen {
    constructor(atoms) {
        this.atoms = [];
        this.selectedAtom = null;

        for (let atom of atoms) {
            this.atoms.push(new Atom(atom.AtomicNumber, atom.Element, atom.Symbol, atom.AtomicMass, atom.NumberofNeutrons, atom.NumberofProtons, atom.NumberofElectrons, atom.Period, atom.Group, atom.Phase, atom.Radioactive, atom.Natural, atom.Metal, atom.Nonmetal, atom.Metalloid, atom.Type, atom.Electronegativity, atom.MeltingPoint, atom.BoilingPoint, atom.NumberOfIsotopes, atom.Discoverer, atom.Year, atom.NumberofShells, atom.NumberofValence));
        }

        this.atoms[0].selected = true;
        this.extendedInfo = false;
        this.extInfoBox = createCheckbox("Extended Information", this.extendedInfo);
        this.extInfoBox.position(0, height+30);
    }

    update() {
        background(0);
        for (let atom of this.atoms) {
            atom.applyForce(createVector(0, 0));

            atom.update();
            atom.edges();

            if (hasClicked) {
                if (atom.clicked()) {
                    this.selectedAtom = atom;
                    console.log("now");
                }
            }

            atom.drawAtom();
        }

        this.show();
    }

    show() {
        // Display info on currently selected atom.
        if (this.selectedAtom != null) {
            this.displayInformation(this.selectedAtom);

        }
    }

    /*applyForce(atom, force) {
        this.atoms[atom].acc.add(force);
    }*/

    displayInformation(atom) {
        // Display information of a selected atom, and toggle extended information if box is checked
        this.extendedInfo = this.extInfoBox.checked();
        if (this.extendedInfo) {
            console.log(atom.atomicNumber);
            console.log(atom.symbol);
            console.log(atom.atomicMass);
            console.log(atom.numberOfElectrons);
        } else {
            console.log(atom.element);
        }
    }
}