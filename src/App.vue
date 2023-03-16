<template>
  <div id="app">
    <component :is="currentView" />
  </div>
</template>

<script lang="ts">
  import BoardOfBoardsView from './components/UltimateTicTacToe/BoardOfBoards.vue'

  export default {
    name: 'App',
    data() {
    return {
        currentPath: window.location.hash
      }
    },
    components: {
      BoardOfBoardsView,
    },
    computed: {
      currentView() {
        return BoardOfBoardsView;
      }
    },
    mounted() {
      window.addEventListener('hashchange', () => {
        this.currentPath = window.location.hash
      })
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto&family=Ubuntu&display=swap');

* {
  box-sizing: border-box;
}

html, body {
  background: rgb(59, 59, 59);
  margin: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

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
