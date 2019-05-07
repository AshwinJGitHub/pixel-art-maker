let brushColor = 'white'
let mouseDownActive = false
let currentR = 0;
let currentG = 0;
let currentB = 0;

const rgbToHex = (rgb) => {
    let hex = Number(rgb).toString(16); 
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};
const createBox = () => {
    let box = document.createElement('div')
    box.className="box"
    box.addEventListener('click', (evt) => {
        evt.target.style.backgroundColor = brushColor
        evt.target.style.borderColor = brushColor
    })
    box.addEventListener('mousedown', (evt) => {
        // evt.target.style.backgroundColor = brushColor
        // evt.target.style.borderColor = brushColor
        mouseDownActive = true
    })
    box.addEventListener('mouseover', (evt) => {
        if (mouseDownActive) {
            evt.target.style.backgroundColor = brushColor
            evt.target.style.borderColor = brushColor
        }
    })
    box.addEventListener('mouseup', (evt) => {
        mouseDownActive = false
    })
    return box
}
const createPalette = (itemArray) => {
    let paletteContainer = document.createElement('div')
    paletteContainer.className = 'paletteContainer'
    itemArray.forEach(element => {
        paletteContainer.appendChild(element)
    });
    let currentColor = document.createElement('input')
    currentColor.type = 'color'
    currentColor.value = '#ffffff'
    currentColor.className='currentColor'
    currentColor.addEventListener('input', () => {
        brushColor = currentColor.value
    } )
    paletteContainer.appendChild(currentColor)
    return paletteContainer
}
const paletteColorItem = (color) => {
    let paletteItem = document.createElement('div')
    paletteItem.className='paletteItem'
    paletteItem.style.backgroundColor = color
    paletteItem.addEventListener('click', (evt) => {
        brushColor = color
        let currentColor = document.querySelector('.currentColor')
        let hexColor = color.slice(4, color.length-1)
        hexColor = hexColor.split(', ')
        hexColor = hexColor.reduce((acc, currVal) => {
           acc = acc + rgbToHex(currVal)
           return acc
        }, '#')
        console.log(hexColor)
        currentColor.value = hexColor
    })
    return paletteItem
}
const buildPaletteItems = () => {
    let colorArray = []
    for (let r = 0; r < 256; r += 85) {
        for (let g = 0; g < 256; g += 85) {
            for (let b = 0; b < 256; b += 85) {
                colorArray.push(paletteColorItem(`rgb(${r}, ${g}, ${b})`))
            }
        }
    }
    return colorArray
}

let rootElement = document.querySelector('.root')
let mainContainer = document.createElement('div')
mainContainer.className="mainContainer"
rootElement.appendChild(mainContainer)
let containerElement = document.querySelector('.mainContainer')
for (let i = 0; i < 5000; i++) {
    containerElement.appendChild(createBox())
}
rootElement.appendChild(createPalette(buildPaletteItems()))