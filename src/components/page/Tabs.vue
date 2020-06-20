<template>
    <div>
        <div class="search">
            <el-input
                v-model="search"
                size="large"
                placeholder="输入关键字搜索"/>
        </div>
        <div class="addTopic">
            <el-button
                size="large"
                @click="handleUpload"
                type="success">新增</el-button>
        </div>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  class="tb-edit" style="width: 100%"
                  border highlight-current-row>
            <el-table-column prop="companyId" label="ID" width="80" align="center" :show-overflow-tooltip="true"></el-table-column>
            <!--<el-table-column label="图" width="100" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--<img v-bind:src="scope.row.cinemaUrl" class="pic"/>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="税务号"width="150" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.taxNumber"></el-input>
                    <span>{{scope.row.taxNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column label="公司名称"width="150" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.name"></el-input>
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="公司地址"width="150" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.address"></el-input>
                    <span>{{scope.row.address}}</span>
                </template>
            </el-table-column>
            <el-table-column label="企业法人" width="150" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.legalperson"></el-input>
                    <span>{{scope.row.legalperson}}</span>
                </template>
            </el-table-column>
            <el-table-column label="经营范围"width="150" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.scope"></el-input>
                    <span>{{scope.row.scope}}</span>
                </template>

            </el-table-column>
            <el-table-column label="联系电话"width="150" align="center">
            <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.phone"></el-input>
                <span>{{scope.row.phone}}</span>
            </template>
            </el-table-column>
            <el-table-column label="注册资本"width="150" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.registeredCapital"></el-input>
                    <span>{{scope.row.registeredCapital}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" header-align="center" align="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="saveEdit(scope.row)">保存</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--新增弹出框-->
        <el-dialog
            title="新增影院"
            :visible.sync="uploadVisible" width="40%"
            :close-on-click-modal="false">
            <div class="el-row">
                <div class="el-col-md-11">
                    <el-form :model="form" label-width="80px">
                        <el-form-item label="税务号:">
                            <el-input v-model="form.taxNumber" ></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称:">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址:">
                            <el-input v-model="form.address" ></el-input>
                        </el-form-item>
                        <el-form-item label="企业法人:">
                            <el-input v-model="form.legalperson" ></el-input>
                        </el-form-item>
                        <el-form-item label="经营范围:">
                            <el-input v-model="form.scope" ></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话:">
                            <el-input v-model="form.phone" ></el-input>
                        </el-form-item>
                        <el-form-item label="注册资本:">
                            <el-input v-model="form.registeredCapital" ></el-input>
                        </el-form-item>

                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadVisible = false">返 回</el-button>
                <el-button type="primary" @click="addTopic">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tableData: [],
                search: '',
                uploadVisible:false,
                form:{
                    Id:'',
                    taxNumber:'',
                    name:'',
                    address:'',
                    legalperson:'',
                    scope:'',
                    phone:'',
                    registeredCapital:''
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                var that=this;
                this.$axios
                    .get(this.$baseUrl+"companyAll/manageCompanyAll")
                    .then(function (res) {
                        that.tableData=res.data.data;
                    })
            },
            saveEdit(row){
                console.log(row);
                var that=this;
                this.$axios
                    .post(this.$baseUrl+"companyAll/manageEditorCompany",
                        {"Id":row.Id,"name":row.name, "scope":row.scope, "legalperson":row.legalperson, "address":row.address,
                            "phone":row.phone,"registeredCapital":row.registeredCapital
                        })
                    .then(function (res) {
                        that.$message.success("保存成功");
                        that.getData();
                    })
            },
            handleUpload(){
                this.form={
                  taxNumber:'',
                  name:'',
                  address:'',
                  legalperson:'',
                  scope:'',
                  phone:'',
                  registeredCapital:''
                };
                this.uploadVisible=true;
            },
            addTopic(){
                var that=this;
                if(this.form.taxNumber===''||this.form.name===''||this.form.address===''||this.form.legalperson===''
                ||this.form.scope===''||this.form.phone===''||this.form.registeredCapital===''){
                    this.$message.error("表格不为空")
                } else {
                    this.$axios
                        .post(this.$baseUrl+'companyAll/manageAddCompany',
                            {"taxNumber":this.form.taxNumber,"name":this.form.name,"address":this.form.address,
                            "legalperson":this.form.legalperson,"scope":this.form.scope,"phone":this.form.phone,"registeredCapital":this.form.registeredCapital
                            })
                        .then(function (res) {
                            that.uploadVisible=false;
                            that.$message.success("新增成功");
                            that.getData();
                        })
                }
            },
            handleDelete(row) {
                var that=this;
                this.$confirm('此操作将永久删除企业信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios
                        .post(this.$baseUrl+'companyAll/manageDeleteCompany',{"Id":row.Id})
                        .then(function (res) {
                            that.$message.success("删除成功")
                            that.getData();
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .pic{
        width: 150px;
        height: 80px;
    }
    .search{
        width: 200px;
        float: left;
    }
    .addTopic{
        float: left;
        text-indent: 80px;
    }

    .tb-edit .el-input {
        display: none;
    }
    el-input{
        width: 70px;
    }
    .tb-edit .current-row .el-input {
        display: block
    }
    .tb-edit .current-row .el-input+span {
        display: none
    }
    .tb-edit .current-row .el-date-picker+span {
        display: none
    }
</style>
