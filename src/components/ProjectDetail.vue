<template>
  <v-card class="pa-0 ma-0 pl-0" v-if="!hide" flat>
    <v-row justify="center" align="center" class="pa-0 ma-0 pl-2 pr-2">
      <v-col cols="5" class="pa-0 ma-0">
        <v-chip color="primary" class="font-weight-bold mr-2" dark label outlined>{{nodes.length}}</v-chip>
        <span class="overline">Content Types</span>
      </v-col>
      <v-col cols="5" class="pa-0 ma-0">
        <v-chip color="primary" class="font-weight-bold mr-2" dark label outlined>{{edges.length}}</v-chip>
        <span class="overline">Unique Links between Types</span>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import * as DataProcessor from "@/clients/KontentModellingDataProcessor.js";

export default {
  props: ["projectId", "projectData"],
  data() {
    return {
      nodes: null,
      edges: null,
      hide: false
    };
  },
  created() {
    this.$globalEvents.$on("data", data => {
      if (!data) this.hide = true;
    });
  },
  watch: {
    projectData: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.hide = false;
          this.nodes = DataProcessor.getNodesFromData(val);
          this.edges = DataProcessor.getEdgesFromData(val);
        } else {
          this.hide = true;
        }
      }
    }
  }
};
</script>