<template>
  <v-app id="inspire">
    <v-content>
      <v-container :class="fullscreenDiagram ? `pt-3` : `pt-1 pb-0`">
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
.container {
  max-width: 95vw;
}

.application {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
