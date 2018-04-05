let audioGreen = document.getElementsByTagName('audio')[0];
let audioRed = document.getElementsByTagName('audio')[1];
let audioYellow = document.getElementsByTagName('audio')[2];
let audioBlue = document.getElementsByTagName('audio')[3];

let clickable = true;
const USER_CLICKED = true;

function clickGreen() {
    clickable = false;
    lightUpGreen(USER_CLICKED);
}
function clickRed() {
    clickable = false;
    lightUpRed(USER_CLICKED);
}
function clickYellow() {
    clickable = false;
    lightUpYellow(USER_CLICKED);
}
function clickBlue() {
    clickable = false;
    lightUpBlue(USER_CLICKED);
}

function lightUpGreen(userClicked) {
    document.getElementById('all-buttons').style.borderLeftColor = 'green';
    audioGreen.play();
    setTimeout(() => {
        if (userClicked) {
            clickable = true;
        }
        document.getElementById('all-buttons').style.borderLeftColor = 'darkgreen';
    }, 500);
}
function lightUpRed(userClicked) {
    document.getElementById('all-buttons').style.borderTopColor = 'red';
    audioRed.play();
    setTimeout(() => {
        if (userClicked) {
            clickable = true;
        }
        document.getElementById('all-buttons').style.borderTopColor = 'darkred';
    }, 500);
}
function lightUpYellow(userClicked) {
    document.getElementById('all-buttons').style.borderBottomColor = 'yellow';
    audioYellow.play();
    setTimeout(() => {
        if (userClicked) {
            clickable = true;
        }
        document.getElementById('all-buttons').style.borderBottomColor = 'rgb(173, 173, 0)';    
    }, 500);
}
function lightUpBlue(userClicked) {
    document.getElementById('all-buttons').style.borderRightColor = 'blue'; 
    audioBlue.play();
    setTimeout(() => {
        if (userClicked) {
            clickable = true;
        }
        document.getElementById('all-buttons').style.borderRightColor = 'darkblue';
    }, 500);
}

// Defining clickable area
let borderWidth = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('border-left-width');
borderWidth = Number(borderWidth.slice(0, borderWidth.length-2));
let middleWidth = getComputedStyle(document.getElementById('middle-area'), null).getPropertyValue('width');
middleWidth = Number(middleWidth.slice(0, middleWidth.length-2));
let marginTop = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('margin-top');
marginTop = Number(marginTop.slice(0, marginTop.length-2));
let marginLeft = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('margin-left');
marginLeft = Number(marginLeft.slice(0, marginLeft.length-2));
let midPointHorizontal = (borderWidth * 2 + middleWidth)/2 + marginLeft + 8;
let midPointVertical = (borderWidth * 2 + middleWidth)/2 + marginTop + 8;

document.getElementById('all-buttons').addEventListener('click', (element) => {
    let x = element.clientX;
    let y = element.clientY;
    let distanceFromMiddle = Math.pow(
        Math.pow(element.clientX-midPointHorizontal,2)+
        Math.pow(element.clientY-midPointVertical,2),
    0.5);

    if (distanceFromMiddle > middleWidth/2 && clickable) {
        if (element.clientX<midPointHorizontal && element.clientY<midPointVertical) {
            clickGreen();
        }
        else if (element.clientX>midPointHorizontal && element.clientY<midPointVertical) {
            clickRed();
        }
        else if (element.clientX<midPointHorizontal && element.clientY>midPointVertical) {
            clickYellow();
        }
        else if (element.clientX>midPointHorizontal && element.clientY>midPointVertical) {
            clickBlue();
        }        
    }
});

let buttonSeries = [];
let level;

function newGame() {
    // Initialize with number from 0 - 3
    buttonSeries = [Math.floor(Math.random() * 4)];
    level = 1;
}

newGame();