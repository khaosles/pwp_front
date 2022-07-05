import Vuex from 'vuex'


// 接口信息
const store = new Vuex.Store({
    state: {
        // 基础url
        url: "http://110.42.145.66:5000",
        // url: "http://127.0.0.1",
        // 端口
        // port: "5000",
        // port: "8000",
        // 接口地址
        api: {
            queryCategory: {
                // 查询所有类别
                addr: "/literature/category",
                method: "get",
            },
            queryList: {
                // 查询一个类别所有文献
                addr: "/literature/list",
                method: "get",
            },
            queryDetail: {
                // 查询文献细节
                addr: "/literature/detail",
                method: "get",
            },
            downloadLiterature: {
                // 下载文献
                addr: "/literature/download",
                method: "get",
            },
            translateText: {
                // 翻译文本
                addr: "/literature/translate",
                method: "get",
            },
            readPDF: {
                // 翻译文本
                addr: "/literature/pdf",
                method: "get",
            },
            addCategory: {
                // 添加文献类别
                addr: "/literature/category",
                method: "post",
            },
            uploadLiterature: {
                // 上传文献
                addr: "/literature/upload",
                method: "post",
            },
            deleteLiterature: {
                // 删除文献
                addr: "/literature/delete",
                method: "post",
            },
        }
    }
});


export default store;