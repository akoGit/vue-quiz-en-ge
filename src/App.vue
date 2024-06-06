<script setup>
import Questions from './components/Questions.vue'
import HeaderComp from './components/HeaderComp.vue'

</script>

<template>
  <span id="lang" type='hidden'></span>
  <HeaderComp />
  <Questions />

</template>


<style scoped>

#lang {
  margin-top: 1rem;
  padding:.5rem;
}
</style>
