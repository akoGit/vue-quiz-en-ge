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
  font-size:1.4rem;
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
  background-size: 45px;
  background-position: right 2% top 2px;
  background-position: right 1%;
  background-image: url('../assets/checkbox-circle.png');
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='12 20 80 80' preserveAspectRatio='xMidYMid meet'%3E%3Cdefs%3E%3CclipPath id='__lottie_element_676'%3E%3Crect width='112' height='112' x='0' y='0'%3E%3C/rect%3E%3C/clipPath%3E%3C/defs%3E%3Cg clip-path='url(%23__lottie_element_676)'%3E%3Cg transform='matrix(1,0,0,1,56,56)' opacity='1' style='display: block;'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,0,0)'%3E%3Cpath fill='rgb(43,166,64)' fill-opacity='1' d=' M0,-20 C0,-20 0,-20 0,-20 C11.045999526977539,-20 20,-11.045999526977539 20,0 C20,0 20,0 20,0 C20,11.045999526977539 11.045999526977539,20 0,20 C0,20 0,20 0,20 C-11.045999526977539,20 -20,11.045999526977539 -20,0 C-20,0 -20,0 -20,0 C-20,-11.045999526977539 -11.045999526977539,-20 0,-20z'%3E%3C/path%3E%3C/g%3E%3Cg opacity='1' transform='matrix(1,0,0,1,0,0)'%3E%3Cpath fill='rgb(3,3,3)' fill-opacity='1' d=' M-4.999000072479248,7 C-4.999000072479248,7 -11.99899959564209,0 -11.99899959564209,0 C-11.99899959564209,0 -14.333000183105469,2.3329999446868896 -14.333000183105469,2.3329999446868896 C-14.333000183105469,2.3329999446868896 -4.999000072479248,11.666999816894531 -4.999000072479248,11.666999816894531 C-4.999000072479248,11.666999816894531 15.00100040435791,-8.333000183105469 15.00100040435791,-8.333000183105469 C15.00100040435791,-8.333000183105469 12.666999816894531,-10.666999816894531 12.666999816894531,-10.666999816894531 C12.666999816894531,-10.666999816894531 -4.999000072479248,7 -4.999000072479248,7z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,58,54.25)' opacity='1' style='display: block;'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,0,0)'%3E%3Cpath fill='rgb(153,4,18)' fill-opacity='1' d='M0 0'%3E%3C/path%3E%3Cpath stroke-linecap='round' stroke-linejoin='miter' fill-opacity='0' stroke-miterlimit='4' stroke='rgb(164,255,164)' stroke-opacity='1' stroke-width='6' d='M0 0'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,59,57.75)' opacity='1' style='display: block;'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,0,0)'%3E%3Cpath fill='rgb(153,4,18)' fill-opacity='1' d='M0 0'%3E%3C/path%3E%3Cpath stroke-linecap='round' stroke-linejoin='miter' fill-opacity='0' stroke-miterlimit='4' stroke='rgb(62,255,62)' stroke-opacity='1' stroke-width='6' d='M0 0'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,25,67.5)' opacity='1' style='display: block;'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,0,0)'%3E%3Cpath fill='rgb(153,4,18)' fill-opacity='1' d='M0 0'%3E%3C/path%3E%3Cpath stroke-linecap='round' stroke-linejoin='miter' fill-opacity='0' stroke-miterlimit='4' stroke='rgb(62,255,62)' stroke-opacity='1' stroke-width='4' d='M0 0'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,26.5,77.75)' opacity='1' style='display: block;'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,0,0)'%3E%3Cpath fill='rgb(153,4,18)' fill-opacity='1' d='M0 0'%3E%3C/path%3E%3Cpath stroke-linecap='round' stroke-linejoin='miter' fill-opacity='0' stroke-miterlimit='4' stroke='rgb(0,206,34)' stroke-opacity='1' stroke-width='6' d='M0 0'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,28.5,73.25)' opacity='1' style='display: block;'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,0,0)'%3E%3Cpath fill='rgb(153,4,18)' fill-opacity='1' d='M0 0'%3E%3C/path%3E%3Cpath stroke-linecap='round' stroke-linejoin='miter' fill-opacity='0' stroke-miterlimit='4' stroke='rgb(164,255,164)' stroke-opacity='1' stroke-width='4' d='M0 0'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg style='display: block;' transform='matrix(0,0,0,0,69.28700256347656,16.78700065612793)' opacity='1'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,9.536999702453613,-31.46299934387207)'%3E%3Cpath fill='rgb(0,232,0)' fill-opacity='1' d=' M0,-3.2869999408721924 C1.8140952587127686,-3.2869999408721924 3.2869999408721924,-1.8140952587127686 3.2869999408721924,0 C3.2869999408721924,1.8140952587127686 1.8140952587127686,3.2869999408721924 0,3.2869999408721924 C-1.8140952587127686,3.2869999408721924 -3.2869999408721924,1.8140952587127686 -3.2869999408721924,0 C-3.2869999408721924,-1.8140952587127686 -1.8140952587127686,-3.2869999408721924 0,-3.2869999408721924z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg style='display: block;' transform='matrix(0,0,0,0,82.28700256347656,98.03700256347656)' opacity='1'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,9.536999702453613,-31.46299934387207)'%3E%3Cpath fill='rgb(62,255,62)' fill-opacity='1' d=' M0,-3.2869999408721924 C1.8140952587127686,-3.2869999408721924 3.2869999408721924,-1.8140952587127686 3.2869999408721924,0 C3.2869999408721924,1.8140952587127686 1.8140952587127686,3.2869999408721924 0,3.2869999408721924 C-1.8140952587127686,3.2869999408721924 -3.2869999408721924,1.8140952587127686 -3.2869999408721924,0 C-3.2869999408721924,-1.8140952587127686 -1.8140952587127686,-3.2869999408721924 0,-3.2869999408721924z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg style='display: block;' transform='matrix(0,0,0,0,22.28700065612793,35.7869987487793)' opacity='1'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,9.536999702453613,-31.46299934387207)'%3E%3Cpath fill='rgb(164,255,164)' fill-opacity='1' d=' M0,-3.2869999408721924 C1.8140952587127686,-3.2869999408721924 3.2869999408721924,-1.8140952587127686 3.2869999408721924,0 C3.2869999408721924,1.8140952587127686 1.8140952587127686,3.2869999408721924 0,3.2869999408721924 C-1.8140952587127686,3.2869999408721924 -3.2869999408721924,1.8140952587127686 -3.2869999408721924,0 C-3.2869999408721924,-1.8140952587127686 -1.8140952587127686,-3.2869999408721924 0,-3.2869999408721924z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg style='display: block;' transform='matrix(0,0,0,0,92.28700256347656,38.5369987487793)' opacity='1'%3E%3Cg opacity='1' transform='matrix(1,0,0,1,9.536999702453613,-31.46299934387207)'%3E%3Cpath fill='rgb(62,255,62)' fill-opacity='1' d=' M0,-3.2869999408721924 C1.8140952587127686,-3.2869999408721924 3.2869999408721924,-1.8140952587127686 3.2869999408721924,0 C3.2869999408721924,1.8140952587127686 1.8140952587127686,3.2869999408721924 0,3.2869999408721924 C-1.8140952587127686,3.2869999408721924 -3.2869999408721924,1.8140952587127686 -3.2869999408721924,0 C-3.2869999408721924,-1.8140952587127686 -1.8140952587127686,-3.2869999408721924 0,-3.2869999408721924z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.inCorrect {
  outline: 2px solid red;
  background-repeat: no-repeat;
  background-size: 30px;
  background-size: 45px;
  background-position: right 2% top 5px;
  background-position: right -12px bottom -12px;
  background-image: url('../assets/cancel-circular.png');
