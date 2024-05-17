import { defineStore } from 'pinia'

const EN = 'https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md'
const GE = 'https://raw.githubusercontent.com/akoGit/javascript-questions/master/ge-GE/README.md'

export const useQuestionsStore = defineStore({
  id: 'questions',
  state: () => ({
    questions: [],
    language: 'en'
  }),
  actions: {
    async getQuestions() {
      const url = this.language === 'en' ? EN : GE
      const response = await fetch(url)
      if (response.ok) {
        const text = await response.text()
        const unparsed = text.split(/(?=#{6} [1-9])/).slice(1)
        this.setQuestions(parseQuestions(unparsed))
      } else {
        console.error('Failed to fetch questions:', response.statusText)
      }
    },
    toggleLangEN() {
      this.language = this.language === 'ge' ? 'en' : 'en'
      this.getQuestions()
    },
    toggleLangGE() {
      this.language = this.language === 'en' ? 'ge' : 'ge'
      this.getQuestions()
    },

    setQuestions(questions) {
      this.questions = questions;
    },

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











