<template>
  <v-autocomplete
    :items="items"
    :filter="customFilter"
    color="white"
    item-text="name"
    item-value="id"
    label="Browse Content Types"
    v-model="foundNode"
    @change="selectNode"
  ></v-autocomplete>
</template>
<script>
export default {
  props: ["items", "selectedNode"],
  data() {
    return {
      foundNode: null
    };
  },
  watch: {
    selectedNode: {
      deep: true,
      handler(val) {
        if (val) this.foundNode = this.selectedNode.current;
      }
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.codename.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
    },
    selectNode(nodeId) {
      this.$emit("nodeFound", nodeId);
    }
  }
};
</script>