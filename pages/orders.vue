<template>
  <div class="d-flex fill-height orders-wrapper">
    <div class="d-flex flex-column section-1 mr-2">
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
          <!-- <v-tab v-for="n in 3" :key="n"> Item {{ n }} </v-tab> -->
          <v-tab> New </v-tab>
          <v-tab> In Progress </v-tab>
          <v-tab> Finished </v-tab>
        </v-tabs>

        <v-tabs-items class="tab-items" v-model="tabs">
          <v-tab-item>
            <v-card flat>
              <v-card-text class="">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Exercitationem temporibus, placeat aspernatur accusamus est
                necessitatibus illum iure, mollitia quas a molestiae dolorem
                voluptatum unde non nulla odit tenetur pariatur molestias
                inventore velit. Sit vel atque enim. Reprehenderit repellendus
                amet voluptatibus esse a distinctio cum delectus eos consectetur
                asperiores iure, at nisi magnam quaerat explicabo harum quidem
                minus? Quo eveniet, placeat veniam doloribus doloremque, quae
                nisi cumque reiciendis inventore magnam aut eius debitis dolorum
                tempore dolorem et quos illum fugiat mollitia necessitatibus
                vitae nobis possimus amet consequatur? Iure dolore itaque, ab
                debitis error cumque impedit doloremque voluptatibus
                necessitatibus excepturi aliquid maiores saepe quas voluptates
                tenetur? Modi, laboriosam provident? Tempora sapiente ullam
                exercitationem atque ad cum porro. Laborum sint voluptatem, at
                placeat laboriosam cum quia quisquam suscipit explicabo a
                recusandae sapiente ipsam atque vitae ut dolores ratione illo
                totam officia est molestias perferendis corporis? Qui aut
                pariatur deserunt natus earum repudiandae eaque cum, dicta vel.
                Nam ea odio at iure nesciunt hic animi recusandae soluta eum ab
                dignissimos quo doloribus tenetur dolores alias harum, minima
                officiis laboriosam saepe quae rerum dolor et nihil voluptatem!
                Delectus, est iusto cupiditate assumenda accusamus, unde cum
                doloribus veritatis modi atque eum! Cumque explicabo quibusdam
                quasi quas!
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Exercitationem temporibus, placeat aspernatur accusamus est
                necessitatibus illum iure, mollitia quas a molestiae dolorem
                voluptatum unde non nulla odit tenetur pariatur molestias
                inventore velit. Sit vel atque enim. Reprehenderit repellendus
                amet voluptatibus esse a distinctio cum delectus eos consectetur
                asperiores iure, at nisi magnam quaerat explicabo harum quidem
                minus? Quo eveniet, placeat veniam doloribus doloremque, quae
                nisi cumque reiciendis inventore magnam aut eius debitis dolorum
                tempore dolorem et quos illum fugiat mollitia necessitatibus
                vitae nobis possimus amet consequatur? Iure dolore itaque, ab
                debitis error cumque impedit doloremque voluptatibus
                necessitatibus excepturi aliquid maiores saepe quas voluptates
                tenetur? Modi, laboriosam provident? Tempora sapiente ullam
                exercitationem atque ad cum porro. Laborum sint voluptatem, at
                placeat laboriosam cum quia quisquam suscipit explicabo a
                recusandae sapiente ipsam atque vitae ut dolores ratione illo
                totam officia est molestias perferendis corporis? Qui aut
                pariatur deserunt natus earum repudiandae eaque cum, dicta vel.
                Nam ea odio at iure nesciunt hic animi recusandae soluta eum ab
                dignissimos quo doloribus tenetur dolores alias harum, minima
                officiis laboriosam saepe quae rerum dolor et nihil voluptatem!
                Delectus, est iusto cupiditate assumenda accusamus, unde cum
                doloribus veritatis modi atque eum! Cumque explicabo quibusdam
                quasi quas!
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Exercitationem temporibus, placeat aspernatur accusamus est
                necessitatibus illum iure, mollitia quas a molestiae dolorem
                voluptatum unde non nulla odit tenetur pariatur molestias
                inventore velit. Sit vel atque enim. Reprehenderit repellendus
                amet voluptatibus esse a distinctio cum delectus eos consectetur
                asperiores iure, at nisi magnam quaerat explicabo harum quidem
                minus? Quo eveniet, placeat veniam doloribus doloremque, quae
                nisi cumque reiciendis inventore magnam aut eius debitis dolorum
                tempore dolorem et quos illum fugiat mollitia necessitatibus
                vitae nobis possimus amet consequatur? Iure dolore itaque, ab
                debitis error cumque impedit doloremque voluptatibus
                necessitatibus excepturi aliquid maiores saepe quas voluptates
                tenetur? Modi, laboriosam provident? Tempora sapiente ullam
                exercitationem atque ad cum porro. Laborum sint voluptatem, at
                placeat laboriosam cum quia quisquam suscipit explicabo a
                recusandae sapiente ipsam atque vitae ut dolores ratione illo
                totam officia est molestias perferendis corporis? Qui aut
                pariatur deserunt natus earum repudiandae eaque cum, dicta vel.
                Nam ea odio at iure nesciunt hic animi recusandae soluta eum ab
                dignissimos quo doloribus tenetur dolores alias harum, minima
                officiis laboriosam saepe quae rerum dolor et nihil voluptatem!
                Delectus, est iusto cupiditate assumenda accusamus, unde cum
                doloribus veritatis modi atque eum! Cumque explicabo quibusdam
                quasi quas!
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>

    <div class="section-2 ml-2">
      <OrderDetails v-if="selectedOrder" :order="selectedOrder" />
      <NoOrder v-else />
      <!-- <v-icon style="color: black">mdi-format-list-bulleted</v-icon>
      <p class="pa-0 ma-0">NO ORDERS SELECTED</p>
      <small>Select an order from the queue on the left</small> -->
    </div>
  </div>
</template>

<script>
import OrderDetails from "~/components/orders/OrderDetails.vue";
import NoOrder from "~/components/orders/NoOrder.vue";

export default {
  components: { OrderDetails, NoOrder },
  data() {
    return {
      tabs: null,
      selectedOrder: null,
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const orders = await this.$axios.$get("http://localhost:3004/orders");
      this.selectedOrder = orders.orders[0];
    },
  },
};
</script>

<style scoped>
.orders-wrapper {
  width: 100%;
}
.section-1 {
  flex: 1 0 50%;
}
.tab-header {
  flex: 0 0 8%;
}
.tab-items {
  flex-grow: 1;
  background-color: transparent;
}
.tab-item {
  background-color: transparent;
}
.order-list-wrapper {
  flex-grow: 1;
}
.section-2 {
  flex: 1 0 50%;
  background: aliceblue;
  color: black;
}
.search-input {
  width: 250px;
}
</style>