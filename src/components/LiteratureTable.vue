<template>
    <!--  导航  -->
    <IndexView title_="文献查询"></IndexView>

    <div class="literatureTable-div">
        <div class="category-div">
            <div
                v-for="item in categoryList"
                :key="item.id"
                @click="categoryClick(item.id)"
                :class="{ active: activeID === item.id }"
            >
                {{ item.name }}
                <el-tag>{{ item.count }}</el-tag>
            </div>
            <el-button type="primary" @click="addCategory">
                添加类别
                <el-icon class="el-icon--right">
                    <CirclePlus/>
                </el-icon>
            </el-button>

        </div>
        <div class="right-div">
            <!-- 搜索 -->
            <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="Please input"
                @select="handleSelect"
            />

            <!-- 跳转到添加页面 -->
            <!--            -->
            <el-button type="primary" @click="uploadFile">
                上传
                <el-icon class="el-icon--right">
                    <Upload/>
                </el-icon>
            </el-button>
            <el-button type="primary" @click="downloadFile">
                下载
                <el-icon class="el-icon--right">
                    <Download/>
                </el-icon>
            </el-button>
            <el-button type="primary" @click="deleteFile">
                删除
                <el-icon class="el-icon--right">
                    <Delete/>
                </el-icon>
            </el-button>

            <!-- 详细列表 -->
            <div class="category-table-div">
                <el-table
                    class="category-table"
                    header-cell-class-name="category-table-header"
                    :data="tableList"
                    border
                    stripe
                    :row-key="getRowKey"
                    @cell-click="tableCellClick"
                    @select="tableRowClick"
                    @select-all="tableAllSelect"
                >
                    <!--                    @row-click="tableRowClick"-->
                    <!--                    <el-table-column-->
                    <!--                        type="index"-->
                    <!--                        label="No."-->
                    <!--                        :width="70"-->
                    <!--                    />-->
                    <el-table-column type="selection" label="No." :width="70">
                        <!--                        <el-checkbox @change="changeCheck()"/>-->
                    </el-table-column>
                    <el-table-column sortable prop="name" label="名称" width=""/>
                    <el-table-column
                        sortable
                        prop="influence_factory"
                        label="影响因子"
                        width="120"
                    />
                    <el-table-column sortable prop="flag" label="是否已读" width="120"/>
                    <el-table-column prop="remarks" label="备注" width=""/>
                </el-table>
                <el-pagination
                    background
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :pageSize="pageSize"
                    :current-page="page"
                    :total="literatureList.length"
                    @current-change="currentChange"
                />
            </div>
        </div>
        <upload-view
            v-if="uploadVis"
            class="upload-div"
            :categoryId="activeID"
        ></upload-view>
    </div>
</template>


<script>
import axios from "axios";
import {service} from "@/assets/js/request";
import IndexView from "@/components/IndexView";
// import { ElMessageBox } from "element-plus";

import UploadView from "@/components/uploadView";
import {Upload, Delete, Download, CirclePlus} from "@element-plus/icons-vue";

