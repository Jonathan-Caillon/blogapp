<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="styledSideMenu">
    <div className="navbar">
      <div>
        <img class="logo" src="@\assets\blogappNoBackground.png" alt="" />
      </div>
      <div className="menu">
        <ul>
          <li>
            <RouterLink title="Home" class="link" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"
                />
              </svg>
              <div>Home</div>
            </RouterLink>
          </li>
          <li>
            <RouterLink title="Profile" class="link" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"
                />
              </svg>
              <div>Profile</div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.styledSideMenu {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: var(--color--background-light-dark);
  height: 100%;
  width: 80px;
  z-index: 99;
  border-right: 1px solid rgb(61, 68, 77);
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.logo {
  margin-top: 30px;
  width: 100%;
  margin-bottom: 50px;
  background-color: transparent;
}

svg {
  fill: #e5e7eb;
  width: 50px;
}

.menu {
  width: 100%;
}

.menu ul {
  width: 100%;
  padding: 0;
}
.menu ul li .link {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0;
  color: #e5e7eb;
}

.menu ul li svg {
  height: 20px;
  fill: #e5e7eb;
  margin-bottom: 7px;
}
.menu ul li {
  height: 60px;
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
  list-style: none;
  color: #e5e7eb;
  text-decoration: none;
}

.menu ul li:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
}

.menu ul li:hover svg {
  fill: white;
}
.menu ul li .link:hover {
  text-decoration: none;
}

@media (max-width: 767px) {
  .styledSideMenu {
    left: 0;
    bottom: 0;
    top: auto;
    height: auto;
    width: 100%;
    border-top: 1px solid rgb(61, 68, 77);
    border-right: 0;
  }

  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .logo {
    display: none;
  }

  .menu ul {
    display: flex;
    margin: 0;
  }
}
</style>
