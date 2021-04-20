<template>
  <span>({{ quota.size }}{{ quota.unit }})</span>
</template>

<script>
import * as sizeof from "object-sizeof";

const ONE_MEG = 1000000;

const calculateStorageQuota = (dataSet) => {
  const byteSize = sizeof(dataSet);
  const size = formatToMB(byteSize);
  let unit = "";
  return { size, unit };
};

/* Format the number into something nice if possible */
function formatToMB(val) {
  const opts = {
    maximumFractionDigits: 10,
  };
  let result;
  try {
    result = new Intl.NumberFormat("en-us", opts).format(val / ONE_MEG);
  } catch (ex) {
    result = Math.round(val / ONE_MEG);
  }
  return `${result} MB`;
}

export default {
  props: ["data"],
  computed: {
    quota() {
      //   navigator.storage
      //     .estimate()
      //     // .then((quota) => {})
      //     .then(console.log)
      //     .catch(console.error);
      return calculateStorageQuota(this.$props.data);
    },
  },
};
</script>