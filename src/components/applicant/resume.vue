<template>
<div>
  <i-form :model="formItem" :label-width="210" style="width: 600px; margin-left: 30%;margin-top:20px" >
        <Form-item label="姓名">
            <i-input v-model="formItem.name" ></i-input>
        </Form-item>
        <Form-item label="学历">
            <i-input v-model="formItem.education" ></i-input>
        </Form-item>
       <Form-item label="民族">
            <i-input v-model="formItem.folk" ></i-input>
        </Form-item>
        <Form-item label="年龄">
            <i-input v-model="formItem.age" ></i-input>
        </Form-item>
        <Form-item label="毕业院校">
            <i-input v-model="formItem.college" ></i-input>
        </Form-item>
        <Form-item label="优势">
            <i-input v-model="formItem.advantage" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </Form-item>
        <Form-item label="求职期望">
            <i-input v-model="formItem.expect"></i-input>
        </Form-item>
        <Form-item label="经历">
            <i-input v-model="formItem.experience" ></i-input>
        </Form-item>
        <Form-item label="手机号码">
            <i-input v-model="formItem.phone" ></i-input>
        </Form-item>
        <Form-item label="证书">
            <i-input v-model="formItem.credentials" ></i-input>
        </Form-item>
        <Form-item label="个人主页">
            <i-input v-model="formItem.blog" ></i-input>
        </Form-item>
    </i-form>
    <div>
        <div style="margin-top: 30px;margin-left: 50%;">
            <Button
                    type="primary"
                    @click="saveEdit()"
            >保存</Button>
        </div>
    </div>
</div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios'
    import iview from 'iview'
    export default {
        name: "resume",
        data() {
            return {
                formItem:{
                    'name':'',
                    'education':'',
                    'folk':'',
                    'age': '',
                    'college': '',
                    'advantage': '',
                    'expect': '',
                    'experience': '',
                    'credentials': '',
                    'blog': '',
                    'phone': '',
                },
                Id:0,
                pkId:0,
            };
        },
        methods: {
            init () {
                this.Id = localStorage.getItem("user_id");
                axios.get('http://localhost:8080/sys/api/findApplicant',{
                     params:{
                         applicantId:this.Id,
                     }
                }).then(({data}) => {
                    axios.get('http://localhost:8080/sys/api/findById',{
                        params:{
                        resumeId: data.id,
                        }
                    }).then(({data}) => {
                        this.formItem = data;
                    });
                });
                
            },
            saveEdit() {
                axios.post('http://localhost:8080/sys/api/updateResume',{
                        'id': parseInt(this.Id),
                        'name': this.formItem.name,
                        'education': this.formItem.education,
                        'phone': this.formItem.phone,
                        'age': this.formItem.age,
                        'folk':this.formItem.folk,
                        'college': this.formItem.college,
                        'advantage':this.formItem.advantage,
                        'expect': this.formItem.expect,
                        'experience': this.formItem.experience,
                        'credentials': this.formItem.credentials,
                        'blog': this.formItem.blog,
                    },{headers:{'Content-Type': 'application/json; charset=utf-8'},dataType:"json",}).then(({data}) => {
                        alert('修改成功');
                    }).catch(() => {
                        this.saveLoading = false;
                        this.$Message.error('连接失败，请检查网络！');
                    });
            },

        },
        
        mounted(){
            this.init(); //初始化
        }
    };
</script>

