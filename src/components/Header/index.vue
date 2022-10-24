<template>
  <!-- 头部 -->
  <header class="header">
    <div>
      <b-nav tabs fill>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item>Link with a long name </b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  methods: {
    goSearch() {
      this.$router.push("/search");
    },
  },
};
</script>
