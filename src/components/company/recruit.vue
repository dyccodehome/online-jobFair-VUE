 <template>
    <div>
        <Row style="margin-bottom: 10px;">
            <div style="float: left">
                <span @click="showAddModel()" style="margin: 0 10px;"><Button type="primary"
                                                                                      icon="plus">发布招聘</Button></span>
                <span @click="init"><Icon type="refresh" style="font-size: 20px;position: relative;top: 4px;margin-left: 5px;"></Icon></span>
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
            <h3 slot="header" style="color:#2D8CF0">发布招聘</h3>
            <Form ref="formItem" :model="formItem" :label-width="100" label-position="right"
                   @submit.native.prevent="saveEdit">
                <Form-item label="标题" prop="title">
                    <i-input v-model="formItem.title" placeholder="请输入标题"></i-input>
                </Form-item>
                <Form-item label="具体要求" prop="details">
                    <i-input v-model="formItem.details" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入具体要求"></i-input>
                </Form-item>
                <Form-item label="联系电话" prop="phone">
                    <i-input v-model="formItem.phone" placeholder="请输入联系电话"></i-input>
                </Form-item>
                <Form-item label="学历要求" prop="education">
                    <i-select v-model="formItem.education" placeholder="请选择">
                        <i-option value='小学'>小学</i-option>
                        <i-option value='初中'>初中</i-option>
                        <i-option value='高中'>高中</i-option>
                        <i-option value='大学'>大学</i-option>
                        <i-option value='研究生'>研究生</i-option>
                        <i-option value='博士'>博士</i-option>
                    </i-select>
                </Form-item>
                <Form-item label="薪水" prop="salary">
                    <i-input v-model="formItem.salary" placeholder="请输入薪水"></i-input>
                </Form-item>
                <Form-item label="公司地址" prop="address">
                    <i-input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入地址"></i-input>
                </Form-item>
                <Form-item label="工作时间" prop="work_time">
                    <i-input v-model="formItem.work_time" placeholder="请输入工作时间"></i-input>
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
                        title: '标题',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '具体要求',
                        key: 'details',
                        align: 'center',
                        ellipsis:true
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        align: 'center'
                    },
                    {
                        title: '学历要求',
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
                        title: '薪水',
                        key: 'salary',
                        align: 'center'
                    },
                    {
                        title: '地址',
                        key: 'address',
                        align: 'center',
                    },
                    {
                        title: '工作时间',
                        key: 'workTime',
                        align: 'center',
                        width: 200,
                    },
                    {
                        title: '发布时间',
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
                    'title': '',
                    'details': '',
                    'phone': '',
                    'address': '',
                    'education':'',
                    'salary':'',
                    'company_id':'',
                    'work_time':'',
                },

                 /*模态框信息*/
                editModal:false,
                editForm:{
                    'Id': 0,
                    'title': '',
                    'details': '',
                    'phone': '',
                    'address': '',
                    'education':'',
                    'salary':'',
                    'company_id':'',
                    'work_time':'',
                },
                company_id:0,
            }
        },

        methods: {
            // 数据初始化、
            init() {
                this.company_id = localStorage.getItem("user_id");
                axios.get('http://localhost:8080/sys/api/getPage',{
                    params:{
                     pageNum:this.pageIndex,
                     companyId:this.company_id,
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
                axios.post('http://localhost:8080/sys/api/addRecruit',{
                        'Id': 0,
                        'title': this.formItem.title,
                        'details': this.formItem.details,
                        'phone': this.formItem.phone,
                        'address': this.formItem.address,
                        'education':this.formItem.education,
                        'salary':this.formItem.salary,
                        'company_id':this.company_id,
                        'work_time':this.formItem.work_time,
                    },{headers:{'Content-Type': 'application/json; charset=utf-8'},dataType:"json",}).then(({data}) => {
                        alert('打卡成功');
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
                        axios.get('http://localhost:8080/sys/api/delRecruit',{
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
