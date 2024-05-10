<script setup>
import QuestionCard from './QuestionCard.vue'
import { useQuestionsStore} from '../scripts/store.js'
import { computed, onMounted } from 'vue'
let page = 1
let questionsPerPage = 10

const store = useQuestionsStore()

// let questionsPerPage = window.innerWidth > 600 ? 10 : 5;
// let pageShown = window.innerWidth > 600 ? 7 : 4;

const getPageQuestions = computed(() => {
  const startIndex = (page - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  return store.questions.slice(startIndex, endIndex)
})

onMounted(() => {
  store.getQuestions()
})

const handleAnswer = (event) => {
  store.handleAnswer(event); // Pass the event to the store method
};

</script>

<template>
  <div class="center">
    <ul>
      <li v-for="(question, index) in getPageQuestions" :key="index">
        <QuestionCard :question="question" @answer-clicked="handleAnswer($event)" />
      </li>
    </ul>
  </div>
</template>

<style>
.center {
  min-height: 100vh;
  display: grid;
  place-items: center;
  margin: 0 auto;
  max-width: 60%;
}

ul,
li {
  list-style: none;
  text-decoration: none;
}
.toggle_lang {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