background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="26 26 80 80" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="__lottie_element_706"><rect width="96" height="96" x="0" y="0"></rect></clipPath></defs><g clip-path="url(%23__lottie_element_706)"><g transform="matrix(1,0,0,1,48,48)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,137,131)" fill-opacity="1" d=" M0,-18.66699981689453 C10.293000221252441,-18.66699981689453 18.66699981689453,-10.293000221252441 18.66699981689453,0 C18.66699981689453,10.293000221252441 10.293000221252441,18.66699981689453 0,18.66699981689453 C-10.293000221252441,18.66699981689453 -18.66699981689453,10.293000221252441 -18.66699981689453,0 C-18.66699981689453,-10.293000221252441 -10.293000221252441,-18.66699981689453 0,-18.66699981689453z M0,-21.33300018310547 C-11.786999702453613,-21.33300018310547 -21.33300018310547,-11.786999702453613 -21.33300018310547,0 C-21.33300018310547,11.786999702453613 -11.786999702453613,21.33300018310547 0,21.33300018310547 C11.786999702453613,21.33300018310547 21.33300018310547,11.786999702453613 21.33300018310547,0 C21.33300018310547,-11.786999702453613 11.786999702453613,-21.33300018310547 0,-21.33300018310547z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path fill="rgb(255,137,131)" fill-opacity="1" d=" M9.892999649047852,-6.10699987411499 C9.892999649047852,-6.10699987411499 6.132999897003174,-9.866999626159668 6.132999897003174,-9.866999626159668 C6.132999897003174,-9.866999626159668 0,-3.759999990463257 0,-3.759999990463257 C0,-3.759999990463257 -6.10699987411499,-9.892999649047852 -6.10699987411499,-9.892999649047852 C-6.10699987411499,-9.892999649047852 -9.892999649047852,-6.10699987411499 -9.892999649047852,-6.10699987411499 C-9.892999649047852,-6.10699987411499 -3.759999990463257,0 -3.759999990463257,0 C-3.759999990463257,0 -9.866999626159668,6.10699987411499 -9.866999626159668,6.10699987411499 C-9.866999626159668,6.10699987411499 -6.10699987411499,9.866999626159668 -6.10699987411499,9.866999626159668 C-6.10699987411499,9.866999626159668 0,3.759999990463257 0,3.759999990463257 C0,3.759999990463257 6.10699987411499,9.866999626159668 6.10699987411499,9.866999626159668 C6.10699987411499,9.866999626159668 9.866999626159668,6.10699987411499 9.866999626159668,6.10699987411499 C9.866999626159668,6.10699987411499 3.759999990463257,0 3.759999990463257,0 C3.759999990463257,0 9.892999649047852,-6.10699987411499 9.892999649047852,-6.10699987411499z"></path></g></g></g></svg>');
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
  margin-bottom: .5em;

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
