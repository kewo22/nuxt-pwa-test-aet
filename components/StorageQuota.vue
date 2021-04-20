<template>
  <span>({{ quota.size }}{{ quota.unit }})</span>
</template>

<script>
const calculateStorageQuota = (dataSet) => {
  console.log(`CALC:`, dataSet);

  let size = 0;
  let unit = "bytes";
  return { size, unit };
};

export default {
  props: ["data"],
  computed: {
    quota() {
      return calculateStorageQuota(this.$props.data);
      return { size: 0, unit: "MB" };
    },
  },
};
</script>