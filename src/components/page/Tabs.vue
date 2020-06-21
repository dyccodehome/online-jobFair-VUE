 <template>
    <div>
        <Row style="margin-bottom: 10px;">
            <div style="float: left">
                <span @click="showAddModel()" style="margin: 0 10px;"><Button type="primary"
                                                                                      icon="plus">新增企业</Button></span>
                <span @click="init"><Icon type="refresh" style="font-size: 20px;position: relative;top: 4px;margin-left: 5px;"></Icon></span>
            </div>
            <div style="float: right">
                <Input v-model="keywords" placeholder="请输入公司名称" style="width: 200px"/>
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

        <!--新增model-->
        <Modal  class="edit-container" v-model="editModal" :closable='true' :mask-closable=false :width="800">
            <h3 slot="header" style="color:#2D8CF0">新增企业</h3>
            <Form ref="formItem" :model="formItem" :label-width="100" label-position="right"
                   @submit.native.prevent="saveEdit">
                <Form-item label="税务号" prop="taxNumber">
                    <i-input v-model="formItem.taxNumber" placeholder="请输入税务号"></i-input>
                </Form-item>
                <Form-item label="公司名称" prop="name">
                    <i-input v-model="formItem.name" placeholder="请输入公司名称"></i-input>
                </Form-item>
                <Form-item label="联系电话" prop="phone">
                    <i-input v-model="formItem.phone" placeholder="请输入联系电话"></i-input>
                </Form-item>
                <Form-item label="经营范围" prop="scope">
                    <i-input v-model="formItem.scope" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入经营范围"></i-input>
                </Form-item>
                <Form-item label="企业法人" prop="leagalPerson">
                    <i-input v-model="formItem.leagalPerson" placeholder="请输入企业法人"></i-input>
                </Form-item>
                <Form-item label="公司地址" prop="address">
                    <i-input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入地址"></i-input>
                </Form-item>
                <Form-item label="注册资本" prop="registeredCapital">
                    <i-input v-model="formItem.registered_capital" placeholder="请输入注册资本"></i-input>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEdit('editForm')">取消</Button>
                <Button type="primary" :loading="saveLoading" @click="saveEdit('formItem')">保存</Button>
            </div>
        </Modal>
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
                        title: '税务号',
                        key: 'taxNumber',
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'name',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        align: 'center'
                    },
                    {
                        title: '企业法人',
                        key: 'leagalPerson',
                        align: 'center',
                    },
                    {
                        title: '经营范围',
                        key: 'scope',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '地址',
                        key: 'address',
                        align: 'center',
                    },
                    {
                        title: '注册资本',
                        key: 'registeredCapital',
                        align: 'center',
                        width: 200,
                    },
                    {
                        title: '成立时间',
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
                    'taxNumber': '',
                    'name': '',
                    'phone': '',
                    'address': '',
                    'leagalPerson':'',
                    'scope':'',
                    'registeredCapital':'',
                },

                 /*模态框信息*/
                editModal:false,
                editForm:{
                    'Id': 0,
                    'taxNumber': '',
                    'name': '',
                    'phone': '',
                    'address': '',
                    'leagalPerson':'',
                    'scope':'',
                    'registeredCapital':'',
                },
            }
        },

        methods: {
            // 数据初始化、
            init() {
                axios.get('http://localhost:8080/sys/api/queryCompany',{
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

            saveEdit() {
                this.saveLoading = true;
                axios.post('http://localhost:8080/sys/api/addCompany',{
                        'Id': 0,
                        'taxNumber': this.formItem.taxNumber,
                        'name': this.formItem.name,
                        'phone': this.formItem.phone,
                        'address': this.formItem.address,
                        'leagalPerson':this.formItem.leagalPerson,
                        'scope':this.formItem.scope,
                        'registeredCapital':this.formItem.registered_capital,
                    },{headers:{'Content-Type': 'application/json; charset=utf-8'},dataType:"json",}).then(({data}) => {
                        alert('创建成功');
                    }).catch(() => {
                        this.saveLoading = false;
                        this.$Message.error('连接失败，请检查网络！');
                });
            },

            delete(params) { // 删除
                let pkIds = params.row.id;
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要删除么</p>',
                    onOk: () => {
                        axios.get('http://localhost:8080/sys/api/delCompany',{
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
