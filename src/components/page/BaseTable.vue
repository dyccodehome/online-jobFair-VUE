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
        <el-table :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
                  class="tb-edit" style="width: 100%"
                  border highlight-current-row>
            <el-table-column prop="filmId" label="ID" width="80" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="姓名" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.name"></el-input>
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="学历"  width="100"  align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.education"></el-input>
                    <span>{{scope.row.education}}</span>
                </template>
            </el-table-column>
            <el-table-column label="民族" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.folk"></el-input>
                    <span>{{scope.row.folk}}</span>
                </template>
            </el-table-column>
            <el-table-column label="年龄" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.age"></el-input>
                    <span>{{scope.row.age}}</span>
                </template>
            </el-table-column>
            <el-table-column label="毕业院校" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.college"></el-input>
                    <span>{{scope.row.college}}</span>
                </template>
            </el-table-column>
            <el-table-column label="电话" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.phone"></el-input>
                    <span>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
            <el-table-column label="优势" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.advantage"></el-input>
                    <span>{{scope.row.advantage}}</span>
                </template>
            </el-table-column>
            <el-table-column label="求职期望" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.expect"></el-input>
                    <span>{{scope.row.expect}}</span>
                </template>
            </el-table-column>
            <el-table-column label="经历" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.experience"></el-input>
                    <span>{{scope.row.experience}}</span>
                </template>
            </el-table-column>
            <el-table-column label="证书" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.credentials"></el-input>
                    <span>{{scope.row.credentials}}</span>
                </template>
            </el-table-column>
            <el-table-column label="个人主业" width="100" align="center">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.blog"></el-input>
                    <span>{{scope.row.blog}}</span>
                </template>
            </el-table-column>

            <!--<el-table-column prop="filmGrade" label="影片评分" width="80" align="center" :show-overflow-tooltip="true"></el-table-column>-->
            <el-table-column label="操作" width="150" header-align="center" align="right">
                <template slot-scope="scope">
                    <!--<el-button-->
                        <!--size="mini"-->
                        <!--type="success"-->
                        <!--@click="saveEdit(scope.row)">保存</el-button>-->
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增弹出框-->
        <el-dialog
            title="新增影片"
            :visible.sync="uploadVisible" width="40%"
            :close-on-click-modal="false">
            <div class="el-row">
                <div class="el-col-md-11">
                    <el-form :model="form" label-width="80px">
                        <el-form-item label="姓名:">
                            <el-input v-model="form.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="学历:">
                            <el-input v-model="form.education"></el-input>
                        </el-form-item>
                        <el-form-item label="民族:">
                            <el-input v-model="form.folk" ></el-input>
                        </el-form-item>
                        <el-form-item label="年龄:">
                            <el-input v-model="form.age" ></el-input>
                        </el-form-item>
                        <el-form-item label="毕业院校:">
                            <el-input v-model="form.college" ></el-input>
                        </el-form-item>
                        <el-form-item label="电话:">
                            <el-input v-model="form.phone" ></el-input>
                        </el-form-item>
                        <el-form-item label="优势:">
                            <el-input v-model="form.advantage" ></el-input>
                        </el-form-item>
                        <el-form-item label="求职期望:">
                            <el-input v-model="form.expect" ></el-input>
                        </el-form-item>
                        <el-form-item label="经历:">
                            <el-input v-model="form.registeredCapital" ></el-input>
                        </el-form-item>
                        <el-form-item label="证书:">
                            <el-input v-model="form.credentials" ></el-input>
                        </el-form-item>
                        <el-form-item label="个人主页:">
                            <el-input v-model="form.blog" ></el-input>
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
                    id:'',
                    name:'',
                    education:'',
                    folk:'',
                    age:'',
                    college:'',
                    phone:'',
                    advantage:'',
                    expect:'',
                    experience:'',
                    credentials:'',
                    blog:''
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
                  .get(this.$baseUrl+"resumeAll/manageResume")
                  .then(function (res) {
                      that.tableData=res.data.data;
                  })
            },
            // saveEdit(row){
            //     console.log(row)
            //     var that=this;
            //     this.$axios
            //         .post(this.$baseUrl+"filmall/manageEditorFilm",{"filmId":row.filmId,"filmName":row.filmName,"filmIntroduction":row.filmIntroduction})
            //         .then(function (res) {
            //             that.$message.success("保存成功");
            //             that.getData();
            //         })
            // },
            handleUpload(){
            this.form={
              id:'',
              name:'',
              education:'',
              folk:'',
              age:'',
              college:'',
              phone:'',
              advantage:'',
              expect:'',
              experience:'',
              credentials:'',
              blog:''
            };
            this.uploadVisible=true;
            },
            addTopic(){
                var that=this;
                if(this.form.name===''){
                    this.$message.error("请输入姓名")
                } else {
                    if(this.form.education===''){
                        this.$message.error("请输入学历")
                    } else {
                        if(this.form.folk===''){
                            this.$message.error("请输入民族")
                        } else{
                        if(this.form.age===''){
                            this.$message.error("请输入年龄")
                        } else{
                        if(this.form.college===''){
                            this.$message.error("请输入毕业院校")
                        } else{
                        if(this.form.phone===''){
                            this.$message.error("请输入电话")
                        } else{
                        if(this.form.advantage===''){
                            this.$message.error("请输入优势")
                        } else{
                        if(this.form.expect===''){
                            this.$message.error("请输入期望")
                        } else{
                            if(this.form.experience===''){
                            this.$message.error("请输入经历")
                        } else{
                                if(this.form.credentials===''){
                                    this.$message.error("请输入证书")
                                } else{
                                    if(this.form.blog===''){
                                        this.$message.error("请输入个人主页")
                                    } else
                                    {
                            this.$axios
                            .post(this.$baseUrl+'resume/manageAddResume',{"name":this.form.name,"education":this.form.education,"folk":this.form.folk,
                                "college":this.form.college,"phone":this.form.phone,"advantage":this.form.advantage, "expect":this.form.expect,
                                "experience":this.form.experience,"credentials":this.form.credentials,"blog":this.form.blog})
                            .then(function (res) {
                                that.uploadVisible=false;
                                that.$message.success("新增成功");
                                that.getData();
                            })
                    }
                                }
                            }
                        }
                        }
                        }
                        }
                        }
                        }
                    }
                }
            },
            handleDelete(row) {
                var that=this;
                this.$confirm('此操作将永久删除应聘者信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios
                        .post(this.$baseUrl+'resumeAll/manageDeleteResume',{"Id":row.id})
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
        width: 100px;
        height: 150px;
    }
    .search{
        width: 200px;
        float: right;
        /*text-indent: -50px;*/
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
