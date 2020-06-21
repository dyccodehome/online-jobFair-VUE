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
        name: "recruit",
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
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '昵称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '昵称',
                        key: 'sex',
                        align: 'center',

                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        align: 'center',
                        filters: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 2
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value,row){
                            if(value === 1){
                                return row.sex === 0;
                            }else if (value === 2){
                                return row.sex === 1;
                            }
                        },
                        render:(h,params) => {
                            const text = params.row.sex == 0 ? "男" : "女"
                            return h('div',text)
                        },
                    },
                    {
                        title: '注册时间',
                        key: 'createTime',
                        width: 200,
                        render:(h,params)=>{
                            let date = getDate(params.row.createTime,'yyyy-MM-dd hh:mm:ss');
                            return h('div',date)
                        },
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:150,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                on: {
                                    click: () => {
                                        this.delete(params);
                                    }
                                }
                            }, '删除')
                            ]);
                        }
                    }
                ],

                formItem:{
                    'Id': 0,
                    'sex': 0,
                    'name': '',
                    'phone': '',
                    'age': '',
                },
                
            }
        },

        methods: {
            // 数据初始化、
            init() {
                axios.get('http://localhost:8080/sys/api/queryApplicant',{
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

            //模态框显示
            showAddModel(){
                this.editModal = true;
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

            delete(params) { // 删除
                let pkIds = params.row.id;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要删除么</p>',
                    onOk: () => {
                        axios.get('http://localhost:8080/sys/api/delApplicant',{
                            params:{
                                pkId:pkIds
                            }
                        })
                        .then(({data}) => {
                            if (data && data.errCode === 0) {
                                this.$Message.success({
                                    content: getMsg(data.errCode), onClose: () => {
                                        this.init();
                                    }
                                });
                            } else {
                                this.$Message.error(data.errMsg);
                            }
                        }).catch(() => {
                                        this.init();
                        });
                    },
                    onCancel: () => {

                    }
                });
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
