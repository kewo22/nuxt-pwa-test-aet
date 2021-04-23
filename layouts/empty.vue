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
export default {
  data() {
    return {
      fixed: false,
    };
  },
  created() {},
};
</script>
