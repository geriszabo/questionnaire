// Importing module
"use strict";

import { questions } from "./questions.js";
import { messages } from "./questions.js";

// let allValues = [];
// const modalBody = document.querySelector(".modalBody");

const mainContainer = document.querySelector(".mainContainer");
const sendBtn = document.querySelector(".sendBtn");

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

const getQuestionsValuesNotes = function () {
  questions.map((question, i) => {
    questions[i].percentage = parseFloat(percentagesArr[i].textContent);
    questions[i].note = notesArr[i].value;
  });
};

// Modal with error and success message
const showAndRemoveMessage = function (text, sec) {
  modal.classList.remove("hidden");
  modal.classList.add(`modal--${text}`);
  document.querySelector(".modalText").textContent = messages[text];
  setInterval(() => modal.classList.add("hidden"), sec * 1000);
  // console.log(messages[`${text}`]);
};

let msg = "error";

sendBtn.addEventListener("click", function (e) {
  getQuestionsValuesNotes();

  questions.map((question, i) => {
    if (parseFloat(question.percentage) <= 80 && question.note.length === 0) {
      console.log(question.hun, "80 alatti");
      e.preventDefault();
      msg = "error";
      notesArr[i].style.border = "2.5px solid red";
      console.log(`Question number ${i} was not answered`);
      showAndRemoveMessage("error", 3);
      console.log(msg);
    } else if (
      (parseFloat(question.percentage) >= 80 && question.note.length === 0) ||
      (parseFloat(question.percentage) < 80 && question.note.length > 0)
    ) {
      // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
      console.log(question.hun, "80 feletti");
      let str = "";
      msg = "success";
      console.log(msg);
      showAndRemoveMessage("success", 3);
      let avgPercentage;
      let percentages = [];
      questions.map((question) => {
        percentages.push(question.percentage);
        avgPercentage = calcAvg(percentages);
        str += `${question.hun}: ${question.percentage}%25, ${question.note} %0D%0A`;
      });
      sendBtn.href = `mailto:gergo2.szabo@audi.hu?subject=Kundenzufriedenheit&body=Kedves G/PM-6,%0D%0A %0D%0AA felmérés összesített eredménye: ${Math.round(
        calcAvg(percentages)
      )}%25  %0D%0A %0D%0AItt láthatod a részeredményt, magával az indoklással: %0D%0A${str}`;
      // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
  });
  // showAndRemoveMessage(msg, 3);
});

const modal = document.querySelector(".modal");

notesArr.map((note) => {
  note.addEventListener("change", function () {
    if (note.value.length > 0) note.style.border = "0px";
  });
});
