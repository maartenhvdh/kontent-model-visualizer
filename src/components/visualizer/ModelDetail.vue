<template>
  <v-card flat>
    <v-row>
      <v-col cols="7">
        <kontent-network
          ref="selectedNetwork"
          :canvasId="id"
          :nodes="nodes"
          :edges="edges"
          :buttons="networkButtons"
          @nodeSelected="nodeSelected"
          @nodeUnselected="nodeUnselected"
        ></kontent-network>
      </v-col>
      <v-col cols="5">
        <model-link-detail :selectedNode="selectedNode"></model-link-detail>
        <v-card outlined>
          <v-card-title>{{modelData.name}}</v-card-title>
          <v-card-subtitle>
            <span class="overline">codename:</span>
            {{modelData.codename}}
          </v-card-subtitle>
          <v-card-text>
            <model-elements :elements="modelData.current.elements"></model-elements>
            <br />
            <model-links :links="links"></model-links>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import * as DataProcessor from "@/clients/KontentModellingDataProcessor.js";

import KontentNetwork from "./shared/KontentNetwork";

import ModelElements from "./detail/ModelElements";
import ModelLinks from "./detail/ModelLinks";
import ModelLinkDetail from "./detail/ModelLinkDetail";

export default {
  props: ["modelData", "id"],
  components: {
    KontentNetwork,
    ModelElements,
    ModelLinks,
    ModelLinkDetail
  },
  data() {
    return {
      nodes: null,
      edges: null,
      rawData: null,
      links: null,
      selectedNode: null,
      networkButtons: {
        fit: true
      }
    };
  },
  watch: {
    modelData: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) this.processData(val);
      }
    }
  },
  methods: {
    processData(data) {
      this.rawData = data;
      this.nodes = DataProcessor.getNodesFromData([...data.links, data.current]);
      this.edges = DataProcessor.getSelectedNodeEdges(data.current, data.links);
      this.links = DataProcessor.getModelRelations(data.current, data.links);
    },
    nodeSelected(node) {
      let selectedNode = this.modelData.links.find(n => n.id == node.id);
      if (!selectedNode) return this.nodeUnselected();
      selectedNode.current = this.modelData.current;
      this.selectedNode = selectedNode;
    },
    nodeUnselected() {
      this.selectedNode = null;
    }
  }
};
</script>

<style scoped>
.network {
  height: 600px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>