<script setup>
import { useQuestionsStore } from '../scripts/store.js'
import { ref } from 'vue'
import { onClickOutside, useDark, useToggle } from '@vueuse/core'

const { language, toggleLangEN, toggleLangGE } = useQuestionsStore()

const isAlertOpen = ref(false)
const alert = ref(null)

onClickOutside(alert, () => (isAlertOpen.value = false))

function resetStore() {
  localStorage.clear()
  window.location.reload()
}

const isDark = useDark()
const toggleDark = useToggle(isDark)


function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}
</script>

<template>
  <header>

      <a href="https://github.com/lydiahallie/javascript-questions" target="_blank">
        <button class="btn github_link" title="questions by Lydia Hallie">  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></button>
      </a>

    <div class="lang_wrap">
      <div class="tabs">
        <input
          type="radio"
          id="EN"
          name="fav_language_two"
          value="EN"
          :checked="language === 'en'"
        />
        <label @click="toggleLangEN" for="EN">EN</label>
        <input
          type="radio"
          id="KA"
          name="fav_language_two"
          value="KA"
          :checked="language === 'ge'"
        />
        <label @click="toggleLangGE" for="KA">ქა</label>
      </div>
    </div>

    <div class="wrap__btns">

      <button class="btn full" @click="toggleFullScreen()">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </button>
      
      <a href="#lang" class="top_jump" title="back to top">
        <button class="btn">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </button>
      </a>

      <button @click="toggleDark()" class="btn theme">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="isDark === false"
        >
          <path
            d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z"
            fill="black"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>

        <svg
          width="15"
          height="15"
          v-else
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.89998 0.499976C2.89998 0.279062
        2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062
        2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906
        1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998
        1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998
        2.89998C2.72089 2.89998 2.89998 2.72089 2.89998
        2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998
        1.49998C3.89998 1.27906 3.72089 1.09998 3.49998
        1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089
        3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998
        3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998
        4.49998C4.09998 4.72089 4.27906 4.89998 4.49998
        4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998
        5.89998C5.72089 5.89998 5.89998 5.72089 5.89998
        5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998
        4.49998C6.89998 4.27906 6.72089 4.09998 6.49998
        4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089
        6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998
        6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756
        7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976
        7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998
        8.89997C1.72089 8.89997 1.89998 8.72089 1.89998
        8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998
        7.49998C2.89998 7.27906 2.72089 7.09998 2.49998
        7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275
        0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592
        8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322
        8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772
        2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551
        12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883
        12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079
        13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496
        13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128
        5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405
        13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241
        14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322
        14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044
        14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453
        6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409
        5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773
        13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157
        2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925
        2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073
        1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566
        1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032
        5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995
        13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322
        13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941
        7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928
        10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256
        9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926
        8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993
        11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505
        6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <button @click="isAlertOpen = true" class="btn reset">

<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>      </button>
    </div>

    <Teleport to="#alert">
      <Transition name="alert">
        <div class="alert-bg" v-if="isAlertOpen">
          <div class="alert" ref="alert">
            <div class="alert-text">
              <h1>Are you absolutely sure?</h1>
              <p>
                This action cannot be undone. This will permanently delete your already answered
                questions.
              </p>
            </div>

            <div class="alert-btns">
              <button @click="isAlertOpen = false">Cancel</button>
              <button @click="resetStore">Continue</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
svg {
  width:18px;
  height: 18px;
}
.source {
  margin-left: 0.4em;
  a {
    color: var(--vtc-c-text-1);
    font-family: monospace;
    font-size: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
}

header {
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid;
  border-color: var(--bord-col);
  position: fixed;
  top: 0;
}
.alert-enter-active,
.alert-leave-active {
  transition: all 0.25s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.alert-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
}
.alert {
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: hsl(240, 10%, 3.9%);
  border: 1px solid #333340;
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.alert-text {
  display: flex;
  flex-direction: column;
}
.alert-text h1 {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5em;
}

.alert-text p {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(240, 5%, 64.9%);
}

.tabs {
  display: grid;
  grid-auto-flow: column;
  background-color: var(--expl-bg);
  border-radius: calc(var(--radius) - var(--border));
  grid-auto-columns: 1fr;
  position: relative;
  border: 1px solid var(--bord-col);
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
  padding: 0.3rem clamp(0.5rem, 2vw + 0.25rem, 2rem);
  cursor: pointer;
  text-align: center;
  height: 2.5rem;
  display: grid;
  border-radius: calc(var(--radius) - var(--border));
  place-items: center;
  color: hsl(0 0% 100% / calc(0.5 + var(--highlight, 0)));
  color: var(--vt-c-text-1);
  transition: background-color, color;
  transition-duration: 0.25s;
  transition-timing-function: var(--ease, ease);
}

input:not(:checked) + label:hover {
  --highlight: 0.35;
  opacity: 0.5;
}

.tabs::after {
  pointer-events: none;
  content: '';
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

.wrap__btns {
  display: flex;
  column-gap: 0.5rem;
  margin-right: 0.5rem;
}

.btn {
  color: var(--vt-c-text-1);
  background-color: var(--vtc-c-bg);
  border: 1px solid var(--bord-col);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: grid;
  place-items: center;
  text-align: center;
}

.btn.github_link {
  margin-left:0.5rem;
}

.btn.full {
 margin-left:.5em;
}

button {
  cursor: pointer;
  font-weight: 500;
  border-color: var(--bord-col);
}
button:hover {
  background-color: var(--btn-h-c);
}

.alert-btns {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.alert-btns > button {
  background-color: #000000;
  border: 1px solid #333340;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #FFFFFF;
}
.alert-btns > button:first-child:hover {
  background-color: hsl(240, 3.7%, 15.9%);
}
.alert-btns :nth-of-type(2) {
  color: #000000;
  background-color: #ffffff;
}

.top_jump {
  display:grid;
  place-items:center;
  text-align:center;
  button {
    color: var(--vt-c-text-1);
    background-color: var(--vtc-c-bg);
    border: 1px solid var(--bord-col);
    width:2.5rem;
    height:2.5rem;
    border-radius:4px;
    &:hover {
      background-color: var(--btn-h-c);
    }
  }
}
</style>
