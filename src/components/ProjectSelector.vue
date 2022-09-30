<template>
  <v-container class="pa-0 ma-0">
    <v-row v-if="projectData" align="center" justify="center" class="pa-0 ma-0 mb-2">
      <v-col cols="7" v-if="projectData">
        <project-detail :projectData="projectData" :projectId="projectId"></project-detail>
      </v-col>
      <v-col cols="2">
        <v-btn color="primary" @click="requestVisualization" class="mr-2">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn color="primary" class="text-none" @click="changeVisualization">Change project</v-btn>
      </v-col>
    </v-row>
    <v-row v-else align="center" justify="center" class="pa-0 ma-0">
      <v-col cols="3">
        <v-text-field label="Kontent Project Id" v-model="projectId"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="primary"
          class="text-none"
          @click="requestVisualization"
        >Visualize Content Models</v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" :persistent="loading" max-width="500">
      <v-card>
        <v-card-text>
          <v-card-title>Request Kontent Model Map</v-card-title>
          <v-container>
            <v-row justify="center" align="center">
              <v-col>
                <v-text-field
                  label="Management Api Key"
                  v-model="apiKey"
                  type="password"
                  :disabled="loading"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-col cols="7">
                <v-btn
                  color="primary"
                  class="text-none"
                  @click="getKontentModellingData"
                  :disabled="loading"
                >Visualize Content Models</v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="center" class="ma-5 pa-5" v-if="loading">
              <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import * as KontentModellingClient from "@/clients/KontentModellingClient.js";

import ProjectDetail from "./ProjectDetail";

export default {
  data() {
    return {
      projectId: null,
      apiKey: null,
      dialog: false,
      projectData: null,
      loading: false
    };
  },
  components: {
    ProjectDetail
  },
  methods: {
    changeVisualization() {
      this.$globalEvents.$emit("data", null);
      this.data = null;
      this.projectData = null;
      this.projectId = null;
    },
    requestVisualization() {
      if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(this.projectId)) {
        this.$globalEvents.$emit("error", "Invalid Project Id!");
      } else {
        this.dialog = true;
      }
    },
    async getKontentModellingData() {
      this.loading = true;
      let response = await KontentModellingClient.getKontentModelInfo(this.projectId, this.apiKey)
        try {
          this.finishProcessing();
          this.projectData = response;
          this.projectData.projectId = this.projectId;
          this.$globalEvents.$emit("data", this.projectData);
          this.$globalEvents.$emit("no-error");
        
        }
        catch(ex) 
        {
          console.log(ex);
          this.finishProcessing();
          this.$globalEvents.$emit("error", "Something went wrong, try again later!");
        }
    },
    finishProcessing() {
      this.apiKey = null;
      this.loading = false;
      this.dialog = false;
    }
  }
};
</script>