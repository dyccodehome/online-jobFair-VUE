 <template>
    <div>
        <Row style="margin-bottom: 10px;">
          <div style="float: right">
                <Input v-model="keywords" placeholder="请输入用户姓名" style="width: 200px"/>
                <span @click="searchInit" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
            </div>
        </Row>
        <Row>
            <Table border ref="selection" :columns="columns" :data="tableData" :highlight-row="true"
                   :current="pageIndex" :loading="loading"></Table>
        </Row>
        <Row style="margin-top: 10px;float: right;">
            <Page :total="totalCount" show-total :page-sise="pageSize" loading show-sizer @on-change="pageChange"
                  @on-page-size-change="sizeChange"></Page>
        </Row>
    </div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios'
    import { getDate } from "@/utils/date"
    
    export default {
        name: "biaoge",
        data(){
            return{
                loading: false,
                saveLoading: false,
                keywords: '',
                pageSize: 10,
                pageIndex: 1,
                totalCount: 0,
                tableData: [],
                color:'',
                text:'',
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '学历',
                        key: 'education',
                        align: 'center',
                        filters: [
                            {
                                label: '博士',
                                value: 6
                            },
                            {
                                label: '研究生',
                                value: 5
                            },
                            {
                                label: '大学',
                                value: 4
                            },
                            {
                                label: '高中',
                                value: 3
                            },
                            {
                                label: '初中',
                                value: 2
                            },
                            {
                                label: '小学',
                                value: 1
                            },
                            
                        ],
                        filterMultiple: false,
                        filterMethod (value,row){
                            if(value ===1){
                                return row.education === '小学';
                            }else if (value === 2){
                                return row.education === '初中';
                            }else if (value === 2){
                                return row.education === '高中';
                            }else if (value === 2){
                                return row.education === '大学';
                            }else if (value === 2){
                                return row.education === '研究生';
                            }else if (value === 2){
                                return row.education === '博士';
                            }
                        },
                    },
                    {
                        title: '民族',
                        key: 'folk',
                        align: 'center'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '手机号码',
                        key: 'phone',
                        align: 'center'
                    },
                    {
                        title: '毕业院校',
                        key: 'college',
                        align: 'center'
                    },
                    {
                        title: '优势',
                        key: 'advantage',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '求职期望',
                        key: 'expect',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '经历',
                        key: 'experience',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '证书',
                        key: 'credentials',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '个人主页',
                        key: 'blog',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime',
                        width:160,
                        render:(h,params)=>{
                            let date = getDate(params.row.updateTime,'yyyy-MM-dd hh:mm:ss');
                            return h('div',date)
                        },
                        align: 'center'
                    },
                ],
            }
        },

        methods: {
            // 数据初始化、
            init() {
                axios.get('http://localhost:8080/sys/api/queryResume',{
                    params:{
                     pageNum:this.pageIndex,
                     keywords:this.keywords
                    }
                }).then(({data}) => {
                this.tableData = data.data;
                this.totalCount = data.pageNum;
                }).catch(() => {
                    // this.$Message.success('连接失败，请检查网络！');
                });

            },  
            searchInit() {// 数据初始化、搜索
                this.pageChange(1);
            },
            //页数改变监听
            searchInit() {// 数据初始化、搜索
                this.pageChange(1);
            },
            pageChange (val) { //页数改变监听
                this.pageIndex = val;
                this.init();
            },

            //每页个数改变监听
            sizeChange(size) { 
                this.pageSize = size;
                this.init();
            },
        },

        activated() {
            this.init(); //初始化
        },

        mounted(){
            this.init(); //初始化
        }
    }
</script>

<style>

</style>
