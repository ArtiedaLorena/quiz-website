const startBtn = document.querySelector(".start-button");
const popUpInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const homeSection = document.querySelector('.home');
const quizBox = document.querySelector('.quiz-box');
const resultBox= document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn= document.querySelector('.goHome-btn');

// Cuando el botón de inicio se clickea
startBtn.onclick = () => {
    popUpInfo.classList.add('active');
    main.classList.add('active');
};

// Cuando el botón de salida se clickea
exitBtn.onclick = () => {
    popUpInfo.classList.remove('active');
    main.classList.remove('active');
};

// Cuando el botón de continuar se clickea
continueBtn.onclick = () => {
    quizSection.classList.remove('hidden'); // Muestra la sección del quiz
    quizSection.classList.add('active'); // Activa la animación para mostrarla
    popUpInfo.classList.remove('active'); // Oculta la ventana emergente
    main.classList.remove('active'); // (Opcional) Aquí puedes quitar la clase 'active' de 'main'
    homeSection.classList.add('hidden'); // Oculta la sección principal
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore= 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    homeSection.classList.remove('hidden'); // Mostrar la sección principal
    main.classList.remove('active'); // Dejar de difuminar la sección principal
    questionCount = 0;
    questionNumb = 1;
    userScore= 0;
    quizBox.classList.remove('active');
    popUpInfo.classList.remove('active'); // Asegurarse de que la ventana emergente esté oculta
};

let questionCount = 0;
let questionNumb = 1;
let userScore= 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        
        showResultBox();
    }
};

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb} ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i= 0; i< option.length;i++){
        option[i].setAttribute('onClick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions= optionList.children.length;


    if(userAnswer == correctAnswer){
        
        answer.classList.add('correct');
        userScore+=1;
        headerScore();
    }
    else{
        
        answer.classList.add('incorrect');
        
        //Si la respuesta es incorrecta se autoselecciona la respeusta correcta
        for(let i=0; i< allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }
    for(let i=0; i< allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} de ${questions.length} Preguntas`;
}

function headerScore(){
    const headerScoreText= document.querySelector('.header-score');
    headerScoreText.textContent= `Puntaje: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText= document.querySelector('.score-text');
    scoreText.textContent= `Tu puntaje ${userScore} de ${questions.length}`;
    
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue= document.querySelector('.progress-value');
    let progressStartValue= -1;
    let progressEndValue= (userScore/questions.length)*100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
    
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
    
        if (progressStartValue == progressEndValue) {
          clearInterval(progress);
        }
      }, speed);
}
