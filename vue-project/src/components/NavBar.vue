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
            <RouterLink
              title="Create article"
              class="link"
              to="/article/create"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 12h10v1h-10v-1zm7.816-3h-7.816v1h9.047c-.45-.283-.863-.618-1.231-1zm5.184 1.975v2.569c0 4.106-6 2.456-6 2.456s1.518 6-2.638 6h-7.362v-20h9.5c.312-.749.763-1.424 1.316-2h-12.816v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.886c-.623.26-1.297.421-2 .475zm-13-3.975h6.5c-.134-.32-.237-.656-.319-1h-6.181v1zm17-2.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"
                />
              </svg>
              <div>Add article</div>
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
