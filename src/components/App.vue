<template>
  <div :class="$options.name">
    <layout-default>
      <router-view/>
    </layout-default>
  </div>
</template>

<script>
import LayoutDefault from './layout/LayoutDefault.vue';

export default {
  name: `App`,
  components: {
    LayoutDefault
  }
};
</script>

<style lang="scss">
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import '../scss/style';
</style>
