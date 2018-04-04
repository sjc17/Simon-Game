let audioURL = [
'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

let audioGreen = new Audio(audioURL[0]);
let audioRed = new Audio(audioURL[1]);
let audioYellow = new Audio(audioURL[2]);
let audioBlue = new Audio(audioURL[3]);


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

    let midPointHorizontal = (borderWidth * 2 + middleWidth)/2+marginLeft+8;
    let midPointVertical = (borderWidth * 2 + middleWidth)/2+marginTop+8;

    let distanceFromMiddle = Math.pow(
        Math.pow(element.clientX-midPointHorizontal,2)+
        Math.pow(element.clientY-midPointVertical,2),0.5);
    
    if (distanceFromMiddle > middleWidth/2) {
        if (element.clientX<midPointHorizontal && element.clientY<midPointVertical) {
            audioGreen.loop = true;
        }
        else if (element.clientX>midPointHorizontal && element.clientY<midPointVertical) {
            audioRed.play();
        }
        else if (element.clientX<midPointHorizontal && element.clientY>midPointVertical) {
            audioYellow.play();
        }
        else if (element.clientX>midPointHorizontal && element.clientY>midPointVertical) {
            audioBlue.play();
        }
    }
});