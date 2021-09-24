<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box !important;
}

.el-container {
  position: relative;
}

.el-aside {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  width: fit-content;
  height: 100vh;
}
</style>
