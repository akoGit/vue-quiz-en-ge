import { defineStore } from 'pinia'
import { ref } from "vue"

const EN = 'https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md'
const GE = 'https://raw.githubusercontent.com/akoGit/javascript-questions/master/ge-GE/README.md'

export const useQuestionsStore = defineStore('questions', () => {

  const questions = ref([])
  const language = ref('en')

  const getQuestions = async () => {
    const url = language.value === 'en' ? EN : GE
    const response = await fetch(url)
    if (response.ok) {
      const text = await response.text()
      const unparsed = text.split(/(?=#{6} [1-9])/).slice(1)
      setQuestions(parseQuestions(unparsed))
      // loadAnswersFromLocalStorage()
    } else {
      console.error('Failed to fetch questions:', response.statusText)
    }
  }


  const toggleLangEN = () => {
    language.value = 'en'
    getQuestions()
  }

  const toggleLangGE = () => {
    language.value = 'ge'
    getQuestions()
  }

  const setQuestions = (newQuestions) => {
    questions.value = newQuestions
  }

  // function handleAnswer(event) {
  //   questions.value = questions.value.map((question) => {
  //     if (question.id === event.id) {
  //       question.clickedAnswer = event.clickedAnswer;
  //       question.isCorrect = event.isCorrect;
  //     }
  //     console.log(question)
  //
  //     return question;
  //   });
  //   saveAnswersToStorage();
  // };

  // function saveAnswersToStorage() {
  //   const answeredQuestions = questions.value
  //     .filter((a) => a.clickedAnswer)
  //     .map((a) => a.id + '-' + a.clickedAnswer)
  //
  //
  //   localStorage.setItem('answers', JSON.stringify(answeredQuestions))
  // }

  // function loadAnswersFromLocalStorage() {
  //   const savedAnswers = JSON.parse(localStorage.getItem('answers'))
  //   if (savedAnswers) {
  //     questions.value = questions.value.map((question) => {
  //       const answeredQuestion = savedAnswers.find(answer => answer.startsWith(question.id + '-'))
  //       if (answeredQuestion) {
  //         const clickedAnswer = answeredQuestion.split('-')[1]
  //         question.clickedAnswer = clickedAnswer
  //         question.isCorrect = question.clickedAnswer === question.correctAnswer
  //       }
  //       return question
  //     })
  //   }
  // }


  return {
    questions,
    language,
    getQuestions,
    toggleLangEN,
    toggleLangGE,
    setQuestions,
    // handleAnswer
  }
})




function parseQuestions(unparsed) {
  return unparsed.map((question) => {
    const indexOfFirstDot = question.indexOf('.')
    const indexOfA = question.indexOf('- A: ')
    const indexOfDetails = question.indexOf('<details>', indexOfA)

    const id = question.slice(7, indexOfFirstDot)
    const title = question.slice(indexOfFirstDot + 2, question.indexOf('\n'))
    const body = question.slice(question.indexOf('\n') + 2, indexOfA - 2)

    const answers = question
      .slice(indexOfA, indexOfDetails - 2)
      .split('\n')
      .map((answer) => {
        return {
          char: answer[2],
          text: answer.slice(5)
        }
      })

    const spoiler = question.slice(indexOfDetails)
    const indexOfCorrectAnswer = spoiler.indexOf('#### Answer: ') + 13

    const correctAnswer = spoiler[indexOfCorrectAnswer]

    const explanation = spoiler.slice(
      indexOfCorrectAnswer + 3,
      spoiler.indexOf('</p>', indexOfCorrectAnswer) - 1
    )

    const obj = { id, title, body, answers, correctAnswer, explanation }
    return obj
  })
}











