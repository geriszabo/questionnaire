// Importing module
"use strict";

import { questions } from "./questions.js";
import { messages } from "./questions.js";

// let allValues = [];
// const modalBody = document.querySelector(".modalBody");

const mainContainer = document.querySelector(".mainContainer");
const sendBtn = document.querySelector(".sendBtn");
const modal = document.querySelector(".modal");

// Nr of questions in the header
document.querySelector(".questnr").textContent = questions.length;

//Functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const appendQuestions = function () {
  questions.map((question) => {
    const html = `
  <div class="mainContainer">
    <div class="subContainer">
      <div class="qestionAndRangeContainer">
        <div class="questionContainer">
          <p>${question.hun}</p>
        </div>
        <div class="rangeContainer">
            <input class="rangeInput" type="range" min="1" max="100" value="100" />
          <div class="sliderValueContainer">
            <p class="sliderValue">100%</p>
          </div>
        </div>
      </div>
      <div class="noteContainer">
        <textarea class="questionNote cols="30" rows="10" placeholder="megjegyzés"></textarea>
      </div>
    </div>
  </div>

  `;
    mainContainer.insertAdjacentHTML("beforeend", html);
  });
};

appendQuestions();

// Range input values become text values
const displayPercentages = function () {
  Array.from(document.querySelectorAll(".rangeInput")).map((slider, i) => {
    slider.addEventListener("input", function () {
      document.querySelectorAll(".sliderValue")[
        i
      ].textContent = `${slider.value}%`;
    });
  });
};

displayPercentages();

// Functions
// Calculate average
const calcAvg = function (arr) {
  const valuesAvg = arr.reduce((sum, num) => sum + num / arr.length, 0);
  return valuesAvg;
};

const percentagesArr = Array.from(document.querySelectorAll(".sliderValue"));
const notesArr = Array.from(document.querySelectorAll(".questionNote"));
console.log(notesArr.value);

const getQuestionsValuesNotes = function () {
  questions.map((question, i) => {
    questions[i].percentage = parseFloat(percentagesArr[i].textContent);
    questions[i].note = notesArr[i].value;
  });
};

// Modal with error and success message
const showAndRemoveMessage = function (text = "success", sec) {
  modal.classList.remove("hidden");
  modal.classList.add(`modal--${text}`);
  document.querySelector(".modalText").textContent = messages[text];
  setInterval(() => modal.classList.add("hidden"), sec * 1000);
  setInterval(() => modal.classList.remove(`modal--${text}`), sec * 1000);
};

sendBtn.addEventListener("click", function (e) {
  getQuestionsValuesNotes();
  let msg = "success";

  questions.map((question, i) => {
    if (parseFloat(question.percentage) <= 80 && question.note.length === 0) {
      e.preventDefault();
      msg = "error";
      notesArr[i].classList.add("redborder");
      console.log(`Question number ${i} was not answered`);
      console.log(msg, "from under 80 ⬇");
    }
  });
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  let str = "";
  // msg = "success";
  console.log(msg, "from over 80 ⬆");

  let percentages = [];
  questions.map((question) => {
    percentages.push(question.percentage);
    str += `${question.hun}: ${question.percentage}%25, ${question.note} %0D%0A`;
  });
  sendBtn.href = `mailto:gergo2.szabo@audi.hu?subject=Kundenzufriedenheit&body=Kedves G/PM-6,%0D%0A %0D%0AA felmérés összesített eredménye: ${Math.round(
    calcAvg(percentages)
  )}%25  %0D%0A %0D%0AItt láthatod a részeredményt, magával az indoklással: %0D%0A${str}`;
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------

  showAndRemoveMessage(msg, 3);
});

notesArr.map((note) => {
  note.addEventListener("change", function () {
    if (note.value.length > 0) note.classList.remove("redborder");
  });
});
