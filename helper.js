import { questions } from "./questions.js";
import { notesArr, percentagesArr } from "./script.js";

// Calculate average
export const calcAvg = function (arr) {
  const valuesAvg = arr.reduce((sum, num) => sum + num / arr.length, 0);
  return valuesAvg;
};

// Sum up all questions, values and notes

export const getQuestionsValuesNotes = function () {
  questions.map((question, i) => {
    questions[i].percentage = parseFloat(percentagesArr[i].textContent);
    questions[i].note = notesArr[i].value;
  });
};
