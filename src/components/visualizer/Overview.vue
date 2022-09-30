<template>
  <v-container :class="fullscreenDiagram ?'ma-0 pa-0' : '' ">
    <v-row v-show="fullscreenDiagram">
      <v-col align="center" justify="center" class="ma-0 pa-0">
        <v-card flat outlined class="pa-2 ma-0" color="primary" dark>
          <model-search :items="rawData" @nodeFound="nodeFound" :selectedNode="selectedNode"></model-search>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="modelData" justify="center" align="start">
      <v-col :cols="fullscreenDiagram ? 12 : 8" :class="fullscreenDiagram ?'ma-0 pa-0' : '' ">
        <kontent-network
          ref="network"
          :nodes="nodes"
          :edges="edges"
          :saveWarningRead="saveWarningRead"
          @nodeSelected="nodeSelected"
          @nodeUnselected="nodeUnselected"
        ></kontent-network>
      </v-col>
      <v-col cols="4" v-show="!fullscreenDiagram">
        <v-card flat outlined class="pa-4" color="primary" dark>
          <model-search :items="rawData" @nodeFound="nodeFound" :selectedNode="selectedNode"></model-search>
        </v-card>
        <selected-node-detail
          v-if="selectedNode"
          :selectedNode="selectedNode"
          :projectId="modelData.projectId"
        ></selected-node-detail>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as DataProcessor from "@/clients/KontentModellingDataProcessor.js";

import SelectedNodeDetail from "./overview/SelectedNodeDetail";
import ModelSearch from "./overview/ModelSearch";

import KontentNetwork from "./shared/KontentNetwork";

export default {
  props: ["modelData", "saveWarningRead"],
  data() {
    return {
      fullscreenDiagram: false,
      rawData: null,
      nodes: null,
      edges: null,
      selectedNode: null
    };
  },
  components: {
    SelectedNodeDetail,
    KontentNetwork,
    ModelSearch
  },
  watch: {
    modelData: {
      immediate: true,
      handler(val) {
        if (val) this.processData(val);
      }
    }
  },
  created() {
    this.$globalEvents.$on("fullscreen", value => this.fullscreen(value));
  },
  methods: {
    processData(data) {
      this.rawData = data;
      this.nodes = DataProcessor.getNodesFromData(data);
      this.edges = DataProcessor.getEdgesFromData(data);
    },
    nodeSelected(node) {
      this.selectedNode = DataProcessor.getSelectedNodeData(node, this.rawData);
      this.foundNode = this.selectedNode.current;
    },
    nodeFound(nodeId) {
      this.$globalEvents.$emit("selectNode", DataProcessor.getClickedNodeVisDataObject(nodeId, this.edges));
      this.$globalEvents.$emit("focus", nodeId);
    },
    nodeUnselected() {
      this.selectedNode = null;
      this.foundNode = null;
    },
    fullscreen(val) {
      if (val) document.getElementsByClassName("network")[0].style.height = window.innerHeight - 250 + "px";
      else document.getElementsByClassName("network")[0].style.height = "600px";
      this.fullscreenDiagram = val;
    }
  }
};
</script>