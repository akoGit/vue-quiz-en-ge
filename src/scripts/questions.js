// import { defineStore } from 'pinia'
// import { ref, watch } from 'vue'
//
// export const useAnswersStore = defineStore('answersStore', () => {
//   const clickedAnswers = ref({})
//
//   const setAnswer = (questionId, answerChar) => {
//     clickedAnswers.value[questionId] = answerChar
//     localStorage.setItem(`clicked_${questionId}`, answerChar)
//   }
//
//   const getAnswer = (questionId) => {
//     if (!clickedAnswers.value[questionId]) {
//       const storedAnswer = localStorage.getItem(`clicked_${questionId}`)
//       if (storedAnswer) {
//         clickedAnswers.value[questionId] = storedAnswer
//       }
//     }
//     return clickedAnswers.value[questionId]
//   }
//
//   return {
//     clickedAnswers,
//     setAnswer,
//     getAnswer,
//   }
// })
