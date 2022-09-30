<template>
  <v-row v-if="error" justify="center" align="center">
    <v-col>
      <v-alert type="error">{{error}}</v-alert>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      error: null
    };
  },
  created() {
    this.$globalEvents.$on("error", error => this.setError(error));
    this.$globalEvents.$on("no-error", () => (this.error = null));
  },
  methods: {
    setError(error) {
      this.error = error;
      setInterval(() => (this.error = null), 5000);
    }
  }
};
</script>