<template>
  <div class="root" ref="full_scr">
    <data-loader class="flex-1" />
    <data-viz class="flex-1" />
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
</script>

<style>
.root {
  display: flex;
}
.flex-1 {
  flex: 1;
}
</style>
