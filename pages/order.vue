<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs1 sm1 md1>
        <v-row align="center" justify="center" style="height:100vh">
          <v-col
            cols="12"
            lg="6"
            md="6"
            class="fill-height d-flex flex-column justify-center align-center"
          >
            left
          </v-col>
        </v-row>
      </v-flex>
      <v-flex xs11 sm11 md11>
        <v-layout>
          <v-flex xs6 sm6 md6>
            <v-row align="center" justify="center" style="height:100vh">
              <v-col
                cols="12"
                lg="6"
                md="6"
                class="fill-height d-flex flex-column justify-center align-center"
              >
                order queue
              </v-col>
            </v-row>
          </v-flex>
          <v-flex xs6 sm6 md6>
            <v-row align="center" justify="center" style="height:100vh">
              <v-col
                cols="12"
                lg="6"
                md="6"
                class="fill-height d-flex flex-column justify-center align-center"
              >
                selected order
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
