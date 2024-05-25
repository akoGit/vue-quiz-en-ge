import { defineStore } from 'pinia'
import { ref } from "vue"

const EN = 'https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md'
const GE = 'https://raw.githubusercontent.com/akoGit/javascript-questions/master/ge-GE/README.md'

export const useQuestionsStore = defineStore('questions', () => {

  const questions = ref([]);
  const language = ref(localStorage.getItem('language') || 'en');


  const getQuestions = async () => {
    const url = language.value === 'en' ? EN : GE
    const response = await fetch(url)
    if (response.ok) {
      const text = await response.text()
      const unparsed = text.split(/(?=#{6} [1-9])/).slice(1)
      setQuestions(parseQuestions(unparsed))
    } else {
      console.error('Failed to fetch questions:', response.statusText)
    }
  }


  const toggleLangEN = () => {
    language.value = 'en'
    localStorage.setItem('language', 'en')
    getQuestions()
  }

  const toggleLangGE = () => {
    language.value = 'ge'
    localStorage.setItem('language', 'ge')
    getQuestions()
  }

  const setQuestions = (newQuestions) => {
    questions.value = newQuestions
  }

  return {
    questions,
    language,
    getQuestions,
    toggleLangEN,
    toggleLangGE,
    setQuestions,
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
