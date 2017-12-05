
<template>
  <div class="banner">
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
  </div>
</template>

<script>
import { Swiper } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: ''
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: ''
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg',
  title: '',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]

const demoList = baseList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))

export default {
  name: 'banner',
  data () {
    return  {
      demo01_list: baseList,
    }
  },
  methods: {
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    },
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
  },
  components: {
    Swiper
  }
}
</script>


<style scoped>

</style>
