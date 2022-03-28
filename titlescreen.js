class TitleScreen {
    constructor() {
        this.elementInput = select("#formula-input");
        this.elementInput.size(80, 25);
        this.elementInput.position(width/2-this.elementInput.width/2, height/2-this.elementInput.height/2);
        this.formulaText = select("#type-formula");
    }

    show() {
        background(0);
    
        textSize(30);
        textAlign(CENTER);
        fill(100, 255, 255);
        text("TYPE FORMULA", this.elementInput.x+this.elementInput.width/2, this.elementInput.y-30);

        if (keyCode === ENTER && onTitle && this.elementInput.value() != "") {
            let atoms = pTable.deconFormula(this.elementInput.value());
            let atomsArr = [];
            let validFormula = true;

            for (let atom of atoms) {
                if (pTable.getElementBySymbol(atom) != null) {
                    // This is the root of the big BUG. When i push the same object twice to the array, if i change something in one of the objects, the other also gets affected for some reason???
                    // It's because of the way the atom is parsed to the array. If you set an object a = object b in javascript, object a will get changed if you change object b.
                    // Because of this we have to use Object.assign(), as it will disconnect the two objects from each other. If object a contains another object in it, Object.assign() is not enough.
                    // In that case only the variables in object a that aren't objects themselfes will get disconnected from the copied object b. To completely disconnect an object from the copy, you have to use JSON.parse()
                    //EXAMPLE: let copiedPerson = JSON.parse(JSON.stringify(person));
                    let newAtom = Object.assign({}, pTable.getElementBySymbol(atom));
                    //atomsArr.push(pTable.getElementBySymbol(atom));
                    atomsArr.push(newAtom);
                } else {
                    validFormula = false;
                    console.log("Not a real formula");
                }
            }

            // If the formula typed is contains valid atoms, then we will exit the title screen and return the array of atoms
            if (validFormula) {
                // Creating a new AtomDisplayScreen with the chosen atoms
                // Switching to that screen
                // Deleting the input object
                onTitle = false;
                onAtomDisplay = true;
                //atomDisplayScreen = new PreviousAtomDisplayScreen(atomsArr);
                atomDisplayScreen = new AtomDisplayScreen(atomsArr);
                this.elementInput.remove();
                return atomsArr;
            }
        } else if (keyCode === ESCAPE) {
            onTitle = false;
            return null;
        }

        return [];
    }
}
