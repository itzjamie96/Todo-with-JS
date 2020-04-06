const nameForm = document.querySelector(".js-form");
const nameInput = nameForm.querySelector("input");
const message = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

// Save name in Local Storage!
function saveName(name){
    localStorage.setItem(USER_LS, name);
}


// Submit Form
function handleSubmit(event){
    event.preventDefault(); //Enter 치면 empty form으로 reload 되는 것 방지
    
    const currentName = nameInput.value;
    // console.log(currentName);
    showMessage(currentName);
    saveName(currentName);
}


// Ask name of the user
function askForName(){
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleSubmit);
}


// Say hi to the user
function showMessage(name){
    // form에서 이름을 받았으니 안보이게 remove showing class
    nameForm.classList.remove(SHOWING_CN);

    // 이제 인사 message 보여야하니 add showing class
    message.classList.add(SHOWING_CN);

    // 인사 message에 input으로 들어온 이름 보여주기
    message.innerText = `Hello, ${name}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser == null){    // 현재 LS에 user 정보가 없다면
        askForName();   //이름을 물어보는 게 인지상정~

    } else{ // LS에 user 정보가 있다면
        showMessage(currentUser);   //인사 message 보여주기!
    }
    
}

function init(){
    loadName(); 
}

init();