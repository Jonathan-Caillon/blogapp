<script setup></script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  background-color: var(--color--background-dark);
}

@media (min-width: 768px) {
  .main-content {
    padding-left: 80px;
  }
}
</style>
