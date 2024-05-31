<script setup>
import { onMounted, ref, watchEffect, computed, watch } from 'vue'
import hljs from 'highlight.js'

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

import 'highlight.js/styles/github-dark.css'

// import 'highlight.js/styles/atom-one-dark.css'

import { useQuestionsStore } from '../scripts/store.js'
 

const questionsStore = useQuestionsStore()

const clickedAnswer = ref(null)

const props = defineProps({
  question: Object,
})

const localStorageKey = computed(() => `#_${props.question.id}`)

const renderedMarkdown = ref('')

const updateMarkdown = () => {
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
}

onMounted(() => {
  updateMarkdown()
  const storedAnswer = localStorage.getItem(localStorageKey.value)
  if (storedAnswer) {
    clickedAnswer.value = storedAnswer
}})

watchEffect(() => {
  updateMarkdown()
})

// const emit = defineEmits(['answerClicked'])

function click(answerChar){
  if (clickedAnswer.value !== null) {
    return
  }

  clickedAnswer.value = answerChar

  // emit('answerClicked', {
  //   id: props.question.id,
  //   clickedAnswer: answerChar,
  //   isCorrect: answerChar === props.question.correctAnswer
  // })
}



watch(clickedAnswer, (newAnswer) => {
  if (newAnswer !== null) {
    localStorage.setItem(localStorageKey.value, newAnswer)
  }
})


const isOpen = ref(false)

const toggleAccordion = () => {
  if (clickedAnswer.value !== null) {
    isOpen.value = !isOpen.value
  }
}

const isClickable = computed(() => clickedAnswer.value !== null)

</script>
<template>
  <div class="card">
    <div class="title_id_wrap">
      <h1 v-html="marked.parseInline(question.title)"></h1>
     <p class="pp">Question ID: {{ question.id }}</p>
    </div>

    <div class="hljs-code" v-html="renderedMarkdown"></div>

      <li v-for="answer in question.answers" :key="answer.char">
        <button
          :class="{
            correct: answer.char === props.question.correctAnswer && clickedAnswer === answer.char,
            inCorrect:
              answer.char !== props.question.correctAnswer && clickedAnswer === answer.char,
            correct: answer.char === props.question.correctAnswer && clickedAnswer !== null
          }"
          @click="click(answer.char)"
          v-html="marked.parseInline(answer.text)"
        ></button>
      </li>

      <div class="explanation">

        <div class="header" @click="toggleAccordion" :class="{ notAllowed: !isClickable }">
          <div class="question">Show Explanation</div>
          <div class="icon" :class="{ rotate: isOpen }">
            <svg width="16" height="16" viewBox="0 0 20 20">
              <polyline
                fill="none"
                stroke="#FFFFFF"
                stroke-width="1.03"
                points="16 7 10 13 4 7"
              ></polyline>
            </svg>
          </div>
        </div>

        <div class="answer" :class="{ open: isOpen }">
          <p v-html="marked(question.explanation)"></p>
        </div>

      </div>

  </div>
  <!-- <hr> -->
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
  margin-bottom: 1rem;
  background-color: var(--expl-bg) !important;
}



.card {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  /* background-color:#060913; */
  /* border:1px solid var(--vt-c-bg) !important; */

  /* border:1px solid rgb(229, 231, 235, 1); */
  /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); */
  
}

li {
  list-style: none;
  text-decoration: none;
}

button {
  border:1px solid var(--bord-col);
  border-radius: calc(0.5rem - 2px);
  width: 100%;
  max-width: 100%;
  margin-bottom: 0.4rem;
  padding: .6rem;
  cursor: pointer;
  /* transition: background-color 300ms; */
}

button:hover {
  background-color: #80808012;
}

h1 {
  text-align: left;
  font-size:1.4rem;
  font-weight: bold;
  /* margin-bottom: 1em; */
}
.pp {
  color: var(--text-color);
  color: rgb(156, 163, 175, 1)
}

.title_id_wrap {
  display: flex;
  flex-direction:column;
  margin-bottom: 2em;
  /* justify-content: space-between; */
  /* text-align: center; */
}

.correct {
  border: 1px solid green;
  background-repeat: no-repeat;
  background-size: 35px;
  /* background-size: 45px; */
  background-position: right 2% top 2px;
  background-image: url("data:image/svg+xml,%3Csvg data-id='17' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='green' stroke-width='1.5' stroke-linecap='square' stroke-linejoin='square' %3E%3Cpath d='M20 6 9 17l-5-5'%3E%3C/path%3E%3C/svg%3E");
  
}

.inCorrect {
  border: 1px solid red;
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: right 12px bottom 0px;
  background-image: url("data:image/svg+xml,%3Csvg data-id='35' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='red' stroke='red' stroke-width='1' stroke-linecap='square' stroke-linejoin='square' %3E%3Cpath d='M18 6 6 18'%3E%3C/path%3E%3Cpath d='m6 6 12 12'%3E%3C/path%3E%3C/svg%3E");

}
/* .selected { */
/*   outline: 2px solid green; */
/*   background-repeat: no-repeat; */
/*   background-size: 35px; */
/*   background-position: right 2% top 2px; */
/*   background-image: url('../assets/checkbox-circle.png'); */
/* } */


.explanation {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border: 2px solid #333340; */
  padding:1rem;
  border-radius: calc(0.5rem - 2px);
  /* background-color:#0d1117;  */
  background-color: var(--expl-bg);
  /* #0d1117; */
  color: var(--vt-c-text-1);

  margin-top:1rem;
}

.header {
  display: flex;
  align-items: center;
  gap:.5em;
  justify-content: space-between;
  border-radius: 4px;
  cursor: pointer;
  width: min-content;
  white-space:nowrap;
  padding: .5rem;
  border:1px solid var(--bord-col);

  &.notAllowed {
    cursor: not-allowed;
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-image: url('data:image/svg+xml,\00003csvg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\00003cpath fill="%23c3c6d6" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z">\00003c/path>\00003c/svg>'
    );
  &.rotate {
    transform: rotate(180deg);
  }
}

.answer > p {
  overflow:hidden;
}

.answer {
  display:grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms;

  &.open {
    grid-template-rows: 1fr;
  }
}

</style>
