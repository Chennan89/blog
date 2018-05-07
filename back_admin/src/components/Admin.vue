<template>
    <div style="height:100%;">
      <admin-layout />
    </div>
  </template>

<script>
import AdminLayout from './layout.vue';

export default {
  name: 'Admin',
  data () {
    return {
      msg: 'Admin'
    }
  },
  components:{AdminLayout}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
