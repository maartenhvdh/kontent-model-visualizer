<template>
  <v-expansion-panels class="ma-0 pa-0" v-model="linkedPanel" v-if="links.length > 0">
    <v-expansion-panel class="ma-0 pa-0">
      <v-expansion-panel-header expand-icon="mdi-menu-down">
        <span class="overline">Linked in {{links.length}} Types</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="ma-0 pa-0">
        <v-card flat>
          <v-list dense two-line flat class="pa-0 ma-0">
            <template v-for="(link, i) in links">
              <v-list-item :key="i">
                <v-list-item-content>
                  <v-row>
                    <v-col cols="12" class="ma-0 pl-2 pr-2 pa-0">
                      <v-card class="pa-1 pl-3 ma-1" color="primary" dark>
                        <v-list-item-title v-text="link.name"></v-list-item-title>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row justify="center" align="center" class="ma-0 pa-0">
                    <v-col cols="10" class="ma-0 pa-0">
                      <v-chip
                        label
                        color="primary"
                        outlined
                        dark
                        small
                        v-for="(element, a) in link.elements"
                        :key="i + '_' + a"
                        class="pa-2 ma-1"
                      >{{element.name}}</v-chip>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  props: ["links"],
  data() {
    return {
      linkedPanel: null
    };
  },
  methods: {}
};
</script>
<style scoped>
.display-elements {
  margin-top: -100px;
  margin-bottom: -20px;
}
</style>