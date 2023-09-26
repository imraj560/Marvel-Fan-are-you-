const questions = [
    {
        question: "Name the first Avenger?",
        answers: [

            {text: "Iron Man", correct: false},
            {text: "Hulk", correct: false},
            {text: "Captain America", correct: true},
            {text: "Thor", correct: false}
        ]
    },

    {
        question: "Who Killed Tony's Parents?",
        answers: [

            {text: "Nazi Doctor", correct: false},
            {text: "Winter Soldier", correct: true},
            {text: "It was an accident", correct: false},
            {text: "They killed themselves", correct: false}
        ]
    },

    {
        question: "Name of the Serun used on Hulk?",
        answers: [

            {text: "Super Serum", correct: false},
            {text: "Death Doze", correct: false},
            {text: "Banner Chemical", correct: false},
            {text: "Super Soldier Serum", correct: true}
        ]
    },

    {
        question: "Who destroys Asgard?",
        answers: [

            {text: "Loki", correct: false},
            {text: "Fenris", correct: false},
            {text: "Hela", correct: false},
            {text: "Surtur", correct: true}
        ]
    },

    {
        question: "Name of the Original Spider man actor?",
        answers: [

            {text: "Tom Holland", correct: false},
            {text: "Toby Maguire", correct: true},
            {text: "Andrew Garfield", correct: false},
            {text: "None of the Above", correct: false}
        ]
    },

    {
        question: "Who is the strongest Avenger?",
        answers: [

            {text: "Hulk", correct: true},
            {text: "Iron Man", correct: false},
            {text: "Captain Marvel", correct: false},
            {text: "Black Widow", correct: false}
        ]
    }
];


const questionElement  = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach((answer)=>{

        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if(answer.correct){

            button.dataset.correct = answer.correct;

        }

        button.addEventListener('click', selectAnswer);

    })
}

function resetState(){

    nextButton.style.display = 'none';

    while(answerButtons.firstChild){

        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){

    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct == 'true';

    if(isCorrect){

        selectedBtn.classList.add('correct');
        score++;
    }else{

        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach((button)=>{

        if(button.dataset.correct === "true"){

            button.classList.add('correct');

        }

        button.disabled = true;

    })

    nextButton.style.display = 'block';


}

function showScore(){

    resetState();

    questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions!`;

    nextButton.innerHTML = 'Play Again';

    nextButton.style.display = 'block';
}

function handleNextButton(){

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){

        showQuestions();
        
    }else{

        showScore();
    }

}

nextButton.addEventListener('click', ()=>{

    if(currentQuestionIndex < questions.length){

        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();