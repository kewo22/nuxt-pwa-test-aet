<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center" justify="center">
        <v-avatar color="white" size="10em">
          <v-icon class="no-order" color="black">
            mdi-format-list-bulleted-square
          </v-icon>
        </v-avatar>
        <br />
        <h2 class="black--text text--darken-1 mt-4">NO ORDER SELECTED</h2>
        <h4 class="mt-1" style="color: #a0a2a7">
          Select an order from the queue on the left
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.no-order {
  font-size: 5em;
}
</style>