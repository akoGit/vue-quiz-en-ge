<script setup>
const props = defineProps({
  question: Object
})
</script>

<template>
  <ul>
    <li>
      <button type="button">First</button>
    </li>

    <li>
      <button type="button">Previous</button>
    </li>

    <!-- Visible Buttons Start -->

    <!-- ... -->

    <!-- Visible Buttons End -->

    <li>
      <button type="button">Next</button>
    </li>

    <li>
      <button type="button">Last</button>
    </li>
  </ul>
</template>

<style scoped></style>
