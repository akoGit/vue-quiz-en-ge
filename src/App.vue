<script setup>
import Questions from './components/Questions.vue'
import HeaderComp from './components/HeaderComp.vue'

</script>

<template>
  <HeaderComp/>
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
    color: #FFFFFF;
    background-color: #000000;
    border: 1px solid  #333340;
    width:2.25rem;
    height:2.25rem;
    border-radius:4px;
    &:hover {
      background-color:hsl(240,3.7%,15.9%);
    }
  }
}
</style>
