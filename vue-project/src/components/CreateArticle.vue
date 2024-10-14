<script setup>
import Editor from "primevue/editor";
import { ref } from "vue";
import router from "@/router";

const title = ref("");
const description = ref("");
const editor = ref("");
const token = localStorage.getItem("token");

const createArticle = async () => {
  const createArticle = await fetch(import.meta.env.VITE_BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      query: `
                mutation Mutation($content: String!, $description: String!, $title: String!) {
                    createArticle(content: $content, description: $description, title: $title) {
                        id
                    }
                }
              `,
      variables: {
        title: title.value,
        description: description.value,
        content: editor.value,
      },
    }),
  });

  const article = await createArticle.json();

  if (article.errors) {
    console.log(article.errors);
    if (article.errors[0].message === "The user is not connected") {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  } else {
    router.push({ name: "home" });
  }
};
</script>

<template>
  <div class="container">
    <h1>This is an edit page</h1>
    <div class="content">
      <label for="title">Title</label>
      <input type="text" v-model="title" placeholder="Title" id="title" />
      <label for="description">Description</label>
      <input
        type="text"
        v-model="description"
        placeholder="Description"
        id="description"
      />
      <label for="editor">Content</label>
      <Editor id="editor" v-model="editor" editorStyle="height: 320px">
      </Editor>
    </div>
    <button @click="createArticle" class="btn">
      <span class="btn-text">Create article</span>
    </button>
  </div>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 0.5rem;
}

.container {
  margin: 16px;
  padding: 16px;
  background-color: var(--color--background-light-dark);
}
.btn {
  align-self: flex-end;
  margin-top: 30px;
  color: #e5e7eb;
  background-color: #1d232a;
  height: 3rem;
  padding: 0 1rem;
  text-align: center;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
}

.btn:hover {
  background-color: var(--color--background-dark);
}
</style>
