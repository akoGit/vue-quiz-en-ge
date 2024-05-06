<script setup>
import { onMounted, ref } from 'vue'
import hljs from 'highlight.js'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
import 'highlight.js/styles/github-dark.css'

const props = defineProps({
  question: Object
})

const clickedAnswer = ref(null)
const renderedMarkdown = ref('')

onMounted(() => {
  hljs.configure({ useBR: false })

  const renderer = new marked.Renderer()
  renderer.code = (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
    const highlightedCode = hljs.highlight(validLanguage, code).value
    return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`
  }

  marked.setOptions({
    renderer: renderer,
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    }
  })

  renderedMarkdown.value = marked(props.question.body)
})

function click(answer) {
  if (props.question.clickedAnswer) {
    return
  }
  props.question.clickedAnswer = answer
  clickedAnswer.value = answer

  if (props.question) {
    const isCorrect = answer === props.question.correctAnswer
    if (isCorrect) {
      console.log('Correct answer clicked:', answer)
    } else {
      const correctButton = document.querySelector(
        `button[data-char="${props.question.correctAnswer}"]`
      )
      if (correctButton) {
        correctButton.classList.add('correct')
      }
    }
  }
}
</script>
<template>
  <div class="card">
    <p>{{ question.id }}</p>
    <h1 v-html="marked.parse(question.title)"></h1>

    <div class="hljs-code" v-html="renderedMarkdown"></div>

    <ul>
      <li v-for="answer in question.answers" :key="answer.char">
        <button
          :class="{
            correct: answer.char === props.question.correctAnswer && answer.char === clickedAnswer,
            inCorrect: answer.char !== props.question.correctAnswer && answer.char === clickedAnswer
          }"
          :data-char="answer.char"
          @click="click(answer.char)"
          v-html="marked.parse(answer.text)"
        ></button>
      </li>
    </ul>
    <div class="expl">
      <p v-html="marked(question.explanation)"></p>
    </div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.hljs-code {
  max-width: 100%;
  background-color: #0b0b0a !important;
  font-size: 1rem;
  overflow-x: visible !important;
  border-radius: 8px;
  outline: 1px solid #252523;
  margin: 1rem;
}
.card {
  flex-grow: 1;
  flex-shrink: 0;
}
li {
  list-style: none;
  text-decoration: none;
}

.expl {
  max-inline-size: 150ch;
}

button {
  outline: 1px solid black;
  border-radius: 4px;
  width: 100%;
  max-width: 100%;
  margin: 0.2rem;
  padding: 0.5em;
  cursor: pointer;
}

.correct {
  outline: 2px solid green;
}

.inCorrect {
  outline: 2px solid red;
}
.disabled {
  cursor: not-allowed;
}
</style>
