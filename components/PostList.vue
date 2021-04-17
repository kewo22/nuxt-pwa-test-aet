<template>
  <ul v-if="posts.length">
    <li v-for="post in posts" v-bind:key="`${post.id}${Date.now()}`">
      {{ post.body }}
    </li>
  </ul>
</template>

<script>
export default {
    props: [
        'posts'
    ]
}
</script>