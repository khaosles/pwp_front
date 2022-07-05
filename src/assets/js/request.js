import axios from "axios"
// import router from '@/router'
// import Qs from "querystring"

// 创建axios实例
const service = axios.create({
    baseURL: "/",
    timeout: 10000,
    headers: {
        "Cache-Control": "no-cache", // "Content-Type": "application/json; charset=utf-8"
    },
})
service.interceptors.request.use((config) => {
    // console.log('config', config)
    // 是否需要设置 token
    // const isToken = (config.headers || {}).isToken === false

    // if (localStorage.getItem("token") && !isToken) {
    //     config.headers["token"] = localStorage.getItem("token") // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    if (config.method === "get" && config.params) {
        let url = config.url + "?"
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            var part = encodeURIComponent(propName) + "="
            if (value !== null && typeof value !== "undefined") {
                if (typeof value === "object") {
                    for (const key of Object.keys(value)) {
                        let params = propName + "[" + key + "]"
                        var subPart = encodeURIComponent(params) + "="
                        url += subPart + encodeURIComponent(value[key]) + "&"
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&"
                }
            }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
    }
    // console.log(config,7777777)
    return config
}, (error) => {
    // console.log(error)
    Promise.reject(error)
})

// response拦截器
service.interceptors.response.use((response) => {
    if (response.data.code == "401") {
        /* window.location.href = "/" */
        // router.replace({
        //     path: "/Login"
        // })
        localStorage.removeItem("token");
        // Message({
        //     message: res.msg,
        //     type: "error",
        // });
    }
    const res = response.data
        /*     console.log(res.code) */
    if (res.code == 501) {

        // Message({
        //     message: res.msg,
        //     type: "error",
        // });
        // router.replace({
        //     path: "/Login"
        // }).catch(err => err)
        // localStorage.removeItem("token");
    }
    return res
}, (error) => {
    // Message({
    //     message: error.message,
    //     type: "error",
    //     duration: 3 * 1000,
    // })
    return Promise.reject(error)
})

// 用于文件上传（不需要Qs.stringify,直接添加form-data就行）
const filereq = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
    },
})

// request拦截器
filereq.interceptors.request.use((config) => {
    // if (localStorage.getItem("token_s")) {
    //   let token = JSON.parse(localStorage.getItem("token_s"))
    //   config.headers.common["Authorization"] = "Bearer " + token
    //   // config.headers.common["userid"] = token.userid
    // }
    return config
}, (error) => {
    Promise.reject(error)
})

// response拦截器
filereq.interceptors.response.use((response) => {
    const res = response.data
    if (res && res.a !== "1" && res.a) {
        // Message({
        //     message: res.msg,
        //     type: "error",
        //     duration: 3 * 1000,
        // })
        return Promise.reject(new Error(res.msg || "Error"))
    } else {
        return res
    }

    // return res
}, (error) => {
    // Message({
    //     message: error.message,
    //     type: "error",
    //     duration: 3 * 1000,
    // })
    return Promise.reject(error)
})

const down = axios.create({
        baseURL: "/",
        timeout: 2000000,
        headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json;"
        },
        responseType: "blob", //重要
    })
    // 是否需要设置 token

down.interceptors.request.use((config) => {
    const isToken = (config.headers || {}).isToken === false

    if (localStorage.getItem("token") && !isToken) {
        config.headers["token"] = localStorage.getItem("token") // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (config.method === "get" && config.params) {
        let url = config.url + "?"
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            var part = encodeURIComponent(propName) + "="
            if (value !== null && typeof value !== "undefined") {
                if (typeof value === "object") {
                    for (const key of Object.keys(value)) {
                        let params = propName + "[" + key + "]"
                        var subPart = encodeURIComponent(params) + "="
                        url += subPart + encodeURIComponent(value[key]) + "&"
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&"
                }
            }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
    }
    return config
}, (error) => {
    /*     console.log(error) */
    Promise.reject(error)
})
down.interceptors.response.use((response) => {
    console.log(response)
    var content = response.headers["content-disposition"];
    var index = content.indexOf("=");

    var fileName = content.substring(index + 2, content.length - 1);
    const blob = new Blob([response.data]) //处理文档流
        // let fileName = null
        // if (filgeshi) {
        //     fileName = filmz + filgeshi //文件名
        // } else {
        //     fileName = filmz + ".xlsx" //文件名
        // }
        /*    const fileName = new Date().getTime() + ".xlsx"//文件名  */
    const elink = document.createElement("a")
    elink.download = fileName
    elink.style.display = "none"
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
}, (error) => {
    // Message({
    //     message: error.message,
    //     type: "error",
    //     duration: 3 * 1000,
    // })
    return Promise.reject(error)
})
const downExe = axios.create({
        baseURL: "/",
        timeout: 2000000,
        headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json; charset=utf-8"
        },
        responseType: "blob", //重要
    })
    // 是否需要设置 token

downExe.interceptors.request.use((config) => {
    const isToken = (config.headers || {}).isToken === false

    if (localStorage.getItem("token") && !isToken) {
        config.headers["token"] = localStorage.getItem("token") // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (config.method === "get" && config.params) {
        let url = config.url + "?"
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            var part = encodeURIComponent(propName) + "="
            if (value !== null && typeof value !== "undefined") {
                if (typeof value === "object") {
                    for (const key of Object.keys(value)) {
                        let params = propName + "[" + key + "]"
                        var subPart = encodeURIComponent(params) + "="
                        url += subPart + encodeURIComponent(value[key]) + "&"
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&"
                }
            }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
    }
    return config
}, (error) => {
    /*     console.log(error) */
    Promise.reject(error)
})

downExe.interceptors.response.use((response) => {
    /*     console.log(response, 1233) */
    const blob = new Blob([response.data]) //处理文档流
    var now = getNowFormatDate();

    const fileName = "保险单" + now + ".xlsx" //文件名
    const elink = document.createElement("a")
    elink.download = fileName
    elink.style.display = "none"
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
}, (error) => {
    // Message({
    //     message: error.message,
    //     type: "error",
    //     duration: 3 * 1000,
    // })
    return Promise.reject(error)
})

function getNowFormatDate() {
    var date = new Date();
    var strMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHour = date.getHours();
    var strMin = date.getMinutes();
    var strSec = date.getSeconds();
    if (strMonth >= 1 && strMonth <= 9) {
        strMonth = "0" + strMonth;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour;
    }
    if (strMin >= 0 && strMin <= 9) {
        strMin = "0" + strMin;
    }
    if (strSec >= 0 && strSec <= 9) {
        strSec = "0" + strSec;
    }
    var currentdate = date.getFullYear() + '' + strMonth + '' + strDate + '' + strHour + '' + strMin + '' + strSec;
    return currentdate;
}

export {
    service,
    filereq,
    down,
    downExe
}