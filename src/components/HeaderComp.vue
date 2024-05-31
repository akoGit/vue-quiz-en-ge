<script setup>
import { useQuestionsStore } from '../scripts/store.js'
import { onMounted, watch, ref } from 'vue'
import { onClickOutside } from "@vueuse/core"

const { language, toggleLangEN, toggleLangGE } = useQuestionsStore()

const isAlertOpen = ref(false)
const alert = ref(null)

onClickOutside(alert, () => (isAlertOpen.value = false))

function resetStore() {
    localStorage.clear()
    window.location.reload()
}

</script>

<template>

 <header>

   <div></div>

  <div class="lang_wrap" id="lang">
    <div class="tabs">
      <input type="radio" id="EN" name="fav_language_two" value="EN" :checked="language === 'en'" />
      <label @click="toggleLangEN" for="EN">EN</label>
      <input type="radio" id="KA" name="fav_language_two" value="KA" :checked="language === 'ge'" />
      <label @click="toggleLangGE" for="KA">ქა</label>
    </div>
  </div>


  </header>

<button @click="isAlertOpen = true" class="reset">↺</button>

<Teleport to="#alert">

    <Transition name="alert">
    <div class="alert-bg" v-if="isAlertOpen">
      <div class="alert" ref="alert">
        <div class="alert-text">
          <h1>Are you absolutely sure?</h1>
          <p>This action cannot be undone. This will permanently delete your already answered questions.</p>
        </div>

        <div class="alert-btns">
          <button @click="isAlertOpen = false">Cancel</button>
          <button @click="resetStore">Continue</button>
        </div>
      </div>
    </div>
    </Transition>

  </Teleport>




</template>

<style>

header {
  display:flex;
  align-items:center;
  justify-content:center;
}

.alert-enter-active,
.alert-leave-active {
transition: all .25s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: scale(.95);
}

.alert-bg {
  position:fixed;
  top: 0;
  left: 0;
  width:100vw;
  height:100vh;
  background-color:rgba(0, 0, 0, .8);
  z-index: 50;
  display:flex;
  justify-content:center;
  align-items:center;
  transform:scale(1);
}
.alert {
  border-radius:0.5rem;
  padding:1.5rem;
  background-color: hsl(240 ,10%, 3.9%);
  border: 1px solid #333340;;
  max-width:32rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
}
.alert-text {
  display:flex;
  flex-direction:column;
}
.alert-text h1 {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: .5em;
}

.alert-text p {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(240, 5%, 64.9%);
}

.lang_wrap {
  display: grid;
  place-items: center;
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

.theme {
  position:fixed;
  top:0;
  right:0;
  color: #FFFFFF;
  background-color: #000000;
  border: 1px solid  #333340;
  width:2.25rem;
  height:2.25rem;
  border-radius:4px;
  cursor:pointer;
  margin: .5em 3.5em;
  display:grid;
  place-items:center;
  text-align:center;
}

.reset {
  position:fixed;
  top:0;
  right:0;
  display:grid;
  place-items:center;
  text-align:center;
  margin: .5em;
  color: #FFFFFF;
  background-color: #000000;
  border: 1px solid  #333340;
  width:2.25rem;
  height:2.25rem;
  border-radius:4px;
  cursor:pointer;
 }

button {
  cursor:pointer;
  font-weight:500;
}
button:hover {
  background-color:hsl(240,3.7%,15.9%);
}

.alert-btns {
  display:flex;
  justify-content:flex-end;
  gap: .5rem;
}

.alert-btns > button {
  background-color: #000000;
  border: 1px solid  #333340;
  padding: .5rem 1rem;
  border-radius:6px;
}
.alert-btns > button:first-child:hover {
  background-color:hsl(240,3.7%,15.9%);
}
.alert-btns :nth-of-type(2) {
  color:#000000;
  background-color:#FFFFFF;
}
</style>
