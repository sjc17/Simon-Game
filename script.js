let audioURL = [
'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

let audioGreen = new Audio(audioURL[0]);
let audioRed = new Audio(audioURL[1]);
let audioYellow = new Audio(audioURL[2]);
let audioBlue = new Audio(audioURL[3]);


let clickable = false;
const USER_CLICKED = true;

let buttonSeries = [];
let myButtonPresses = [];
let level;
let strict = false;
let strictGameOver = false;

//
// Functions
//
function clickGreen() {
    console.log("clickGreen()");
    clickable = false;
    checkUserInput(0);
    lightUpGreen(USER_CLICKED);
}
function clickRed() {
    console.log("clickRed()");
    clickable = false;
    checkUserInput(1);
    lightUpRed(USER_CLICKED);
}
function clickYellow() {
    console.log("clickYellow()");
    clickable = false;
    checkUserInput(2);
    lightUpYellow(USER_CLICKED);
}
function clickBlue() {
    console.log("clickBlue()");
    clickable = false;
    checkUserInput(3);
    lightUpBlue(USER_CLICKED);
}

function lightUpGreen() {
    console.log("lightUpGreen()");
    document.getElementById('all-buttons').style.borderLeftColor = 'green';
    audioGreen.load();
    audioGreen.play();
    setTimeout(() => {
        document.getElementById('all-buttons').style.borderLeftColor = 'darkgreen';
    }, 500);
}
function lightUpRed() {
    console.log("lightUpRed()");
    document.getElementById('all-buttons').style.borderTopColor = 'red';
    audioRed.load();
    audioRed.play();
    setTimeout(() => {
        document.getElementById('all-buttons').style.borderTopColor = 'darkred';
    }, 500);
}
function lightUpYellow() {
    console.log("lightUpYellow()");
    document.getElementById('all-buttons').style.borderBottomColor = 'yellow';
    audioYellow.load();
    audioYellow.play();
    setTimeout(() => {
        document.getElementById('all-buttons').style.borderBottomColor = 'rgb(173, 173, 0)';    
    }, 500);
}
function lightUpBlue() {
    console.log("lightUpBlue()");
    document.getElementById('all-buttons').style.borderRightColor = 'blue'; 
    audioBlue.load();
    audioBlue.play();
    setTimeout(() => {
        document.getElementById('all-buttons').style.borderRightColor = 'darkblue';
    }, 500);
}

function newGame() {
    console.log("newGame()");
    // Initialize with number from 0 - 3
    level = 1;
    buttonSeries = [Math.floor(Math.random() * 4)];
    myButtonPresses = [];  
    document.getElementById('displayer').innerHTML = "Level "+level;
    showButtonSeries();
}

function showButtonSeries() {
    clickable = false;
    setTimeout(()=>{
        showNextButton(0);
    }, 700);
}

function showNextButton(index) {
    setTimeout(() => {
        switch (buttonSeries[index]) {
            case 0:
                lightUpGreen();
                break;
            case 1:
                lightUpRed();
                break;
            case 2:
                lightUpYellow();
                break;
            case 3:
                lightUpBlue();
                break;
            default:
                return waitForResponse();
        }
        setTimeout(() => {
            showNextButton(index+1);
        }, 500);
    }, 200);    
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
        myButtonPresses = [];
        clickable = false;
        if (strictGameOver) {
            newGame();
        }
        else {
            setTimeout(() => {
                showButtonSeries();
            }, 500);
        }
    }
    else {
        console.log('Right answer!');
        nextStep();
    }
}

function nextStep() {
    console.log("nextStep()");
    if (myButtonPresses.length === buttonSeries.length) {
        if (level === 20) {
            console.log("You win");
            document.getElementById('displayer').innerHTML = "You win!!!";
            setTimeout(() => {            
                newGame();
            }, 5000);
        }
        else {
            level++;
            buttonSeries.push(Math.floor(Math.random() * 4));
            console.log("Level: "+level);
            document.getElementById('displayer').innerHTML = "Level "+level;
            myButtonPresses = [];
            showButtonSeries();
        }
    }
    else {
        clickable = true;
        waitForResponse();
    }
}

document.getElementById('all-buttons').addEventListener('mousedown', (element) => {
    let x = element.clientX;
    let y = element.clientY;
    //let midpoint = (element.offsetWidth + element.style.getPropertyValue('border-left-width')*2)/2;
    let borderWidth = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('border-left-width');
    borderWidth = Number(borderWidth.slice(0, borderWidth.length-2));
    let middleWidth = getComputedStyle(document.getElementById('middle-area'), null).getPropertyValue('width');
    middleWidth = Number(middleWidth.slice(0, middleWidth.length-2));
    let marginTop = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('margin-top');
    marginTop = Number(marginTop.slice(0, marginTop.length-2));
    let marginLeft = getComputedStyle(document.getElementById('all-buttons'), null).getPropertyValue('margin-left');
    marginLeft = Number(marginLeft.slice(0, marginLeft.length-2));

    let boundingClientRects = document.getElementById('all-buttons').getBoundingClientRect();

    let midPointHorizontal = boundingClientRects.x + boundingClientRects.width/2;
    let midPointVertical = boundingClientRects.y + boundingClientRects.height/2;

    let distanceFromMiddle = Math.pow(
        Math.pow(element.clientX-midPointHorizontal,2)+
        Math.pow(element.clientY-midPointVertical,2),0.5);
/*
    console.log("x: "+x);
    console.log("y: "+y);

    console.log("Distance from middle: "+distanceFromMiddle);
    console.log("Mid point horizontal: "+midPointHorizontal);
    console.log("Mid point vertical: "+midPointVertical);*/
    
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

document.getElementById('new-game').addEventListener('click', () => {
    newGame();
});

document.getElementById('strict-switch').addEventListener('change', () => {
    strictGameOver = !strictGameOver;
    console.log('strict game over is now '+strictGameOver)
});
