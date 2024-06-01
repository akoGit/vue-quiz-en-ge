<script setup>
import Questions from './components/Questions.vue'
import HeaderComp from './components/HeaderComp.vue'

</script>

<template>
  <span id="lang" type='hidden'></span>
  <HeaderComp />
  <Questions />

  <a href="#lang" class="top_jump" title="back to top"><button>↑</button></a>
</template>


<style scoped>
.top_jump {
  position:fixed;
  bottom: 15px;
  right:10px;
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
      background-color:hsl(240,3.7%,15.9%);
    }
  }
}
#lang {
  margin-top: 1rem;
  padding:.5rem;
}
</style>
