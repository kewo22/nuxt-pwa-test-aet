<template>
  <!-- <v-app dark>
    <Nuxt />
  </v-app> -->

  <v-app>
    <v-navigation-drawer v-model="drawer" app absolute expand-on-hover>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <!-- <v-btn icon @click.stop="test">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <NuxtLink :to="item.route"> {{ item.title }} </NuxtLink>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app> -->
    <!-- -->
    <!-- </v-app-bar> -->

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fill-height fluid class="pa-0">
        <!-- If using vue-router -->
        <!-- <router-view></router-view> -->
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer app>
      FOOTER
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Orders", icon: "mdi-filter", route: "/orders" },
        { title: "Filters", icon: "mdi-filter", route: "/order" },
        { title: "Settings", icon: "mdi-cog", route: "/order" },
      ],
      clipped: true,
    };
  },
  methods: {},
};
</script>

<style>
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #00c58e;
}
</style>
