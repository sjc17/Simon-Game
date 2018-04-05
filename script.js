let audioGreen = document.getElementsByTagName('audio')[0];
let audioRed = document.getElementsByTagName('audio')[1];
let audioYellow = document.getElementsByTagName('audio')[2];
let audioBlue = document.getElementsByTagName('audio')[3];
//let midpoint = (element.offsetWidth + element.style.getPropertyValue('border-left-width')*2)/2;
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


document.getElementById('all-buttons').addEventListener('mousedown', (element) => {
    let x = element.clientX;
    let y = element.clientY;
    let distanceFromMiddle = Math.pow(
        Math.pow(element.clientX-midPointHorizontal,2)+
        Math.pow(element.clientY-midPointVertical,2),
    0.5);
    console.log("x "+x);
    console.log("y "+y);
    if (distanceFromMiddle > middleWidth/2) {
        if (element.clientX<midPointHorizontal && element.clientY<midPointVertical) {
            document.getElementById('all-buttons').style.borderLeftColor = 'green';            
            audioGreen.play();
        }
        else if (element.clientX>midPointHorizontal && element.clientY<midPointVertical) {
            document.getElementById('all-buttons').style.borderTopColor = 'red';            
            audioRed.play();
        }
        else if (element.clientX<midPointHorizontal && element.clientY>midPointVertical) {
            document.getElementById('all-buttons').style.borderBottomColor = 'yellow';            
            audioYellow.play();
        }
        else if (element.clientX>midPointHorizontal && element.clientY>midPointVertical) {
            document.getElementById('all-buttons').style.borderRightColor = 'blue';            
            audioBlue.play();
        }
    }
});

document.getElementById('all-buttons').addEventListener('mouseup', () => {
    document.getElementById('all-buttons').style.borderLeftColor = 'darkgreen';
    document.getElementById('all-buttons').style.borderRightColor = 'darkblue';
    document.getElementById('all-buttons').style.borderTopColor = 'darkred';
    document.getElementById('all-buttons').style.borderBottomColor = 'rgb(173, 173, 0)';
    
});
