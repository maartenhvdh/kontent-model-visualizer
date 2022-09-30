<template>
  <v-card outlined>
    <v-card-text>
      <v-container style="margin-top: -20px;">
        <v-row justify="center" align="center">
          <v-col>
            <span class="overline">codename:</span>
            <br />
            {{selectedNode.codename}}
          </v-col>
        </v-row>
        <v-row justify="start" align="start">
          <v-col>
            <v-btn
              align="center"
              class="text-none font-weight-light pl-1 pr-1"
              color="primary"
              light
              @click="addTab"
            >
              <span class="ma-1">Details</span>
              <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col class="ml-1">
            <v-btn
              target="_blank"
              align="center"
              class="text-none font-weight-light pl-1 pr-1"
              color="primary"
              :href="kontentUrl"
            >
              <span class="ma-1">Kontent</span>
              <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-if="selectedNode.links.length > 0"
          justify="end"
          align="center"
          class="display-elements pr-2"
        >
          <v-col cols="4" class="overline ma-0 pl-4">Show link elements</v-col>
          <v-col cols="1" class="ma-0 pa-0">
            <v-switch dense v-model="showLinkElements" label></v-switch>
          </v-col>
        </v-row>
        <v-row justify="start" align="center" style="margin-top: -5px;">
          <v-col cols="12" class="pa-1 ma-0">
            <v-divider v-if="selectedNode.links.length > 0"></v-divider>
            <v-expansion-panels class="ma-0 pa-0" v-model="linkedPanel">
              <v-expansion-panel v-if="selectedNode.links.length > 0" class="ma-0 pa-0">
                <v-expansion-panel-header
                  class="overline"
                  expand-icon="mdi-menu-down"
                >{{selectedNode.links.length}} Linked types</v-expansion-panel-header>
                <v-expansion-panel-content class="ma-0 pa-0">
                  <v-list dense>
                    <v-list-item-group color="primary">
                      <v-list-item
                        v-for="(item, i) in linkedTypes"
                        :key="i"
                        @click="focus(item.id)"
                      >
                        <v-row class="pa-0 ma-0" justify="center" align="center">
                          <v-col cols="1">
                            <v-icon
                              v-if="item.type == 'out'"
                              color="#f05a22"
                              class="pr-2"
                            >mdi-arrow-left-bold</v-icon>
                            <v-icon
                              v-if="item.type == 'in'"
                              color="primary"
                              class="pr-2"
                            >mdi-arrow-right-bold</v-icon>
                            <v-icon
                              v-if="item.type == 'both'"
                              color="black"
                              class="pr-2"
                            >mdi-arrow-left-right-bold</v-icon>
                          </v-col>
                          <v-col :cols="showLinkElements ? 5 : 11">{{item.name}}</v-col>
                          <v-col cols="6" v-if="showLinkElements">
                            <v-chip
                              label
                              color="primary"
                              outlined
                              dark
                              small
                              v-for="(prop, x) in item.properties"
                              :key="i + '_' + x"
                              class="pa-2 mr-2 mb-1"
                            >{{prop}}</v-chip>
                          </v-col>
                        </v-row>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["selectedNode", "projectId"],
  data() {
    return {
      linkedPanel: 0,
      showLinkElements: 0
    };
  },
  computed: {
    kontentUrl() {
      return `https://app.kontent.ai/${this.projectId}/content-models/types/edit/${this.selectedNode.id}`;
    },
    linkedTypes() {
      let linkedTypes = [];

      for (let i = 0, linked; (linked = this.selectedNode.links[i]); i++) {
        let linkedType = {};

        let outgoing = this.selectedNode.current.elements.filter(
          e => e.allowedTypes && e.allowedTypes.map(t => t.id).includes(linked.id)
        );

        let incoming = linked.elements.filter(
          e => e.allowedTypes && e.allowedTypes.map(t => t.id).includes(this.selectedNode.id)
        );

        if (outgoing.length > 0) {
          if (incoming.length > 0) {
            // both
            linkedType = {
              type: "both",
              properties: [...outgoing.map(t => `(out) ${t.name}`), ...incoming.map(t => `(in) ${t.name}`)],
              name: linked.name,
              id: linked.id
            };
          } else {
            // outgoing
            linkedType = { type: "out", properties: outgoing.map(t => t.name), name: linked.name, id: linked.id };
          }
        } else {
          //incoming
          linkedType = { type: "in", properties: incoming.map(t => t.name), name: linked.name, id: linked.id };
        }

        linkedTypes.push(linkedType);
      }
      return linkedTypes;
    }
  },
  methods: {
    focus(nodeId) {
      this.$globalEvents.$emit("focus", nodeId);
    },
    addTab() {
      this.$globalEvents.$emit("addTab", this.selectedNode);
    }
  }
};
</script>