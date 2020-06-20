<template>
<div>
  <i-form :model="formItem" :label-width="210" style="width: 600px; margin-left: 30%;margin-top:20px" >
        <Form-item label="个人昵称">
            <i-input v-model="formItem.name" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="性别">
            <i-select v-model="formItem.sex" placeholder="请选择">
                <i-option value=0>男</i-option>
                <i-option value=1>女</i-option>
            </i-select>
        </Form-item>
       <Form-item label="年龄">
            <i-input v-model="formItem.age" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="手机号码">
            <i-input v-model="formItem.phone" placeholder="请输入"></i-input>
        </Form-item>
    </i-form>
    <div>
        <div style="margin-top: 30px;float: right;">
            <Button
                    type="primary"
                    :loading="saveLoading"
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
        name: "self-information",
        data() {
            return {
                formItem:{
                    'name':'',
                    'sex': '',
                    'age': '',
                    'phone': '',
                },
                Id:0
            };
        },
        methods: {
            init () {
                this.Id = localStorage.getItem("user_id");
            },
            saveEdit() {
                this.saveLoading = true;
                axios.post('http://localhost:8080/sys/api/updateApplicant',{
                        'Id': this.Id,
                        'name': this.formItem.name,
                        'sex': this.formItem.sex,
                        'phone': this.formItem.phone,
                        'age': this.formItem.age,
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

