<template>
  <v-card flat v-if="modelData">
    <v-tabs v-model="tab" v-show="!fullscreenDiagram">
      <v-tab>Overview</v-tab>
      <v-tab v-for="t in tabs" :key="t.id">
        {{t.name}}
        <v-icon @click="removeTab(t)" style="float:right; margin-left:5px;">mdi-close-box</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <overview :modelData="modelData" :saveWarningRead="saveWarningRead"></overview>
      </v-tab-item>
      <v-tab-item v-for="(t,i) in tabs" :key="t.id" v-show="!fullscreenDiagram">
        <model-detail :modelData="t" :saveWarningRead="saveWarningRead" :id="i+1"></model-detail>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import Overview from "./visualizer/Overview";
import ModelDetail from "./visualizer/ModelDetail";

export default {
  components: {
    Overview,
    ModelDetail
  },
  data() {
    return {
      tab: 0,
      tabs: [],
      modelData: null,
      fullscreenDiagram: false,
      saveWarningRead: false
    };
  },
  created() {
    this.$globalEvents.$on("data", modelData => (this.modelData = modelData));
    this.$globalEvents.$on("addTab", tab => this.addTab(tab));
    this.$globalEvents.$on("fullscreen", value => (this.fullscreenDiagram = value));
    this.$globalEvents.$on("saveWarningRead", () => (this.saveWarningRead = true));
  },
  methods: {
    addTab(data) {
      this.tabs.push(data);
      this.tab = this.tabs.length;
    },
    removeTab(tab) {
      this.tabs = this.tabs.filter(t => t != tab);
    }
  }
};
</script>