<template>
  <v-card outlined class="pa-4">
    <network-toolbar :buttons="buttons" @fit="fit" @save="save"></network-toolbar>
    <network
      ref="network"
      class="network"
      :id="`network_${canvasId}`"
      :nodes="nodesDataSet"
      :edges="edgesDataSet"
      :options="options"
      @select-node="nodeSelected"
      @click="networkClicked"
    ></network>
    <saving-dialog :open="warningDialog" @save="reallySave" @close="warningDialog=false"></saving-dialog>
  </v-card>
</template>
<script>
import { DataSet, Network } from "vue2vis";

import NetworkToolbar from "./NetworkToolbar";
import SavingDialog from "./SavingDialog";

export default {
  props: {
    edges: {
      type: Array,
      default: () => []
    },
    nodes: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Object,
      default: () => ({
        fullscreen: true,
        fit: true,
        save: true
      })
    },
    saveWarningRead: {
      type: Boolean,
      default: () => false
    },
    canvasId: {
      type: Number,
      default: () => 0
    }
  },
  components: { Network, NetworkToolbar, SavingDialog },
  data() {
    return {
      nodesDataSet: [],
      edgesDataSet: [],
      isFullscreen: false,
      warningDialog: false,
      options: {
        nodes: {
          shape: "box",
          size: 30,
          margin: 10,
          widthConstraint: {
            maximum: 200
          },
          color: {
            highlight: {
              border: "#f05a22",
              background: "#ee997a"
            }
          }
        },
        physics: {
          enabled: true,
          solver: "forceAtlas2Based",
          forceAtlas2Based: {
            gravitationalConstant: -90,
            avoidOverlap: 0.1,
            damping: 1
          }
        },
        layout: {
          hierarchical: false
        },
        edges: {
          arrows: "to",
          scaling: {
            label: true
          },
          shadow: true,
          smooth: true,
          color: {
            highlight: "#f05a22"
          }
        },
        interaction: {
          navigationButtons: true,
          keyboard: true
        }
      }
    };
  },
  watch: {
    nodes: {
      immediate: true,
      handler(val) {
        if (val) this.nodesDataSet = new DataSet(val);
      }
    },
    edges: {
      immediate: true,
      handler(val) {
        if (val) this.edgesDataSet = new DataSet(val);
      }
    }
  },
  created() {
    this.$globalEvents.$on("focus", nodeId => this.focus(nodeId));
    this.$globalEvents.$on("selectNode", data => this.nodeSelected(data));
    this.$globalEvents.$on("fullscreen", value => (this.isFullscreen = value));
  },
  methods: {
    nodeSelected(data) {
      let selectedNodeId = data.nodes[0];
      var selectedEdges = data.edges;
      let selectedNodes = new Set();
      selectedNodes.add(selectedNodeId);

      for (let i = 0, edge; (edge = selectedEdges[i]); i++) {
        let clickedEdge = this.edgesDataSet.get(edge);
        selectedNodes.add(clickedEdge.from);
        selectedNodes.add(clickedEdge.to);
      }

      this.$nextTick(() => {
        this.$refs.network.setSelection(
          { nodes: [...selectedNodes], edges: selectedEdges },
          {
            unselectAll: true,
            highlightEdges: false
          }
        );
      });
      this.$emit("nodeSelected", { id: selectedNodeId, selectedNodes: [...selectedNodes] });
    },
    networkClicked(data) {
      if (data.nodes.length > 0) {
        this.nodeSelected(data);
      } else {
        this.$nextTick(() => {
          this.$refs.network.unselectAll();
          this.$emit("nodeUnselected");
        });
      }
    },
    fit() {
      this.$refs.network.fit();
    },
    fullscreen() {
      this.isFullscreen = true;
    },
    save() {
      if (!this.saveWarningRead) {
        this.warningDialog = true;
      } else {
        this.reallySave();
      }
    },
    reallySave() {
      this.warningDialog = false;
      this.$globalEvents.$emit("saveWarningRead");

      var canvas = document.querySelector(`#network_${this.canvasId} canvas`);
      var link = document.createElement("a");
      link.download = "KontentModel.jpg";
      link.href = canvas.toDataURL();
      link.click();
    },
    focus(nodeId) {
      this.$refs.network.focus(nodeId);
    }
  }
};
</script>
<style scoped>
.network {
  height: 635px;
}
</style>