<template>
  <v-app light>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      fixed: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("authorizeClientApp");
  },
  methods: {
    ...mapActions(["authorizeClientApp"]),
  },
};
</script>
