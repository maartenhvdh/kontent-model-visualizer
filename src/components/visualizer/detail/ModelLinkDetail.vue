<template>
  <v-card class="mb-2" flat>
    <v-card outlined v-if="selectedNode && linkedElements.length > 0">
      <v-card-title>Selected link</v-card-title>
      <v-card-subtitle>
        <v-card class="pa-1 ma-1" color="primary" dark>
          <span>
            <v-row justify="center" align="center">
              <v-col cols="4" align="center">{{selectedNode.name}}</v-col>
              <v-col cols="2" align="center">
                <v-icon>mdi-arrow-right</v-icon>
              </v-col>
              <v-col cols="5" align="center">{{selectedNode.current.name}}</v-col>
            </v-row>
          </span>
        </v-card>
        <v-row justify="center" align="center" class="ma-0 pt-2 pb-2">
          <v-col cols="11" class="ma-0 pa-1">
            <v-row class="mb-1" align="center">
              <span class="overline">
                {{linkedElements.length}} element{{(linkedElements.length > 1 ? 's' : '')}} of
                <v-chip
                  color="primary"
                  small
                  label
                  outlined
                  class="overline pa-2"
                >{{selectedNode.name}}</v-chip>
                {{(linkedElements.length > 1 ? 'include' : 'includes')}}
                <v-chip
                  color="primary"
                  small
                  label
                  outlined
                  class="overline pa-2"
                >{{selectedNode.current.name}}</v-chip>
              </span>
            </v-row>
            <v-divider class="mt-4 mb-1"></v-divider>
            <v-chip
              label
              color="primary"
              small
              v-for="(element, a) in linkedElements"
              :key="'_' + a"
              class="ma-1"
            >{{element.name}}</v-chip>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-card outlined v-if="selectedNode && linkedElements.length == 0">
      <v-card-title>Selected link</v-card-title>
      <v-card-subtitle>
        <v-card class="pa-1 ma-1" color="primary" dark>
          <span>
            <v-row justify="center" align="center">
              <v-col cols="4" align="center">{{selectedNode.current.name}}</v-col>
              <v-col cols="2" align="center">
                <v-icon>mdi-arrow-right</v-icon>
              </v-col>

              <v-col cols="5" align="center">{{selectedNode.name}}</v-col>
            </v-row>
          </span>
        </v-card>
        <v-row justify="center" align="center" class="ma-0 pt-2 pb-2">
          <v-col cols="11" class="ma-0 pa-1">
            <v-row class="mb-1" align="center">
              <span class="overline">
                {{linkedInElements.length}} element{{(linkedInElements.length > 1 ? 's' : '')}} of
                <v-chip
                  color="primary"
                  small
                  label
                  outlined
                  class="overline pa-2"
                >{{selectedNode.current.name}}</v-chip>
                {{(linkedInElements.length > 1 ? 'include' : 'includes')}}
                <v-chip
                  color="primary"
                  small
                  label
                  outlined
                  class="overline pa-2"
                >{{selectedNode.name}}</v-chip>
              </span>
            </v-row>
            <v-divider class="mt-4 mb-1"></v-divider>
            <v-chip
              label
              color="primary"
              small
              v-for="(element, a) in linkedInElements"
              :key="'_' + a"
              class="ma-1"
            >{{element.name}}</v-chip>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-card>
</template>
<script>
export default {
  props: ["selectedNode"],
  computed: {
    linkedElements() {
      return this.selectedNode.elements.filter(
        e =>
          e.allowedTypes &&
          e.allowedTypes.length > 0 &&
          e.allowedTypes.map(t => t.id).includes(this.selectedNode.current.id)
      );
    },
    linkedInElements() {
      return this.selectedNode.current.elements.filter(
        e => e.allowedTypes && e.allowedTypes.length > 0 && e.allowedTypes.map(t => t.id).includes(this.selectedNode.id)
      );
    }
  }
};
</script>