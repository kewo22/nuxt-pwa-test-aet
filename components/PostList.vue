<template>
  <ul v-if="posts.length" class="overflow">
    <li v-for="post in posts" :key="`${post.id}${Date.now()}`">
      {{ post.body }}
    </li>
  </ul>
</template>

<style>
.overflow {
  margin-top: 20px;
  overflow: auto;
  max-height: 60vh;
}
</style>

<script>
export default {
  props: ["posts"],
};
</script>