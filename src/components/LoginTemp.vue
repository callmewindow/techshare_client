<template>
  <el-card>
    <Navigator login="yes" />
  </el-card>
</template>

<script>
  import Navigator from "@/components/Navigator";
  export default {
    name: "LoginTemp",
    components: {
      Navigator,
    },
  }
</script>

<style scoped>

</style>
