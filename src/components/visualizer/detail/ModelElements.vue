<template>
  <v-expansion-panels class="ma-0 pa-0" v-model="elementsPanel">
    <v-row justify="end" align="center" class="display-elements pr-2">
      <v-col cols="3" class="overline ma-0 pa-0">Display All Elements</v-col>
      <v-col cols="1">
        <v-switch dense v-model="showAllElements" label></v-switch>
      </v-col>
    </v-row>
    <v-expansion-panel class="ma-0 pa-0">
      <v-expansion-panel-header expand-icon="mdi-menu-down">
        <span class="overline">{{this.elements.length}} Elements</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="ma-0 pa-0">
        <v-card flat>
          <v-list dense two-line flat>
            <v-list-item v-for="(item, i) in filteredElements" :key="i">
              <v-list-item-action>
                <v-icon>{{iconFromType(item.type)}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.type"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-if="item.allowedTypes && item.allowedTypes.length > 0">
                <v-card flat>
                  <span class="overline">allowed types:</span>
                  <v-row
                    justify="start"
                    align="start"
                    class="pl-3 pt-1"
                    v-for="(allowed, a) in item.allowedTypes"
                    :key="i + '_' + a"
                  >
                    <v-chip label small color="primary" dark>{{allowed.name}}</v-chip>
                  </v-row>
                </v-card>
              </v-list-item-content>
              <v-list-item-avatar v-show="item.required">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-alert-circle-outline</v-icon>
                  </template>
                  <span>required element</span>
                </v-tooltip>
              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  props: ["elements"],
  data() {
    return {
      showAllElements: true,
      elementsPanel: 0
    };
  },
  computed: {
    filteredElements() {
      if (this.showAllElements) return this.elements;
      return this.elements.filter(e => e.type == "modular_content");
    }
  },
  methods: {
    iconFromType(type) {
      console.log(type);
      switch (type) {
        case "text":
          return "mdi-text-short";
        case "rich_text":
          return "mdi-text-subject";
        case "number":
          return "mdi-pound";
        case "multiple_choice":
          return "mdi-checkbox-marked";
        case "date_time":
          return "mdi-calendar-month";
        case "asset":
          return "mdi-image-area";
        case "modular_content":
          return "mdi-puzzle";
        case "custom":
          return "mdi-qrcode-edit";
        case "guidelines":
          return "mdi-vector-polyline";
        case "taxonomy":
          return "mdi-inbox-multiple";
        case "url_slug":
          return "mdi-link";
        case "content_type_snippet":
          return "mdi-format-list-text";
        default: 
          return "mdi-tab-unselected"
      }
    }
  }
};
</script>
<style scoped>
.display-elements {
  margin-top: -100px;
  margin-bottom: -20px;
}
</style>