<template>
  <div>
    <label>错误描述：</label>
    <tinymce v-model="content" :height="300" :width="800" />
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'Record',
  components: { Tinymce },
  props: {},
  data() {
    return {
      content: ''
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
</style>
