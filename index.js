import { Grid } from "./js/grid.js"
import { Tower } from "./js/tower.js"

const NUMBER_OF_ROWS = 60
const NUMBER_OF_COLUMNS = 100
const NUMBER_OF_TOWERS = 50

var towers = []
var grid = new Grid(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS)

var iTower = 0
var jTower = 0
var intervalId = null
var algorithm = 'bubble'

$(document).ready(() => {

    initializeRandomGrid()
})

$("input[type=radio][name=inlineRadioOptions]").change(() => {

    initializeRandomGrid()
    iTower = 0
    jTower = 0
    switch($("input[type=radio][name=inlineRadioOptions]:checked").val()) {
        case 'bubbleRadioOption':
            algorithm = 'bubble'
            break
        case 'insertionRadioOption':
            algorithm = 'insertion'
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
            sortBubbleNext()
            break
        case 'insertion':
            sortInsertionNext()
            break
    }
}

function sortBubbleNext() {

    console.log(`Sorting with iTower: ${iTower}, jTower: ${jTower}`)
    if (iTower < NUMBER_OF_TOWERS) {

        if (jTower < NUMBER_OF_TOWERS - iTower - 1) {

            if (jTower > 0) grid.updateColor(towers[jTower - 1], "blue")
            grid.updateColor(towers[jTower], "purple")
            grid.updateColor(towers[jTower + 1], "purple")

            if (towers[jTower].height > towers[jTower + 1].height) {
                let tmp = towers[jTower].height
                towers[jTower].height = towers[jTower + 1].height
                towers[jTower + 1].height = tmp
                grid.addTower(towers[jTower], "purple")
                grid.addTower(towers[jTower + 1], "purple")
            }
            jTower++;
        } else {

            iTower++;
            grid.updateColor(towers[NUMBER_OF_TOWERS - iTower], "green")
            grid.updateColor(towers[NUMBER_OF_TOWERS - iTower - 1], "blue")
            jTower = 0;
        }
    } else {

        clearInterval(intervalId)
    }
}

function sortInsertionNext() {

    console.log(`Sorting with iTower: ${iTower}, jTower: ${jTower}`)
    if(iTower < NUMBER_OF_TOWERS) {

        if(jTower > 0) {
            
            if (towers[jTower-1].height > towers[jTower].height) {
                let tmp = towers[jTower-1].height
                towers[jTower-1].height = towers[jTower].height
                towers[jTower].height = tmp
                grid.addTower(towers[jTower-1], "purple")
                grid.addTower(towers[jTower], "purple")
            } else {
                jTower = 1
            }
            jTower--
        } else {

            iTower++
            jTower=iTower
        }
    } else {

        clearInterval(intervalId)
    }
}