<template>
  <div class="article">
    <div class="article-body">
      <div class="article-content">
        <h3>Les nouveautés de Python 3.12</h3>
        <div style="display: flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"
            />
          </svg>
          <div>01 octobre 2023</div>
        </div>
        <div>
          Dans cet article, nous allons passer en revue toutes les nouveautés de
          la version 3.12 de Python.
        </div>
        <button class="btn">
          <span class="btn-text">Lire l'article</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  margin: 0;
}
.article {
  border-radius: 0.5rem;
  background-color: #1d232a;
  padding: 16px;
}

.article-body {
  min-height: 200px;
  height: 100%;
}
.article-content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}
svg {
  fill: #e5e7eb;
  width: 20px;
  margin-right: 10px;
}

.btn {
  align-self: flex-end;
  margin-top: auto;
  color: #e5e7eb;
  background-color: #191e24;
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
