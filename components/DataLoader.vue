<template>
  <div ref="full_scr">
    <div class="container">
      <div>
        <h1 class="title">
          {{ hello }}
        </h1>
        <div>
          Fetched Posts Count
          {{ posts.length }}
          <storage-quota :data="posts" />
        </div>
        <hr />
        <div>
          Local Storage Posts Count
          {{ localStoragePosts.length }}
        </div>
        <div>
          Indexed DB Posts Count
          {{ indexedDBPosts.length }}
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
        <PostList :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hello: "Vue PWA test",
      posts: [],
      localStoragePosts: [],
      indexedDBPosts: [],
      isFullScreen: false,
    };
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
          this.posts = [...this.posts, ...data];
        });
    },
    saveToLocalStorage() {
      localStorage.setItem("posts-data", JSON.stringify(this.posts));
    },
    appendDataToLocalStorage() {
      const prevPosts = this.localStoragePosts;
      console.log(`LOCAL STORAGE: Prev Posts: ${prevPosts.length}`, prevPosts);
      const newPosts = [...prevPosts, ...this.posts];
      localStorage.setItem("posts-data", JSON.stringify(newPosts));
      this.localStoragePosts = newPosts;
      console.log(`LOCAL STORAGE: New Post List: ${newPosts.length}`, newPosts);
    },
    async saveToIndexedDB() {
      await this.$idb.set("posts-data", this.posts);
      this.indexedDBPosts = this.posts;
    },
    async appendDataToIndexedDB() {
      const prevPosts = this.indexedDBPosts;
      console.log(`IDB: Prev Posts: ${prevPosts.length}`, prevPosts);
      const newPosts = [...prevPosts, ...this.posts];
      await this.$idb.set("posts-data", newPosts);
      this.indexedDBPosts = newPosts;
      console.log(`IDB: New Post List: ${newPosts.length}`, newPosts);
    },
    async loadStoredData() {
      this.localStoragePosts =
        JSON.parse(localStorage.getItem("posts-data")) || [];
      this.indexedDBPosts = (await this.$idb.get("posts-data")) || [];
    },
  },
  mounted() {
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
  font-size: 3em;
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
