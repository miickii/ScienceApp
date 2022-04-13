// Algorithm that can upload a n*m dimension table to a 1d array, and can also extract that information back again if a value for total amount of columns
// 
// Make an algorithm that can create an n*m dimension table with a 1d array with a list of numbers (the table is ordered with the order of array LEFT-->RIGHT)
// Make an algorith that can create an n*m dimension table with a 1d array (contains numbers that go from 0-INFINITY)
// Making a n*m dimension table with a 1d array 
// (i % this.atomCols) calculates what column this.atoms[i] should be in.
// floor(i / this.atomCols) calculates what row this.atoms[i] should be in
// EXAMPLE: given i = 19, atomCols = 4.
// The total amount of rows would be = floor(i / 4) = floor(19 / 4) = 4 rows
// floor(i / y) = z, (where i = all numbers from 0-INFINITY, y = maxCols, z = rows)
// i = (R > a = {x ∈ R | x > a}) IN SENTENCE: x belongs to any real number given that x is larger than a.
// x belongs to any real number given that x is larger than a.
// OR Real number is always larger than a if  OR , ℝ>𝑎={𝑥∈ℝ∣𝑥>𝑎}, )
// The total amount of columns would be (i % 4) = (19 % 4) = 3 cols

// MAP A 1D ARRAY TO A 2D ARRAY AND VICE VERSA
class ArrayTableMapper {
    constructor (arrOfTable, tableArr, maximumColumns) {
        this.maxCols = maximumColumns || 4;
        // Setting arrayOfTable equal to given array, or default to a created array of length 10*maxCols populated with 0's
        this.singleArrayOfTable = arrOfTable || [];
        // Setting the table equal to given table, or default to a created table with 
        this.table = tableArr || [];
    }

    valueAt(row, column) {
        // get index of 1d array with equation: index = row * maxCols + column
        // let index = row * this.maxCols + column;
        let index = this.getValuesFromUnknown(row, column, this.maxCols);
        return this.singleArrayOfTable[index];
    }

    setValueAt(row, column, value) {
        // set index of 1d array
        // Using EQUATION: index = row * maxCols + column, to get the index of 1d array with corresponding row and column value
        // let index = row * this.maxCols + column;
        let index = this.getValuesFromUnknown(row, column, this.maxCols);
        
        this.singleArrayOfTable[index] = value;
    }

    createArray(rows, maximumColumns, value) {
        // Creates a table of dimentions rows*maximumColumns, with all values set as 0

        this.maxCols = maximumColumns;
        // The length of this array is just number of rows * number of columns
        let arrayLength = rows * maximumColumns;

        let newArray = []

        for (let i = 0; i < arrayLength; i++) {
            newArray[i] = value;
        }

        this.singleArrayOfTable = newArray;
        return newArray;
    }
    /*
    createRandomArray(rows, columns) {
        // Creates a table with random values between 0 and 1
    
        let arrayLength = rows * columns;
    
        for (let i = 0; i < arrayLength; i++) {
            this.arrayOfTable[i] = random(1);
        }
    
        return this.arrayOfTable;
    }*/

    printTable() {
        for (let y = 0; y < this.table.length; y++) {
            let tableRow = ""
            for (let x = 0; x < this.table[y].length; x++) {
                tableRow += '' + this.table[y][x] + " ";
            }
            console.log(tableRow);
        }
    }

