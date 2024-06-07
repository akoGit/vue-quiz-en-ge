<script setup>
import QuestionCard from './QuestionCard.vue'
import { useQuestionsStore } from '../scripts/store.js'
import { computed, onMounted, ref, nextTick } from 'vue'


let questionsPerPage = window.innerWidth > 600 ? 10 : 5;
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
    window.scrollTo({ top: 0, behavior: "instant" })
  })
}

const totalPages = computed(() => Math.ceil(store.questions.length / questionsPerPage))

const displayPageNumbers = computed(() => {
  const currentPage = page.value
  const lastPage = totalPages.value
  const maxPagesToShow = window.innerWidth > 600 ? 5 : 3;

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
  
  <div class="center">
    <ul>

      <li v-for="question in getPageQuestions" :key="question.id">
            <QuestionCard :question="question"  />
      </li>

    </ul>

  </div>

  <div class="pagination_nav">
    <button @click="firstPage" :disabled="page === 1">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>
    <button @click="prevPage" :disabled="page === 1" class="page prev">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>
    <span v-for="pageNumber in displayPageNumbers" :key="pageNumber">
      <button
        @click="goToPage(pageNumber)"
        :class="{ activePage: pageNumber === page }"
        class="pageNums"
      >
        {{ pageNumber }}
      </button>
    </span>
    <button @click="nextPage" :disabled="page === totalPages" class="page next">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>
    <button @click="lastPage">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </button>
  </div>

</template>

<style scoped>
.center {
  min-height: 100vh;
  margin: 0 auto;
  max-width: 60%;
}

@media (max-width: 850px) {
  .center {
    max-width: 80%;
  }
}

@media (max-width: 550px) {
  .center {
    max-width: 95%;
  }
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
  width:2.25rem;
  padding: 0.3rem;

  &:hover {
    background-color: var(--btn-h-c); 
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
  /* margin-bottom: 1rem; */
  button {
    margin: 0.5rem 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: calc(0.5rem - 2px);
  }
  &.page {
    display: flex;
  }
}

.activePage {
  color: var(--vt-c-text-1);
  background-color: var(--exp-bg);
  border: 1px solid var(--cd-b-c);
}
.pageNums {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;

  &:hover {
    background-color: var(--btn-h-c); 
  }
}
</style>
