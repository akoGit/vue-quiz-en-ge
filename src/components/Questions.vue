<script setup>
import QuestionCard from './QuestionCard.vue'
import { useQuestionsStore } from '../scripts/store.js'
import { computed, onMounted, ref, nextTick } from 'vue'

let questionsPerPage = 30
let page = ref(1)
const store = useQuestionsStore()

const updatePageFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  const currentPage = parseInt(params.get('page'))
  if (!isNaN(currentPage)) {
    page.value = currentPage
  }
}

onMounted(async () => {
  await store.getQuestions()
  updatePageFromUrl()
})

const getPageQuestions = computed(() => {
  const startIndex = (page.value - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  return store.questions.slice(startIndex, endIndex)
})

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
    updateUrl()
    scrollToTop()
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    updateUrl()
    scrollToTop()
  }
}

const firstPage = () => {
  page.value = 1
  updateUrl()
  scrollToTop()
}

const lastPage = () => {
  page.value = totalPages.value
  updateUrl()
  scrollToTop()
}

const goToPage = (pageNumber) => {
  page.value = pageNumber
  updateUrl()
  scrollToTop()
}

const updateUrl = () => {
  const params = new URLSearchParams(window.location.search)
  params.set('page', page.value)
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
}

const scrollToTop = () => {
  nextTick(() => {
    window.scrollTo({ top: 0 })
  })
}

const totalPages = computed(() => Math.ceil(store.questions.length / questionsPerPage))

const displayPageNumbers = computed(() => {
  const currentPage = page.value
  const lastPage = totalPages.value
  const maxPagesToShow = 5

  let startPage = currentPage - Math.floor(maxPagesToShow / 2)
  let endPage = currentPage + Math.floor(maxPagesToShow / 2)

  if (startPage < 1) {
    endPage += Math.abs(startPage) + 1
    startPage = 1
  }
  if (endPage > lastPage) {
    startPage -= endPage - lastPage
    endPage = lastPage
  }
  if (startPage < 1) {
    startPage = 1
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})
</script>

<template>
	<div class="pagination_nav">
		<button @click="firstPage" :disabled="page === 1">⇤</button>
		<button @click="prevPage" :disabled="page === 1" class="page prev">← Previous</button>
		<span v-for="pageNumber in displayPageNumbers" :key="pageNumber">
			<button @click="goToPage(pageNumber)" :class="{ activePage: pageNumber === page }" class="pageNums">
				{{ pageNumber }}
			</button>
		</span>
		<button @click="nextPage" :disabled="page === totalPages" class="page next">Next →</button>
		<button @click="lastPage">⇥</button>
	</div>

	<div class="center">
		<ul>
			<li v-for="(question, index) in getPageQuestions" :key="question.id">
				<QuestionCard :question="question" />
			</li>
		</ul>
	</div>
</template>

<style scoped>
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

button {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  height: 2.25rem;
  padding: 0 0.5rem;

  &:hover {
    color: hsl(0 0% 98%);
    background-color: hsl(240 3.7% 15.9%);
    cursor: pointer;
  }
  &:focus {
    outline: 1px solid #333340;
  }
}

.pagination_nav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  button {
    margin: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 0.5rem;
  }
  &.page {
    display: flex;
  }
}

.activePage {
  color: #ffffff;
  background-color: #000000;
  border: 1px solid #333340;
}
.pageNums {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.4rem;
  padding: 0;

  &:hover {
    color: hsl(0 0% 98%);
    background-color: hsl(240 3.7% 15.9%);
  }
}
</style>
