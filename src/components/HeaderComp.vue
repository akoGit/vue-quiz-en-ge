<script setup>
import { useQuestionsStore } from '../scripts/store.js'
import { onMounted } from 'vue'

const store = useQuestionsStore()

onMounted(() => {
  store.getQuestions()
})

const toggleLangEN = () => {
  store.toggleLangEN()
}

const toggleLangGE = () => {
  store.toggleLangGE()
}
</script>

<template>
  <div class="lang_wrap" id="lang">
    <div class="tabs">
      <input type="radio" id="EN" name="fav_language_two" value="EN" checked />
      <label @click="toggleLangEN" for="EN">EN</label>
      <input type="radio" id="KA" name="fav_language_two" value="KA" />
      <label @click="toggleLangGE" for="KA">ქა</label>
    </div>
  </div>
</template>

<style>

.lang_wrap {
  display: grid;
  place-items: center;
  /* justify-content: end; */
  /* margin: 1em; */
  /* top: 0; */
  /* right: 0; */
  /* border: 1px solid red; */
  margin-top:.5rem;
}
.tabs {
  height: var(--height);
  display: grid;
  grid-auto-flow: column;
  background-color: hsl(0, 0%, 00%);
  border-radius: calc(var(--radius) - var(--border));
  grid-auto-columns: 1fr;
  position: relative;
  border: var(--border) solid hsl(0 0% 0%);
}

.tabs > input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.tabs:has(:checked:nth-of-type(1)) {
  --active: 0;
}
.tabs:has(:checked:nth-of-type(2)) {
  --active: 1;
}

.tabs :checked + label {
  --highlight: 1;
}

.tabs:has(input:nth-of-type(2)) {
  --count: 2;
}
.tabs:has(input:nth-of-type(3)) {
  --count: 3;
}

.tabs label {
  /* padding: .2rem 1rem; */
  padding: 0.3rem clamp(0.5rem, 2vw + 0.25rem, 2rem);
  cursor: pointer;
  text-align: center;
  height: 100%;
  display: grid;
  border-radius: calc(var(--radius) - var(--border));
  place-items: center;
  color: hsl(0 0% 100% / calc(0.5 + var(--highlight, 0)));
  transition: background-color, color;
  transition-duration: 0.25s;
  transition-timing-function: var(--ease, ease);
}

input:not(:checked) + label:hover {
  --highlight: 0.35;
  background: hsl(0 0% 20%);
}

.tabs::after {
  pointer-events: none;
  content: "";
  width: calc(100% / var(--count));
  height: 100%;
  background: hsl(0 0% 100%);
  position: absolute;
  border-radius: calc(var(--radius) - var(--border));
  mix-blend-mode: difference;
  translate: calc(var(--active, 0) * 100%) 0;
  transition: translate, outline-color;
  transition-duration: var(--speed);
  transition-timing-function: var(--ease, ease);
  outline: 1px solid #fff;
  border-radius: 2px;
}

.tabs:has(:focus-visible)::after {
  outline-color: rgb(137, 137, 137);
}
</style>
