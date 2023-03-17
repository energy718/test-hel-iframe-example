<template>
  <div>测试子组件</div>
</template>

<script>
import lib from "hel-tpl-remote-lib";

export default {
  created() {
    console.log("lib", lib);
  },
};
</script>

<style>
</style>