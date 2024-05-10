<script setup>
import { defineEmits, onMounted, ref, computed } from 'vue'
import hljs from 'highlight.js'
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'
import 'highlight.js/styles/github-dark.css'

const props = defineProps({
  question: Object,
})

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

const clickedAnswer = ref(null);
const emits = defineEmits(['answerClicked']);

const click = (answerChar) => {
  if (clickedAnswer.value !== null) {
    return; 
  }

  clickedAnswer.value = answerChar;

  emits('answerClicked', {
    id: props.question.id,
    clickedAnswer: answerChar,
    isCorrect: answerChar === props.question.correctAnswer
  });

};
const isOpen = ref(false);

const toggleAccordion = () => {
	if (clickedAnswer.value !== null) {
    isOpen.value = !isOpen.value;
  }
};

const isClickable = computed(() => clickedAnswer.value !== null);
</script>
<template>
	<div class="card">
		<div class="title_id_wrap">
			<h1 v-html="marked.parse(question.title)"></h1>
			<p>{{ question.id }}</p>
		</div>

		<div class="hljs-code" v-html="renderedMarkdown"></div>

		<ul>
			<li v-for="answer in question.answers" :key="answer.char">
				<button :class="{
					correct: answer.char === props.question.correctAnswer && clickedAnswer === answer.char,
					inCorrect: answer.char !== props.question.correctAnswer && clickedAnswer === answer.char,
					correct: answer.char === props.question.correctAnswer && clickedAnswer !== null,
				}" @click="click(answer.char)" v-html="marked.parse(answer.text)"></button>

			</li>
			<div class="explanation">
				<div class="header" @click="toggleAccordion" :class="{notAllowed: !isClickable}">
					<div class="question">
						explanation
					</div>
					<div class="icon" :class="{ rotate: isOpen }" >
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
							fill="grey" height="20px" width="20px" version="1.1" id="Layer_1"
							viewBox="0 0 407.437 407.437" xml:space="preserve">
							<polygon
								points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 " />
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
  margin-bottom: 0.2rem;
  padding: 0.5em;
  cursor: pointer;
}
.title_id_wrap {
	display: flex;
	justify-content: space-between;
	text-align: center;
}

.correct {
  outline: 2px solid green;
  background-repeat: no-repeat;
  background-size:35px;
  background-position: right 2% top 2px;
  background-image: url("../assets/checkbox-circle.png");

}

.inCorrect {
 outline: 2px solid red;
 background-repeat: no-repeat;
 background-size:30px;
 background-position: right 2% top 5px;
 background-image: url("../assets/cancel-circular.png");

}

.explanation {
	width:100%;
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
	border-radius:4px;
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
	transition:transform .4s;

	&.rotate {
		transform: rotate(180deg);
	}
}


.answer {
	height: 0;
	overflow-y: scroll;
	line-height: 1.5;
	transition: height .5s;
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
