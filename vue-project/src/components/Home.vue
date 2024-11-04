<script setup>
import Article from "./Article.vue";
import { ref } from "vue";
import router from "@/router";

const token = localStorage.getItem("token");
let loading = ref(true);
let allArticlesJson = ref([]);

const getArticles = async () => {
  const articles = await fetch(import.meta.env.VITE_BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      query: `query Query {
                getUserArticles {
                  creationDate
                  description
                  title
                  id
                }
              }
              `,
    }),
  });

  const allArticles = await articles.json();

  console.log(allArticles);

  if (allArticles.errors) {
    console.log(allArticles.errors);
    if (allArticles.errors[0].message === "The user is not connected") {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  } else {
    allArticlesJson.value = [allArticles.data.getUserArticles][0];
  }
  loading.value = false;
};

getArticles();
</script>

<template>
  <div>
    <main class="container">
      <div class="title">
        <h1>BlogApp</h1>
        <p>Retrouvez ici vos différents articles</p>
      </div>
      <div class="content">
        <div v-if="loading">Loading...</div>
        <div
          v-else
          v-for="singleArticle in allArticlesJson"
          :key="singleArticle.id"
        >
          <Article :singleArticle="singleArticle" />
        </div>
      </div>
    </main>
  </div>
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
