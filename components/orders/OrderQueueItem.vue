<template>
  <v-btn
    style="
      width: 100%;
      background-color: #282e35;
      color: #babdbf;
      text-transform: none;
      height: 75px;
    "
  >
    <v-layout>
      <v-flex xs4 sm4 md2>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-img :aspect-ratio="16 / 9" width="100" :src="item.src"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md6>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="left" justify="center" style="color: #509ad8">
              {{ item.time }}
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md2>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              {{ item.orderId }}
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex xs4 sm4 md2>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              {{ item.count }}
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </v-btn>
</template>

<script>
export default {
  props: ["selectNewRecord", "item", "index", "selectedNewIndex"],
};
</script>