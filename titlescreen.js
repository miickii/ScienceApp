class TitleScreen {
    constructor() {
        this.elementInput = select("#formula-input");
        this.elementInput.size(80, 25);
        this.elementInput.position(width/2-this.elementInput.width/2, height/2-this.elementInput.height/2);
        //this.formulaText = select("#type-formula");
    }

    show() {
        background(0);
    
        textSize(30);
        textAlign(CENTER);
        fill(100, 255, 255);
        text("TYPE FORMULA", this.elementInput.x+this.elementInput.width/2, this.elementInput.y-30);

        if (keyCode === ENTER && onTitle && this.elementInput.value() != "") {
            let formulas = pTable.deconFormula(this.elementInput.value());
            let elementsArr = [];
            let moleculesArr = [];
            let validFormula = true;

            for (let formula of formulas) {
                let element = pTable.getElementBySymbol(formula);
                let molecule;
                if (element != null) {
                    // This is the root of the big BUG. When i push the same object twice to the array, if i change something in one of the objects, the other also gets affected for some reason???
                    // It's because of the way the atom is parsed to the array. If you set an object a = object b in javascript, object a will get changed if you change object b.
                    // Because of this we have to use Object.assign(), as it will disconnect the two objects from each other. If object a contains another object in it, Object.assign() is not enough.
                    // In that case only the variables in object a that aren't objects themselfes will get disconnected from the copied object b. To completely disconnect an object from the copy, you have to use JSON.parse()
                    //EXAMPLE: let copiedPerson = JSON.parse(JSON.stringify(person));
                    let newElement = Object.assign({}, element);
                    //atomsArr.push(pTable.getElementBySymbol(atom));
                    elementsArr.push(newElement);
                } else {
                    // Check if formula is a molecule
                    molecule = this.getMolecule(formula);
                    if (molecule != null) {
                        moleculesArr.push(molecule);
                    } else {
                        validFormula = false;
                        console.log("Not a real formula");
                    }
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
                console.log("Molecules: ", moleculesArr);
                console.log("Elements: ", elementsArr);
                atomDisplayScreen = new AtomDisplayScreen(elementsArr, moleculesArr);
                this.elementInput.remove();
                return elementsArr;
            }
        } else if (keyCode === ESCAPE) {
            onTitle = false;
            return null;
        }

        return [];
    }

    getMolecule(formula) {
        // This function gets called if the formula is not just a regular element. E.g. H2O, C2H6O, KMnO4, NaCl
        // ISSUE: If molecule doesn't contain number E.g. NaCl, it wiWAIT WAIT WAIT
        let formulaParts = pTable.deconFormula(formula, true);
        let molecule = [];
        let amountOfMolecule = parseInt(formulaParts[0]);

        if (isNaN(amountOfMolecule)) {
            // If the first element is not a number, the amount of this molecule should just default to 1
            amountOfMolecule = 1
        } else {
            // If the first element of formulaParts array is a number, it should get removed
            formulaParts.shift();
        }

        for (let i = 0; i < formulaParts.length; i++) {
            let element = pTable.getElementBySymbol(formulaParts[i]);
            let amountOfElement = parseInt(formulaParts[i]);
            if (element != null) {
                // If this part is an element
                let newElement = Object.assign({}, element); // Creating a copy of the element object
                molecule.push(newElement); // Adding the element to the molecule array
            } else if (!isNaN(amountOfElement)) {
                // Checking if this part is a number, meaning that the previous element should be added x times to molecule array, x = the number
                for (let j = 1; j < amountOfElement; j++) {
                    // j is set to 1 because the element is already added once in the previous iteration of the for loop, so if amount is 2, we will run through this loop once, if amount is 4, we will run through this loop 3 times, and so on...
                    let newElement = Object.assign({}, pTable.getElementBySymbol(formulaParts[i-1])); // Setting newElement to the previous element in for loop
                    molecule.push(newElement);
                }
            } else {
                // If this part is not an element or a number, meaning that it's an invalid formula
                console.log("invalid");
                return null;
            }
            /*let element = atom.replace(/[0-9]/g, ''); // Remove the number indicating amount, thereby leaving only the element
            element = pTable.getElementBySymbol(element); // Setting the element equal to corresponding element from pTable, null if not a valid element

            let amountOfAtom = parseInt(atom.match(/\d+/g)) || 1; // Getting the number next to the atom. If there are no numbers, set amountOfAtom to 1
            */
        }
        return molecule;
    }
}
