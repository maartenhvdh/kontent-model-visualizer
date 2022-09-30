<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>Warning</v-card-title>
      <v-card-text>
        Due to
        <strong>browser limitations</strong>, the diagram image can be only exported in
        <strong>96dpi</strong>, which may render the result picture unreadable when trying to export too large of an area.
        <br />
        <br />To improve the result, we suggest exporting only zoomed parts of the diagram, or using different method of exporting the image (e.g. PrintScreen).
        <br />
        <br />Also, keep in mind that only the visible part of the diagram will be exported.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary dark" text @click="save">Export Anyway</v-btn>
        <v-btn text @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["open"],
  data() {
    return {
      dialog: false
    };
  },
  watch: {
    open(val) {
      this.dialog = val;
    }
  },
  methods: {
    save() {
      this.$emit("save");
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>