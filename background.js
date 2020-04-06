const body = document.querySelector("body");

const IMG_NUMBER = 5;

function showImage(imgNumber){
    const img = new Image();
    img.src = `/img/${imgNumber}.jpg`;
    img.classList.add("backImg");
    body.prepend(img);  //appendChild는 배경이 앞에 와버려서 prepend
}

// 배경을 위한 랜덤 숫자 생성기
function generateRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER)+1;
    return number;
}

function init() {
    const randomNumber = generateRandom();
    showImage(randomNumber);
}

init();