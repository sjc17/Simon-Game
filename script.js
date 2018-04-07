//
// Variables
//
let audioGreen = document.getElementsByTagName('audio')[0];
let audioRed = document.getElementsByTagName('audio')[1];
let audioYellow = document.getElementsByTagName('audio')[2];
let audioBlue = document.getElementsByTagName('audio')[3];

let clickable = false;
const USER_CLICKED = true;

let buttonSeries = [];
let myButtonPresses = [];
let level;
let strict = false;
let strictGameOver = false;
let timer;

//
// Functions
//
function clickGreen() {
    console.log("clickGreen()");
    clickable = false;
    clearTimeout(timer);
    checkUserInput(0);
    lightUpGreen(USER_CLICKED);
}
function clickRed() {
    console.log("clickRed()");
    clickable = false;
    clearTimeout(timer);
    checkUserInput(1);
    lightUpRed(USER_CLICKED);
}
function clickYellow() {
    console.log("clickYellow()");
    clickable = false;
    clearTimeout(timer);
    checkUserInput(2);
    lightUpYellow(USER_CLICKED);
}
function clickBlue() {
    console.log("clickBlue()");
    clickable = false;
    clearTimeout(timer);
    checkUserInput(3);
    lightUpBlue(USER_CLICKED);
}

function lightUpGreen(userClicked) {
    console.log("lightUpGreen("+userClicked+")");
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
    console.log("lightUpRed("+userClicked+")");
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
    console.log("lightUpYellow("+userClicked+")");
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
    console.log("lightUpBlue("+userClicked+")");
    document.getElementById('all-buttons').style.borderRightColor = 'blue'; 
    audioBlue.play();
    setTimeout(() => {
        if (userClicked) {
            clickable = true;
        }
        document.getElementById('all-buttons').style.borderRightColor = 'darkblue';
    }, 500);
}

function newGame() {
    console.log("newGame()");
    // Initialize with number from 0 - 3
    level = 1;
    buttonSeries = [Math.floor(Math.random() * 4)];
    myButtonPresses = [];  
    showButtonSeries();
    waitForResponse();
}

function showButtonSeries() {
    console.log("showButtonSeries()");
    console.log(buttonSeries);
}

function waitForResponse() {
    console.log("waitForResponse()");
    clickable = true;/*
    timer = setTimeout(() => {
        console.log('Timed out');
    }, 5000);*/
}

function checkUserInput(num) {
    console.log("checkUserInput()");
    myButtonPresses.push(num);
    if (num!==buttonSeries[myButtonPresses.length-1]) {
        console.log('Wrong answer!');
    }
    else {
        console.log('Right answer!');
        nextStep();
    }
}

function nextStep() {
    console.log("nextStep()");
    if (myButtonPresses.length === buttonSeries.length) {
        if (level === 5) {
            console.log("You win");
        }
        else {
            level++;
            buttonSeries.push(Math.floor(Math.random() * 4));
            console.log("Level: "+level);
            myButtonPresses = [];
            showButtonSeries();
        }
    }
    clickable = true;
    waitForResponse();
}

//
// Inputs
//


    

document.getElementById('new-game').addEventListener('click', () => {
    newGame();
});

console.log(getComputedStyle(document.getElementById('middle-area')));
console.log(document.getElementById('middle-area').getClientRects());

/*
document.getElementById('all-buttons').addEventListener('click', (element) => {
    // Defining clickable area
    /*let borderWidth = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('border-left-width');
    borderWidth = Number(borderWidth.slice(0, borderWidth.length-2));
    let middleWidth = getComputedStyle(document.getElementById('middle-area'), null).getPropertyValue('width');
    middleWidth = Number(middleWidth.slice(0, middleWidth.length-2));
    let marginTop = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('margin-top');
    marginTop = Number(marginTop.slice(0, marginTop.length-2));
    let marginLeft = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('margin-left');
    marginLeft = Number(marginLeft.slice(0, marginLeft.length-2));
    let allMargins = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('margin');
    let midPointHorizontal = (borderWidth * 2 + middleWidth)/2 + marginLeft + 8;
    let midPointVertical = (borderWidth * 2 + middleWidth)/2 + marginTop + 8;

    let borderWidth = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('border-left-width');
    borderWidth = Number(borderWidth.slice(0, borderWidth.length-2));
    let middleWidth = getComputedStyle(document.getElementById('middle-area'), null).getPropertyValue('width');
    middleWidth = Number(middleWidth.slice(0, middleWidth.length-2));

    let clientRects = document.getElementById('all-buttons').getClientRects();
    let marginTop = clientRects[0].top;
    let marginLeft = clientRects[0].left;

    let midPointHorizontal = (borderWidth * 2 + middleWidth)/2 + marginLeft + 8;
    let midPointVertical = (borderWidth * 2 + middleWidth)/2 + marginTop + 8;

    let x = element.clientX;
    let y = element.clientY;
    let distanceFromMiddle = Math.pow(
        Math.pow(element.clientX-midPointHorizontal,2)+
        Math.pow(element.clientY-midPointVertical,2),
    0.5);

/*
    console.log('borderWidth '+borderWidth);
    console.log('middleWidth '+middleWidth);
    console.log('marginTop '+marginTop);
    console.log('marginLeft '+marginLeft);
    console.log('midPointHorizontal '+midPointHorizontal);
    console.log('midPointVertical '+midPointVertical);
    console.log("x: "+x+". y: "+y);/*
    console.log("distance from middle: "+distanceFromMiddle);
    console.log("middle radius: "+middleWidth/2);   

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
*/