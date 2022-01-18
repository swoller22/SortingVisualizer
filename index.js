import { Grid } from "./js/grid.js"
import { Tower } from "./js/tower.js"

const NUMBER_OF_ROWS = 60
const NUMBER_OF_COLUMNS = 100
const NUMBER_OF_TOWERS = 50

var towers = []
var grid = new Grid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS)

var intervalId = null
var algorithm = 'bubble'

$(document).ready(() => {

    initializeRandomGrid()
})

$("input[type=radio][name=inlineRadioOptions]").change(() => {

    initializeRandomGrid()
    switch ($("input[type=radio][name=inlineRadioOptions]:checked").val()) {
        case 'bubbleRadioOption':
            algorithm = bubbleSorter.algorithm
            break
        case 'insertionRadioOption':
            algorithm = insertionSorter.algorithm
            break
    }
})

function initializeRandomGrid() {

    towers = []
    for (let iTower = 0; iTower < NUMBER_OF_TOWERS; iTower++) {

        let height = Math.floor(Math.random() * 39) + 1
        let col = Math.floor(NUMBER_OF_COLUMNS / 2 - NUMBER_OF_TOWERS / 2) + iTower
        let tower = new Tower(height, col)
        towers.push(tower)
        grid.addTower(tower, "blue")
    }
}

$("#start").click(() => {
    if (!intervalId) {
        intervalId = setInterval(sortNext, 50, algorithm)
    } else {
        clearInterval(intervalId)
        intervalId = null
    }
})

function sortNext(algorithm) {

    switch (algorithm) {
        case 'bubble':
            bubbleSorter.sortNext()
            break
        case 'insertion':
            insertionSorter.sortNext()
            break
    }
}

var bubbleSorter = {
    algorithm: 'bubble',
    iTower: 0,
    jTower: 0,
    sortNext: function() {
        
        console.log(`Sorting with iTower: ${this.iTower}, jTower: ${this.jTower}`)
        if (this.iTower < NUMBER_OF_TOWERS) {
    
            if (this.jTower < NUMBER_OF_TOWERS - this.iTower - 1) {
    
                if (this.jTower > 0) grid.updateColor(towers[this.jTower - 1], "blue")
                grid.updateColor(towers[this.jTower], "purple")
                grid.updateColor(towers[this.jTower + 1], "purple")
    
                if (towers[this.jTower].height > towers[this.jTower + 1].height) {
                    let tmp = towers[this.jTower].height
                    towers[this.jTower].height = towers[this.jTower + 1].height
                    towers[this.jTower + 1].height = tmp
                    grid.addTower(towers[this.jTower], "purple")
                    grid.addTower(towers[this.jTower + 1], "purple")
                }
                this.jTower++;
            } else {
    
                this.iTower++;
                grid.updateColor(towers[NUMBER_OF_TOWERS - this.iTower], "green")
                grid.updateColor(towers[NUMBER_OF_TOWERS - this.iTower - 1], "blue")
                this.jTower = 0;
            }
        } else {
    
            clearInterval(intervalId)
        }
    }
}

var insertionSorter = {
    algorithm: 'insertion',
    iTower: 1,
    jTower: 1,
    sortNext: function() {
        
        console.log(`Sorting with iTower: ${this.iTower}, jTower: ${this.jTower}`)
        if (this.iTower < NUMBER_OF_TOWERS) {
    
            if (this.jTower > 0) {
    
                if (towers[this.jTower - 1].height > towers[this.jTower].height) {
                    let tmp = towers[this.jTower - 1].height
                    towers[this.jTower - 1].height = towers[this.jTower].height
                    towers[this.jTower].height = tmp
                    grid.addTower(towers[this.jTower - 1], "purple")
                    grid.addTower(towers[this.jTower], "purple")
                } else {
                    this.jTower = 1
                }
                this.jTower--
            } else {
    
                this.iTower++
                this.jTower = this.iTower
            }
        } else {
    
            clearInterval(intervalId)
        }
    }
}