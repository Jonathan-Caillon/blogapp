<script setup>
import Article from "./Article.vue";
</script>

<template>
  <main class="container">
    <div class="title">
      <h1>BlogApp</h1>
      <p>Retrouvez ici vos différents articles</p>
    </div>
    <div class="content">
      <Article />
      <Article />
      <Article />
    </div>
  </main>
</template>

<style scoped>
.content {
  margin-top: 20px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

h1 {
  margin: 0;
  color: var(--color--text);
}

.container {
  margin: 16px;
  padding: 16px;
  background-color: var(--color--background-light-dark);
}
</style>