    createTableFromArray(arrOfTable, maximumColumns) {
        // Setting the arrayOfTable equal to given array, or just the default arrayOfTable from this object.
        let singleArrOfTable = arrOfTable || this.singleArrayOfTable;
        let maxColumns = maximumColumns || this.maxCols;

        // number of rows: floor(i / maxCols), where i = length of arrOfTable (1d array)
        let numOfRows = floor(singleArrOfTable.length / maxColumns);

        // Create a table 2d array of length number of rows
        let newTable = [];
        //row = (i - col) / maxCols;

        // USING:
        // row = (i - col) / maxCols;
        // col = -(row * maxCols) / i;
        for (let row = 0; row < numOfRows; row++) {
            // For each row there should be a new array with length maxCols as thats the number of columns
            let currentRow = [];
            for (let col = 0; col < maxColumns; col++) {
                let valueFrom1dArray = this.valueAt(row, col);

                // get value from 1d array (singleArrayOfTable) and put it into the corresponding row and column of new Table
                currentRow[col] = valueFrom1dArray;
            }
            // Setting the current row of the new Table to that created row
            newTable.push(currentRow);
        }
        /*
        for (let row = 0; row < numOfRows; row++) {
            // For each row there should be a new array with length maxCols as thats the number of columns
            //newTable[row] = new Array(maxCols);
            let 
            for (let i = 0; i < maxCols; i++) {

                newTable[row] = ["0", i];
            }
            newTable[row] = ["1", 0];
            for (let col = 0; col < maxCols; col++) {
                // Equation for what should go in each spot: col = -(row * maxCols) / i, where i = number of rows)
                newTable[row][col] = -(row * maxCols) / numOfRows;
            }
        }*/
        return newTable;
    }

    getValuesFromUnknown(rowVal, columnVal, maxColsVal, iVal) {
        let row, col, maxCols, index;
        if (iVal != undefined) index = iVal;
        if (rowVal != undefined) row = rowVal;
        if (columnVal != undefined) col = columnVal;
        if (maxColsVal != undefined) maxCols = maxColsVal;

        console.log(row, col);
    
        if (row != undefined && maxCols != undefined && col != undefined) {
            // Get value from 1d array corresponding to given row and column value
            index = row * maxCols + col;
    
            return index;
        } else if (index != undefined && col != undefined && maxCols != undefined) {
            row = (index - col) / maxCols;
    
            return {"row": row};
        } else if (index != undefined && col != undefined && row != undefined) {
            maxCols = (index - col) / row;
    
            return {"maxCols": maxCols};
        } else if (row != undefined && maxCols != undefined && index != undefined) {
            col = -(row * maxCols) / index;
    
            return {"column": col};
        }
    
        return undefined;
    }
}
/*
    saveTable(row, column, maximumColumns) {

        let arrayLength = row * maximumColumns - column;
        return row * maximumColumns - column;


    }

    getValuesFromUnknown(iVal, rowVal, columnVal, maxColsVal) {
        let i = iVal || undefined;
        let row = rowVal || undefined;
        let col = columnVal || undefined;
        let maxCols = maxColsVal || undefined;
    
        if (row != undefined && maxCols != undefined && col != undefined) {
            i = row * maxCols + col;
    
            return {"i": i};
        } else if (i != undefined && col != undefined && maxCols != undefined) {
            row = (i - col) / maxCols;
    
            return {"row": row};
        } else if (i != undefined && col != undefined && row != undefined) {
            maxCols = (i - col) / row;
    
            return {"maxCols": maxCols};
        } else if (row != undefined && maxCols != undefined && i != undefined) {
            col = -(row * maxCols) / i;
    
            return {"column": col};
        }
    
        return undefined;
    }*/
/*
function createArray(rows, maximumColumns) {
    // Creates a table with random values between 0 and 1

    let arrayLength = rows * maximumColumns;

    for (let i = 0; i < arrayLength; i++) {
        this.arrayOfTable[i] = random(1);
    }

    return this.arrayOfTable;
}
let arrayTableMapper = new ArrayTableMapper();
let randomArray = arrayTableMapper.createRandomArray(4, 4)
let table = new ArrayToTable(randomArray);

// Print value at row 3, column 2 from the randomArray
console.log(arrayTableMapper.valueAt(3, 2));

// Print value at row 3, column 2 from the created table
console.log(table[3][2]);*/



