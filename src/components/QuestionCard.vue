<script setup>
import { onMounted, ref, watchEffect, computed, watch } from 'vue'
import hljs from 'highlight.js'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
import 'highlight.js/styles/github-dark.css'
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

const click = (answerChar) => {
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
      <h1 v-html="marked.parse(question.title)"></h1>
      <p class="pp">{{ question.id }}</p>
    </div>

    <div class="hljs-code" v-html="renderedMarkdown"></div>

    <ul>
      <li v-for="answer in question.answers" :key="answer.char">
        <button
          :class="{
            correct: answer.char === props.question.correctAnswer && clickedAnswer === answer.char,
            inCorrect:
              answer.char !== props.question.correctAnswer && clickedAnswer === answer.char,
            correct: answer.char === props.question.correctAnswer && clickedAnswer !== null
          }"
          @click="click(answer.char)"
          v-html="marked.parse(answer.text)"
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
    </ul>
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
  /* background-color: #0b0b0a !important; */
  font-size: 1rem;
  overflow-x: visible !important;
  border-radius: 4px;
  outline: 1px solid #252523;
  margin: 1rem;
}
.card {
  flex-grow: 1;
  flex-shrink: 0;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
li {
  list-style: none;
  text-decoration: none;
}

button {
  border: 1px solid #333340;
  border-radius: 4px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 0.4rem;
  padding: 0.5em;
  cursor: pointer;
  transition: background-color 300ms;
}

button:hover {
  background-color: #80808012;
}

h1 {
  text-align: left;
}
.pp {
  color: var(--text-color);
}

.title_id_wrap {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.correct {
  outline: 2px solid green;
  background-repeat: no-repeat;
  background-size: 35px;
  background-position: right 2% top 2px;
  background-image: url('../assets/checkbox-circle.png');
}

.inCorrect {
  outline: 2px solid red;
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: right 2% top 5px;
  background-image: url('../assets/cancel-circular.png');
}

.explanation {
  width: 100%;
  /* max-width:30rem; */
}

.explanation {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #333340;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;

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
.answer {
  height: 0;
  overflow-y: scroll;
  line-height: 1.5;
  transition: height 0.5s;
  /* border-bottom: 2px solid #333340; */

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    appearance: none;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    border-radius: 50px;
    background-color: #252523;
  }
  p {
    padding: 10px;
  }
  &.open {
    height: 150px;
  }
}

</style>
