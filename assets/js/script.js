/* Javascript Elements */
// Main Menu Box
const main_menu = document.querySelector(".main_menu");

// Start Quiz Button (from Main Menu) to Information Box 
const start_btn = document.querySelector(".start_btn");

// Show Credits Button (from Main Menu) to Credits Box
const credits_btn = document.querySelector(".credits_btn");

// Credits Box
const credits_box = document.querySelector(".credits_box");

// Back to Main Menu (from Credits Box)
const cmenu_btn = credits_box.querySelector(".buttons .menu");

// Information Box
const info_box = document.querySelector(".info_box");

// Back to Main Menu (From Information Box)
const imenu_btn = info_box.querySelector(".buttons .menu");

// Continue to Quiz Box
const continue_btn = info_box.querySelector(".buttons .continue");

// Quiz Box
const quiz_box = document.querySelector(".quiz_box");

// Count of Remaining Questions
const question_counter = document.querySelector("header .total_que");

// Question Illustrations
const qImg = document.querySelector(".qImg");

// Header Time Line after Answering Questions
const time_line = document.querySelector("header .time_line");

// Element of Questions
const question = document.querySelector(".que_text .question");

// Element of Responses
const response = document.querySelector(".que_text .response");

// List Element of Answer Options
const option_list = document.querySelector(".option_list");

// Next Question Button
const next_btn = document.querySelector("footer .next_btn");

// Result Box
const result_box = document.querySelector(".result_box");

// Restart Button
const restart_quiz = result_box.querySelector(".buttons .restart");

// Quit Button
const quit_quiz = result_box.querySelector(".buttons .quit");

// Background Music
const bgm = document.getElementById('bgm');

/* Global Variable */
// Variable of Current Question Index Address
let que_count = 0; // Nomor soal saat ini

// Variable of Current Question Number
let que_numb = 1;

// Score Counter for Correct Answer (+5)
let userScore = 0;

// Line Drawing in Header Time Line of Quiz Box
let counterLine;

// Width of Quiz Box in Pixels (for Time Line)
let widthInPixels = quiz_box.clientWidth;

/* Button Event */
// Event for hiding the main menu box and displaying the info box
start_btn.onclick = () => {
    playSound('click');
    main_menu.style.display = "none";
    info_box.classList.add("activeInfo");
}

// Event for hiding the info box and displaying the main menu box
imenu_btn.onclick = () => {
    playSound('click');
    main_menu.style.display = "flex";
    info_box.classList.remove("activeInfo");
}

// Event for hiding the main menu box and displaying the credits box
credits_btn.onclick = () => {
    playSound('click');
    main_menu.style.display = "none";
    credits_box.classList.add("activeCredits");
}

// Event for hiding the credits box and displaying the main menu box
cmenu_btn.onclick = () => {
    playSound('click');
    main_menu.style.display = "flex";
    credits_box.classList.remove("activeCredits");
}

// Event for hiding the info box and displaying the quiz box to start quiz
continue_btn.onclick = () => {
    bgm.play();
    playSound('click');
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz");
    response.classList.remove("correct");
    response.classList.remove("incorrect");
    response.classList.add("Hidden");
    time_line.style.width = 0;
    showQuetions(que_count); // Show first question by index
    queCounter(que_numb); // Show question number in header
}

// Event for hiding the result box and displaying the quiz box to restart quiz 
restart_quiz.onclick = () => {
    playSound('click');
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    response.classList.add("Hidden");
    response.classList.remove("correct");
    response.classList.remove("incorrect");
    option_list.classList.remove("Hidden");
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    time_line.style.width = 0;
    showQuetions(que_count); // Show first question by index
    queCounter(que_numb); // Show question number in header
}

// Event for quit the quiz game by reload index.html
quit_quiz.onclick = () => {
    playSound('click');
    window.location.reload(); 
}

// Event for show next question and displaying the result box after last question 
next_btn.onclick = () => {
    playSound('click');
    if (que_count < questions.length - 1) {
        que_count++; 
        que_numb++;
        showQuetions(que_count); // Show first question by index
        queCounter(que_numb); // Show question number in header
        time_line.style.width = 0;
        next_btn.classList.remove("show"); // Hiding Next Button
        response.classList.remove("correct");
        response.classList.remove("incorrect");
        option_list.classList.remove("Hidden");
        response.classList.add("Hidden");
    } else { // If all questions have been answered
        time_line.style.width = 0;
        showResult();
    }
}

/* Functions */
// Function to show question and option list
function showQuetions(index) {
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    qImg.innerHTML = "<img src=" + questions[index].qImg + ">"; // Show Question Illustrations
    question.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; // Show Option List
    const option = option_list.querySelectorAll(".option");
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)"); // Add Click Event for Option List
    }
}

// Function to handle the logic when a user selects an answer option
function optionSelected(answer) {
    option_list.classList.add("Hidden");
    startTimeLine(0, widthInPixels); // Start Time Line
    playSound('click');

    // Show response after 2 seconds
    setTimeout(function () {
        // Set the response according to the choices
        let userAns = answer.textContent; 
        let selectedOptionIndex = questions[que_count].options.indexOf(userAns);
        let correcAns = questions[que_count].answer; 
        let resp_tag;
        response.classList.remove("Hidden");
        if (userAns == correcAns) { // If correct answer
            playSound('correct');
            userScore += 5; // add score
            response.classList.add("correct"); // Mark the answer as correct
            resp_tag = '<div>Jawaban Benar!<br><span>' + questions[que_count].responses[selectedOptionIndex] + '</span></div>';
        } else { // if wrong answer
            playSound('incorrect');
            response.classList.add("incorrect"); // Mark the answer as wrong
            resp_tag = '<div>Jawaban Salah!<br><span>' + questions[que_count].responses[selectedOptionIndex] + '</span></div>';
        }
        
        // Adding responses without deleting existing content
        response.innerHTML = resp_tag;
        
        next_btn.classList.add("show"); // Show next button
    }, 2000);
}
// Function to show result box
function showResult() {
    quiz_box.classList.remove("activeQuiz"); // Hiding quiz box
    response.classList.add("Hidden");
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 80) {
        playSound('win')
        let scoreTag = `<span>Skor = <p>${userScore}</p>/ 100 👏</span>`;
        scoreText.innerHTML = scoreTag;  
        // Start confetti.js animation
        const startit = () => {
            setTimeout(function () {
                confetti.start();
            },);
        };
        // Stop confetti.js animation
        const stopit = () => {
            setTimeout(function () {
                confetti.stop();
            }, 4000);
        };
        startit();
        stopit();
    } else if (userScore > 60) { 
        playSound('win')
        let scoreTag = `<span>Skor = <p>${userScore}</p>/ 100 🎉</span>`;
        scoreText.innerHTML = scoreTag;  
    } else if (userScore <= 60) { 
        playSound('lose')
        let scoreTag = `<span>Skor = <p>${userScore}</p>/ 100 😐</span>`;
        scoreText.innerHTML = scoreTag;
    }
}

// Function to start Time Line in Header
function startTimeLine(time, width) {
    counterLine = setInterval(timer, 2);
    function timer() {
        time += 1.5;
        time_line.style.width = time + "px"; // Sets the Time Line width
        if (time > width) {
            clearInterval(counterLine);
        }   
    }
}

// Function to show remaining questions
function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    question_counter.innerHTML = totalQueCounTag;
}

// Function to play sound effects
function playSound(soundId) {
    var sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
}