export default {
    name: "LiteratureTable",
    components: {
        IndexView,
        Upload,
        Delete,
        Download,
        CirclePlus,
        "upload-view": UploadView,
    },
    data() {
        return {
            activeID: "", // 当前激活的id
            pageSize: 10, // 每页最大数量
            page: 1, // 当前页书
            categoryList: [], // 文献类别列表
            literatureList: [], // 文献列表
            tableList: [], // 当前页文献
            selectList: [], // 选择的列表
            uploadVis: false, // 上传显隐
        };
    },
    methods: {
        // 添加文献类别
        addCategory() {

        },
        // 删除
        deleteFile() {
            // 删除地址
            let store = this.$store.state;
            // let url = store.url + store.api.deleteLiterature.addr;
            let url = store.api.deleteLiterature.addr;

            // 待处理id
            let ids = this.selectList.join(",");
            console.log(JSON.stringify({id: ids}));
            var data = JSON.stringify({id: ids});
            // // 请求接口
            // axios({
            //     method: "post",
            //     url: url,
            //     data: {id: ids}
            // }).then(res => {
            //     console.log(res);
            // })
            if (this.selectList.length == 0) {
                return
            }
            axios.post(url, data).then((response) => {
                console.log(response);
                if (response.data.success) {
                    alert("删除成功");
                    location.reload();
                } else {
                    alert(response.data.msg);
                }
            });
        },
        // 下载
        downloadFile() {
            // 下载地址
            let store = this.$store.state;
            // let url = store.url + store.api.downloadLiterature.addr;
            let url = store.api.downloadLiterature.addr;

            // 待处理id
            let ids = this.selectList.join(",");

            axios
                .get(url + "?id=" + ids, {
                    responseType: "blob",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                    },
                })
                .then((res) => {
                    var content = res.headers["content-disposition"];
                    var index = content.indexOf("=");

                    var fileName = content.substring(index + 2, content.length - 1);
                    fileName = decodeURI(fileName);
                    let blob = new Blob([res.data]); // res为接口返回的数据,此时接口返回的是blob格式的数据
                    let link = document.createElement("a");
                    link.download = fileName;
                    link.href = URL.createObjectURL(blob); // 文件流生成的url
                    document.body.appendChild(link);
                    link.click(); // 模拟按钮点击
                    URL.revokeObjectURL(link.href); // 释放URL对象
                    document.body.removeChild(link); // 移除a标签
                });
        },
        // 获得行id
        getRowKey(row) {
            return row.id;
        },

        // 全选
        tableAllSelect(selection) {
            selection.map(item => {
                this.selectList.push(item.id);
            });
        },
        // 单击选中一行或者取消选中
        tableRowClick(selection, row) {
            if (selection.length !== 0) {
                this.selectList.push(row.id);
            } else {
                this.selectList = this.selectList.filter((item) => item !== row.id);
            }
        },

        // 上传文件
        uploadFile() {
            this.uploadVis = true;
            //   let id = this.activeID;
            //   this.$router.push({ path: "/upload", query: { categoryId: id } });
        },

        // 切换文献类别
        categoryClick(item) {
            // 切换类别
            this.activeID = item;
            // 获取列表
            this.getList();
        },
        // 浏览pdf
        tableCellClick(row, column, cell, event) {
            console.log(row, column, cell, event);
            if (column.property === "name") {
                // 新窗口打开pdf 预览
                const {href} = this.$router.resolve({
                    name: "pdf",
                    query: {url: row.filepath},
                });
                window.open(href, "_blank");
            }
        },
        // 分页选择
        currentChange(page) {
            // 页面改变
            this.page = page;
            let start = (page - 1) * this.pageSize;
            let end = page * this.pageSize;
            this.tableList = this.literatureList.slice(start, end);
        },
        // 请求文献类别
        getCategoryList() {
            let store = this.$store.state;
            // let url = store.url + store.api.queryCategory.addr;
            let url = store.api.queryCategory.addr;
            let that = this;
            service.get(url).then((response) => {
                if (response.success) {
                    that.categoryList = response.data;
                    if (that.categoryList.length > 0) {
                        that.activeID = this.categoryList[0].id;
                    }
                    that.getList();
                }
            });
        },
        // 请求文献列表
        getList() {
            // 获取接口信息
            let store = this.$store.state;
            // 查询文献所有类别以及类别的数量
            // let url = store.url + store.api.queryList.addr;
            let url = store.api.queryList.addr;
            let that = this;

            // 请求接口
            service
                .get(url, {
                    params: {
                        id: this.activeID,
                        page: this.page,
                    },
                })
                .then((response) => {
                    console.log(response);
                    // 请求成功后返回数据
                    if (response.success) {
                        that.literatureList = response.data;
                        this.page = 1;
                        let start = (this.page - 1) * this.pageSize;
                        let end = this.pageSize;
                        this.tableList = this.literatureList.slice(start, end);
                    }
                });
        },
    },

    mounted() {
        // 获取文献类别
        this.getCategoryList();
    },
};
</script>

<style scoped>
.literatureTable-div {
    position: absolute;
    width: 100%;
    max-height: calc(100% - 60px);
    height: calc(100% - 60px);
}

#categoryTitle {
    text-align: center;
    display: table-cell;
}

.category-div {
    width: 200px;
    float: left;
    /*position: relative;*/
    /*height: 100%;*/
}

.category-div div {
    height: 40px;
    border: 1px solid #eee;
    line-height: 40px;
    padding: 10px;
    cursor: pointer;
}

.category-div div.active,
.category-div div:hover {
    background: #2293f6;
}

.right-div {
    background: #eee;
    float: right;
    width: calc(100% - 200px);
    max-height: calc(100%);
    height: calc(100%);
    margin: 0px;
}

.category-table-div {
    margin: 10px;
}

.category-table {
}

::v-deep .category-table-header {
    background-color: #2293f6 !important;
    color: #fff;
}

/*  上传样式 */
.upload-div {
    position: absolute;
    left: 25%;
    top: 100px;
    z-index: 200;
    background: #fff;
    width: 50%;
    border: 1px solid #333;
    border-radius: 5px;
    box-shadow: 3px 3px 3px #eee;
}
</style>
