import { createRouter, createWebHashHistory } from 'vue-router'


import LiteratureTable from "../components/LiteratureTable";
import PdfView from "../components/PdfView";
// import IndexView from "../components/IndexView";
import uploadView from "@/components/uploadView";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // {
        //     path: '/',
        //     name: 'IndexView',
        //     component: IndexView
        // },
        {
            path: '/',
            name: 'LiteratureTable',
            component: LiteratureTable
        },
        {
            path: '/pdf',
            name: 'pdf',
            component: PdfView
        },
        {
            path: '/upload',
            name: 'pduploadf',
            component: uploadView
        },

    ]
});

export default router;