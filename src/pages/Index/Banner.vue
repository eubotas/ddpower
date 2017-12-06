
<template>
  <div class="banner">
    <swiper :list="demo01_list" @on-index-change="demo01_onIndexChange"></swiper>
  </div>
</template>

<script>
import { Swiper } from 'vux'
import img1 from '../../assets/img/banner/1.jpg'
import img2 from '../../assets/img/banner/2.jpg'
import img3 from '../../assets/img/banner/3.jpg'

const baseList = [{
  url: 'javascript:',
  img: img1,
}, {
  url: 'javascript:',
  img: img2,
}, {
  url: 'javascript:',
  img: img3,
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

    },
  },
  components: {
    Swiper
  }
}
</script>


<style scoped>

</style>
