<template>
  <div :class="$options.name">
    <slot name="header">
      <Header></Header>
    </slot>
    <main :class="`${$options.name}__main`">
      <slot/>
    </main>
    <slot name="footer">
      <Footer></Footer>
    </slot>
  </div>
</template>

<script>
  import Header from '@/components/app/Header';
  import Footer from '@/components/app/Footer';
  export default {
    name: `LayoutDefault`,
    components: {
      Header,
      Footer
    }
  };
</script>

<style lang="scss" scoped>
</style>