/*
// A TABLE POSITION MAPPED TO A 1D ARRAY 
//        (THIS IS A NICE FORMAT)
//----------------------------------------------------------
// Algorithm to map every table configuration
// (i = column index + row index)???
// total rows can be calculated by saying:
// rows = floor(i / maxCols)
// cols = i % maxCols 
//
// FORMULAS:
// rows =  i / maxCols
// (SAME AS i = rows * maxCols)
// (SAME AS maxCols = i / row)
// is the expression: i = column index + row index always true???
//----------------------------------------------
// PROOF:
// floor(i / maxCols) is the same as saying i / maxCols = rows because the decimals that gets removed from floor function will not have any influence anyways.
// proof of statement: 7 / 4 = floor(1.75) = 1(ROW) ER DET SAMME SOM 1(ROW) * 4(MAXCOLS) = 4 
// 4 / 4 = 1(ROW) og 9 / 4 = floor(2.25) = 2(ROW) ER DET SAMME SOM 8 / 4 = 2 (ROW), så ved at floor()        floor(i) / maxCols because 
// total rows = floor(i / maxCols)
// maxCols
// i = row * atomCols + 
//--------------------------------
// TEST:
// determine row index, given i = 18, maxCols = 4; 
// row * maxCols + column = i
// 
// 
// SOLUTION:
// using formula: [i / maxCols = rows]
// 18/4 = 4.5 = ROW 4
// now that we know the row index, we only need to find the column index to use formula: [i = row + column]
// row * maxCols = i - column
// row * maxCols + column = i
// column = i % maxCols
// 18 % 4 = 2(column)
// using formula: [i = row * maxCols + column]
// i = 4 * 4 + 2 = 18
// We can conclude that given that i equals 18 and that the total columns equals 4, then row index: 4 and column index: 2


// decimals doesn't affect the result since the remainer of 18/4 is 18%4 which is actually the solution to solving the nth column in table
/*


    i1 = 18 / 4 = 4.5, floored = row 4
    i2 floor(x) = 18
    
*/
//---------------------------------------------------------------------------------------------------------------------------------------
// Coding challenge/coding problem
// If i was 7
// The column would be: 7 % 4(atomCols) = 3
// The row would be: 7 / 4(atomCols) = 1.75 floored so just 1.
// adding them together as a one line algoritm:
/* 
                    i = row * maxCols + column
                    i - column = row * maxCols
                    // (i - column) / maxCols = row
                    row = (i - column) / maxCols
                    // (i - column) / row = maxCols
                    maxCols = (i - column) / row
                    // -column = (row * maxCols) / i
                    column = -((row * maxCols) / i)
                */
//
// QUESTION: What is i if column is 2 and row is 4 (given that total columns = 4)?
// write this in one line:
// given a value for amount of rows and for amount of columns i can be calculated with: i = row + columns;
// It row that i needs should be the first thing to go at, because when you have the amount of rows you can deduce % (maybe reverse the nums noo)
// i = (4 * 4) + x 
// ANSWER:
// i = 4 * 4(atomCols) = 16  AND  i % 4(atomCols) = 2, i should be 2
// Now add the two values 16 + 2 and the answer is i = 18 if position is column 2 and row 4. 18%4 = 2(col) and floor(18/4) = 4(row)
/*
function saveTableConfiguration (row, column, maximumColumns) {
    return row * maximumColumns - column;
}

function getValuesFromUnknown(iVal, rowVal, columnVal, maxColsVal) {
    let i = iVal || undefined;
    let row = rowVal || undefined;
    let col = columnVal || undefined;
    let maxCols = maxColsVal || undefined;

    if (row != undefined && maxCols != undefined && col != undefined) {
        i = row * maxCols + col;

        return {"i": i};
    } else if (i != undefined && col != undefined && maxCols != undefined) {
        row = (i - col) / maxCols;

        return {"row": row};
    } else if (i != undefined && col != undefined && row != undefined) {
        maxCols = (i - col) / row;

        return {"maxCols": maxCols};
    } else if (row != undefined && maxCols != undefined && i != undefined) {
        col = -(row * maxCols) / i;

        return {"column": col};
    }

    return undefined;
}
*/

