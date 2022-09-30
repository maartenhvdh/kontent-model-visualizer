<template>
  <v-card flat dense color="primary" dark class="pa-0 ma-0">
    <v-row justify="center" align="center" class="pa-0 ma-0">
      <v-col cols="3" class="pa-0 ma-0 pl-1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-show="buttons.fullscreen" class="ma-1" text icon @click="fullscreen">
              <v-icon v-on="on">mdi-overscan</v-icon>
            </v-btn>
          </template>
          <span>resize to fullscreen</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-show="buttons.fit" class="ma-1" text icon @click="fit">
              <v-icon v-on="on">mdi-image-filter-center-focus-strong-outline</v-icon>
            </v-btn>
          </template>
          <span>center the diagram</span>
        </v-tooltip>
        <!--<v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-show="buttons.save" class="ma-1" text icon @click="save">
              <v-icon v-on="on">mdi-file-download-outline</v-icon>
            </v-btn>
          </template>
          <span>save diagram as png</span>
        </v-tooltip>-->
      </v-col>
      <v-col :cols="isFullscreen ? 8 : 9"></v-col>
      <v-col cols="1" v-if="isFullscreen" align="right" class="pa-0 ma-0 pl-1">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ma-1" text icon @click="close">
              <v-icon v-on="on">mdi-close</v-icon>
            </v-btn>
          </template>
          <span>close fullscreen</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: ["buttons"],
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    fullscreen() {
      this.$globalEvents.$emit("fullscreen", true);
      this.isFullscreen = true;
    },
    fit() {
      this.$emit("fit");
    },
    save() {
      this.$emit("save");
    },
    close() {
      this.$globalEvents.$emit("fullscreen", false);
      this.isFullscreen = false;
    }
  }
};
</script>