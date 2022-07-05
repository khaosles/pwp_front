<template>
  <div
    class="pdfjs"
    @mouseup='mouseUp'
  >
    <iframe
      id="myIframe"
      width="100%"
      frameborder="0"
      style="width: 100%; height: 100%;"
      v-if="src"
      :src="pdfSrc"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "PdfInfo",
  components: {

  },
  data () {
    return {
      // 参数展示pdf地址
      src1: "http://110.42.145.66:8801/data/literature/AOD/利用人工神经网络模式从气象卫星图像定量探测沙尘爆发期间的气溶胶光学厚度.pdf",
      src: 'http://110.42.145.66:5000/literature/pdf?filepath=/data/literature/AOD/%E5%9F%BA%E4%BA%8EFY-4A%E5%8D%AB%E6%98%9F%E6%95%B0%E6%8D%AE%E5%8F%8D%E6%BC%94%E6%B0%94%E6%BA%B6%E8%83%B6%E5%85%89%E5%AD%A6%E5%8E%9A%E5%BA%A6%E5%8F%8A%E5%88%86%E6%9E%90%E5%BA%94%E7%94%A8.pdf',
      // pdfjs模板
      viewerUrl: '/static/pdfjs/web/viewer.html',
      pdfSrc: '',
    };
  },

  methods: {
    loadPDF () {
      this.pdfSrc = `${this.viewerUrl}?file=${encodeURIComponent(this.src)}`

    },
    //document.getSelection().toString()
    f () {
      let vm = this;
      let iframe = document.getElementById('myIframe');
      let x = '';
      let y = '';
      let _x = '';
      let _y = '';
      // iframe 加载完成后执行并将双击事件过滤掉，因为双击事件可能也触发滑选，所以为了不误操作，将其剔除
      iframe.onload = function () {
        // 鼠标点击监听
        iframe.contentDocument.addEventListener('mousedown', function (e) {
          x = e.pageX;
          y = e.pageY;
        }, true);
        //鼠标抬起监听
        iframe.contentDocument.addEventListener('mouseup', function (e) {
          _x = e.pageX;
          _y = e.pageY;
          if (x === _x && y === _y) return; //判断点击和抬起的位置，如果相同，则视为没有滑选，不支持双击选中
          var choose = iframe.contentWindow.getSelection().toString();
          console.log(choose);
          vm.selectText = choose;
        }, true);
      }
    }


  },
  mounted: function () {
    console.log(this.pdfurl)
    let store = this.$store.state;
    let url = store.url + store.api.readPDF
    // this.src = 'http://110.42.145.66:5000/literature/pdf?filepath=' + this.$route.query.url
    this.src = url + '?filepath=' + this.$route.query.url

    this.loadPDF();
    this.f()
  },


};
</script>
<style  scoped>
.pdfjs {
  width: 100%;
  height: 90vh;
}
</style>