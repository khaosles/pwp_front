<template>
  <div class="pdfjs">
    <div class="pdf-div">
      <iframe
        id="myIframe"
        width="100%"
        frameborder="0"
        style="width: 100%; height: 100%"
        :src="pdfSrc"
      ></iframe>
    </div>
    <div class="translate-div">
      <div style="margin:10px">
        <!--            翻译引擎-->
        <el-select
          v-model="method"
          placeholder="翻译引擎"
          @change="changeTranslateMethod"
        >
          <el-option
            v-for="item in translateMethods"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <h3>【译文】</h3>
        <p>{{ dstText }}</p>
        <br />
        <br />
        <h3>【原文】</h3>
        <p>{{ srcText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { service } from "@/assets/js/request";

export default {
  name: "PdfView",

  data() {
    return {
      // pdfjs模板
      viewerUrl: "/static/pdfjs/web/viewer.html",
      src: "",
      pdfSrc: "",
      srcText: "",
      dstText: "",
      method: "bd",
      translateMethods: [
        {
          value: "bd",
          label: "百度翻译",
        },
        {
          value: "yd",
          label: "有道翻译",
        },
      ],
    };
  },
  mounted: function () {
    // 加载pdf
    let store = this.$store.state;
    // 读取pdf路径
    let url = store.api.readPDF.addr;
    this.src = url + "?filepath=" + this.$route.query.url;
    // 加载odf
    this.loadPDF();
    // 识别
    this.recognition();
  },
  methods: {
    loadPDF() {
      // 加载pdf
      this.pdfSrc = `${this.viewerUrl}?file=${encodeURIComponent(this.src)}`;
    },

    recognition() {
      // 识别pdf中文字
      let vm = this;
      let iframe = document.getElementById("myIframe");
      let x = "";
      let y = "";
      let _x = "";
      let _y = "";
      // iframe 加载完成后执行并将双击事件过滤掉，因为双击事件可能也触发滑选，所以为了不误操作，将其剔除
      iframe.onload = function () {
        // 鼠标点击监听
        iframe.contentDocument.addEventListener(
          "mousedown",
          function (e) {
            x = e.pageX;
            y = e.pageY;
          },
          true
        );
        //鼠标抬起监听
        iframe.contentDocument.addEventListener(
          "mouseup",
          function (e) {
            _x = e.pageX;
            _y = e.pageY;
            if (x === _x && y === _y) return; //判断点击和抬起的位置，如果相同，则视为没有滑选，不支持双击选中
            var choose = iframe.contentWindow.getSelection().toString();
            vm.srcText = choose;
            vm.selectText = choose;
            // 翻译
            vm.translate();
          },
          true
        );
      };
    },

    // 翻译
    translate() {
      // 获取接口信息
      let store = this.$store.state;
      let url = store.api.translateText.addr;
      let that = this;
      service
        .get(url, {
          params: {
            txt: this.srcText,
            method: this.method,
          },
        })
        .then((response) => {
          if (response.success) {
            that.dstText = response.data;
          }
        });
    },

    // 改变翻译方式
    changeTranslateMethod(val) {
      this.method = val;
    },
  },
};
</script>
<style scoped>
.pdfjs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.pdf-div {
  float: left;
  width: 80%;
  height: 100%;
}

.translate-div {
  float: left;
  width: 20%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>