let ALKALIMETALCOLOR;
let ALKALINEEARTHMETALCOLOR;
let TRANSITIONMETALCOLOR;
let POSTTRANSITIONMETALCOLOR;
let METALLOIDCOLOR;
let NONMETALCOLOR;
let HALOGENCOLOR;
let NOBLEGASCOLOR;
let LANTHANIDECOLOR;
let ACTINIDECOLOR;

class PTable {
    constructor() {
        this.elements = [...elementData];
        this.numOfElements = this.elements.length;
        this.defineColors();

        // Set color of element based on it's type
        for (let element of this.elements) {
            switch (element.Type) {
                case "Alkali Metal":
                    element.color = ALKALIMETALCOLOR;
                    break;
                case "Alkaline Earth Metal":
                    element.color = ALKALINEEARTHMETALCOLOR;
                    break;
                case "Transition Metal":
                    element.color = TRANSITIONMETALCOLOR;
                    break;
                case "Metal":
                    element.color = POSTTRANSITIONMETALCOLOR;
                    break;
                case "Metalloid":
                    element.color = METALLOIDCOLOR;
                    break;
                case "Nonmetal":
                    element.color = NONMETALCOLOR;
                    break;
                case "Halogen":
                    element.color = HALOGENCOLOR;
                    break;
                case "Noble Gas":
                    element.color = NOBLEGASCOLOR;
                    break;
                case "Lanthanide":
                    element.color = LANTHANIDECOLOR;
                    break;
                case "Actinide":
                    element.color = ACTINIDECOLOR;
                    break;
                default:
                    element.color = color(240);
            }
        }
    }

    getElementBySymbol(symb) {
        for (let element of this.elements) {
            if (element.Symbol == symb) {
                return element;
            }
        }
        return null;
    }

    getElementByName(name) {
        for (let element of this.elements) {
            if (element.Element.toLowerCase() == name.toLowerCase()) {
                return element;
            }
        }
        return null;
    }

    getElementByNumber(num) {
        if (num > 0 && num <= this.numOfElements) {
            return this.elements[num-1];
        }
        return null;
    }

    isRadioactive(element) {
        if (element.Radioactive == "yes") {
            return true;
        } else {
            return false;
        }
    }

    deconFormula(formula) {
        let elements = formula.split(/(?=[A-Z])/);
        return elements;
    }

    defineColors() {
        ALKALIMETALCOLOR = color("#ffff1a");
        ALKALINEEARTHMETALCOLOR = color("#996633");
        TRANSITIONMETALCOLOR = color("#1aff1a");
        POSTTRANSITIONMETALCOLOR = color("#999999");
        METALLOIDCOLOR = color("#ff66ff");
        NONMETALCOLOR = color("#0066ff");
        HALOGENCOLOR = color("#00ffff");
        NOBLEGASCOLOR = color("#ff66ff");
        LANTHANIDECOLOR = color("#0000cc");
        ACTINIDECOLOR = color("#ff1a1a");
    }
}
