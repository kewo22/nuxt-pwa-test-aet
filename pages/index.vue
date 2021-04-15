<template>
  <div ref="full_scr">
    <div class="container">
      <div>
        <h1 class="title">
          {{ hello }}
        </h1>
        <div>
          Local Storage Used Capacity
          {{ capacity.localStorage }}
        </div>
        <button v-if="!isFullScreen" @click="goFullScreen()">
          Go fullscreen
        </button>
        <button v-else @click="exitFullscreen()">Exit Fullscreen</button>
        <button @click="fetchData()">Fetch Data</button>
        <br />
        <button @click="saveToLocalStorage()">
          Save Data to Local Storage
        </button>
        <button @click="appendDataToLocalStorage()">
          Append Data to Local Storage
        </button>
        <br />
        <button @click="saveToIndexedDB()">Save Data to IndexedDB</button>
        <button @click="appendDataToIndexedDB()">
          Append Data to IndexedDB
        </button>
        <br />
        <ul v-if="posts.length">
          <li v-for="post in posts" v-bind:key="post.id">{{ post.body }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
(async () => {
  const workbox = await window.$workbox;
  if (workbox) {
    console.log(`workbox loaded`);
    workbox.addEventListener("installed", (event) => {
      console.log(`workbox SW loaded`);
      // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
      if (event.isUpdate) {
        console.log(`workbox SW:EVT:Updated`);
        // whatever logic you want to use to notify the user that they need to refresh the page.
      }
    });
  }
})();

export default {
  data() {
    return {
      hello: "Vue PWA test",
      posts: [],
      localStoragePosts: [],
      indexedDBPosts: [],
      isFullScreen: false,
      // capacity: {
      //   localStorage: 0,
      // },
    };
  },
  computed: {
    capacity() {
      return {
        localStorage: this.localStoragePosts.length,
      };
    },
  },
  methods: {
    goFullScreen() {
      const comp = this;
      this.$refs.full_scr
        .requestFullscreen()
        .then(function () {
          // element has entered fullscreen mode successfully
          comp.isFullScreen = true;
        })
        .catch(function (error) {
          // element could not enter fullscreen mode
          // error message
          console.error(error.message);
        });
    },
    exitFullscreen() {
      const comp = this;

      document
        .exitFullscreen()
        .then(function () {
          comp.isFullScreen = false;
          // element has exited fullscreen mode
        })
        .catch(function (error) {
          // element could not exit fullscreen mode
          // error message
          console.error(error.message);
        });
    },
    fetchData() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((e) => e.json())
        .then((data) => {
          this.posts = data;
        });
    },
    saveToLocalStorage() {
      localStorage.setItem("posts-data", JSON.stringify(this.posts));
    },
    appendDataToLocalStorage() {
      const prevPosts = JSON.parse(localStorage.getItem("posts-data"));
      // debugger;
      console.log(`LOCAL STORAGE: Prev Posts: ${prevPosts.length}`, prevPosts);
      const newPosts = prevPosts.concat(this.posts);
      localStorage.setItem("posts-data", JSON.stringify(newPosts));
      console.log(`LOCAL STORAGE: New Post List: ${newPosts.length}`, newPosts);
    },
    saveToIndexedDB() {
      this.$idb.set("posts-data", this.posts);
    },
    appendDataToIndexedDB() {
      const prevPosts = this.$idb.get("posts-data");
      // this.$idb.set("posts-data", );
    },
    loadStoredData() {
      this.localStoragePosts = JSON.parse(localStorage.getItem("posts-data"));
    },
  },
  mounted() {
    // this.fetchData();
    this.loadStoredData();
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.title:fullscreen {
  color: white;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
