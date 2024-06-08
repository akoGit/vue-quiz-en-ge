<script setup>
import { useQuestionsStore } from '../scripts/store.js'
import { onMounted, ref, watchEffect, computed, watch } from 'vue'
import hljs from 'highlight.js'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

const questionsStore = useQuestionsStore()

const clickedAnswer = ref(null)

const props = defineProps({
  question: Object,
})

const localStorageKey = computed(() => `#_${props.question.id}`)

const renderedMarkdown = ref('')

const updateMarkdown = () => {
  hljs.configure({ useBR: false });

  const renderer = new marked.Renderer();
  renderer.code = (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    const highlightedCode = hljs.highlight(code, { language: validLanguage, ignoreIllegals: true }).value;
    return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`;
  };

  marked.setOptions({
    renderer: renderer,
    highlight: (code) => {
      return hljs.highlightAuto(code).value;
    }
  });

  renderedMarkdown.value = marked(props.question.body);
};

onMounted(() => {
  updateMarkdown()
  const storedAnswer = localStorage.getItem(localStorageKey.value)
  if (storedAnswer) {
    clickedAnswer.value = storedAnswer
}})

watchEffect(() => {
  updateMarkdown()
})


function click(answerChar){
  if (clickedAnswer.value !== null) {
    return
  }

  clickedAnswer.value = answerChar
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
                stroke="#000000"
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
  margin-bottom: 2rem;
  margin-top: 4.5rem;
  border-radius: 0.5rem;
  border:1px solid;
  border-color: var(--cd-b-c);
  padding:1.5rem;
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
}

button:hover {
  background-color: #80808012;
}

h1 {
  text-align: left;
  font-size:1.4rem;
  font-weight: bold;
}
.pp {
  color: var(--text-color);
  color: rgb(156, 163, 175, 1)
}

.title_id_wrap {
  display: flex;
  flex-direction:column;
  margin-bottom: 2em;
}

.correct {
  border: 1px solid green;
  background-repeat: no-repeat;
  background-size: 35px;
  background-position: right 0% top 50%;
  /* background-image: url("data:image/svg+xml,%3Csvg data-id='17' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='green' stroke-width='1.5' stroke-linecap='square' stroke-linejoin='square' %3E%3Cpath d='M20 6 9 17l-5-5'%3E%3C/path%3E%3C/svg%3E"); */
  background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z' fill='green' fill-rule='evenodd' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");
}

.inCorrect {
  border: 1px solid red;
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: right .4% top 50%;
  /* background-image: url("data:image/svg+xml,%3Csvg data-id='35' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='red' stroke='red' stroke-width='1' stroke-linecap='square' stroke-linejoin='square' %3E%3Cpath d='M18 6 6 18'%3E%3C/path%3E%3Cpath d='m6 6 12 12'%3E%3C/path%3E%3C/svg%3E"); */
  background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z' fill='red' fill-rule='square' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");
}

.explanation {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* padding:1rem; */
  padding-top:1rem;
  padding-left:1rem;
  border-radius: calc(0.5rem - 2px);
  background-color: var(--expl-bg);
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

  &:hover {
    background-color: #80808012;
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
  line-height:1.5rem;
}

.answer {
  display:grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms;
  margin-top:1rem;

  &.open {
    grid-template-rows: 1fr;
    margin-bottom: 1rem;
  }
}

</style>
