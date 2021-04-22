<template>
  <div class="d-flex fill-height">
    <div class="d-flex flex-column section-1">
      <div>
        <v-text-field
          label="Search by ID"
          placeholder="Search by ID"
          solo
          dense
          height="30"
          class="search-input ml-auto"
        ></v-text-field>
      </div>
      <div class="d-flex flex-column order-list-wrapper">
        <v-tabs
          centered
          background-color="transparent"
          class="tab-header"
          v-model="tabs"
        >
          <v-tab v-for="n in 3" :key="n"> Item {{ n }} </v-tab>
        </v-tabs>

        <v-tabs-items class="tab-items" v-model="tabs">
          <v-tab-item>
            <v-card flat>
              <v-card-text class=""> NEW </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text> IN PROGRESS </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
               COMPLETED
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>

    <div class="section-2">11</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: null,
    };
  },
};
</script>

<style scoped>
.section-1 {
  flex: 0 0 50%;
}
.tab-header {
  flex: 0 0 8%;
}
.tab-items {
  flex-grow: 1;
  background-color: transparent;
  min-width: 600px;
}
.tab-item {
  background-color: transparent;
}
.order-list-wrapper {
  flex-grow: 1;
}
.section-2 {
  flex: 0 0 50%;
}
.search-input {
  width: 250px;
}
</style>