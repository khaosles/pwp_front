<template>
    <div class="pdfDiv">
        12313
        <iframe
            id="displayPdfIframe"
            :src="defaultUrl"
        ></iframe>
<!--        <pdf-html></pdf-html>-->
    </div>
</template>

<script>
const pdfJS = require("pdfjs-dist");

pdfJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");
// import  pdfHtml from '../../static/pdfjs-2.14.305-dist/web/viewer.html'
export default {
    name: "PdfView",
    components: {
        // pdfHtml
    },
    data() {
        return {
            defaultUrl: '../../static/pdfjs-2.14.305-dist/web/viewer.html',
            url: "/Users/yherguot/Documents/AOD/FY-4A_AGRI陆地气溶胶光学厚度反演_谢艳清_.pdf",
        }
    }
}
</script>

<style scoped>
.pdfDiv{
    position: absolute;
    width: 100%;
    height: 100%;
}
iframe{
    width: 100%;
    height: 100%;
    border: 0px;
}
</style>