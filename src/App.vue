<template>
  <v-app id="inspire">
    <v-content>
      <v-container :class="fullscreenDiagram ? `pt-3` : `pt-1 pb-0`">
        <img id="logo" src="/kai-logo.png" />
        <error-handler></error-handler>
        <project-selector v-show="!fullscreenDiagram"></project-selector>
        <visualizer></visualizer>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import ErrorHandler from "./components/ErrorHandler";
import ProjectSelector from "./components/ProjectSelector";
import Visualizer from "./components/Visualizer";

export default {
  components: {
    Visualizer,
    ProjectSelector,
    ErrorHandler
  },
  data() {
    return {
      fullscreenDiagram: false
    };
  },
  created() {
    this.$globalEvents.$on("fullscreen", value => (this.fullscreenDiagram = value));
  }
};
</script>
<style>
#logo {
  width: 150px;
  float: left;
  clear: both;
  margin-top: 10px;
  margin-left: 5px;
}
.container {
  max-width: 95vw;
}

.application {
  font-family: "Work Sans", sans-serif;
}
</style>
