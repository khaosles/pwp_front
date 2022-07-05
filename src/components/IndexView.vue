<template>
    <el-menu
        :default-active="activeIndex"
        class="menu"
        mode="horizontal"
        :router="true"
        :ellipsis="false"
        active-text-color="#2293f6"
        @select="handleSelect"
    >
        <el-menu-item index="">
            <img src="../../public/icon.jpg" class="logo" alt="">
            <a> {{ title_ }}</a>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="">首页</el-menu-item>
        <el-menu-item index="/">文献</el-menu-item>
        <el-menu-item index="">关于</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: "IndexView",
    props: {
        title_: {
            type: String,
            default: "lalala",
        }
    },
    data() {
        return {
            activeIndex: "/",
        }
    },
    methods: {
        handleSelect(index) {
            this.activeIndex = index;
        }
    },

}
</script>

<style>
.flex-grow {
    flex-grow: 1;
}

.menu {
    background: #f6f5f1;
}

.logo {
    width: 28px;
    height: 28px;
    text-align: center;
    margin: 15px 10px 10px 30px;
}

</style>
