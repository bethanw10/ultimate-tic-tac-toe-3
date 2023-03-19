<template>
  <div id="nav">
    <router-link to="/TicTacToe">Tic Tac Toe</router-link> |
    <router-link to="/">Tic Tac Toe<span class="super">2</span></router-link> |
    <router-link to="/SOS">SOS</router-link> |
    <router-link to="/Notakto">Notakto</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  components: {
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto&family=Ubuntu&display=swap');

* {
  box-sizing: border-box;
}

html,
body {
  background: rgb(59, 59, 59);
  margin: 0;
  height: 100%;
}

a {
  color: white;
}

.super {
  vertical-align: super;
  font-size: small;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

button {
  appearance: none;
  border: none;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 2px;
  padding: 5px 15px;
  color: #e2e2e2;
  background-color: #68985c;
  font-family: 'Ubuntu', sans-serif;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  min-height: 34px;
}

button:hover {
  background-color: #477239;
}

button.grey {
  background-color: #7b7b7b;
}

button.grey:hover {
  background-color: #525252;
}
</style>
