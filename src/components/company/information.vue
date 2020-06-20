<template>
<div>
  <i-form :model="formItem" :label-width="210" style="width: 600px; margin-left: 30%;margin-top:20px" >
        <Form-item label="企业名称">
            <i-input v-model="formItem.name" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="税务号">
            <i-input v-model="formItem.tax_number" placeholder="请输入"></i-input>
        </Form-item>
       <Form-item label="公司地址">
            <i-input v-model="formItem.address" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="手机号码">
            <i-input v-model="formItem.phone" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="企业法人" >
            <i-input v-model="formItem.leagal_person" placeholder="请输入"></i-input>
        </Form-item>
         <Form-item label="注册资本">
            <i-input v-model="formItem.registered_capital" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="经营范围">
            <i-input v-model="formItem.scope" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入经营范围"></i-input>
        </Form-item>
        
    </i-form>
</div>
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios'
    import iview from 'iview'
    export default {
        name: "information",
        data() {
            return {
                formItem:{
                    'name':'',
                    'tax_number': '',
                    'phone': '',
                    'address':'',
                    'leagal_person':'',
                    'registered_capital': '',
                    'scope':'',
                },
                selectList:[
                    {
                        label:'有',
                        value:0
                    },
                    {
                        label:'无',
                        value:1
                    }
                ]
            };
        },

        
        methods: {
            init () {
                this.Id = localStorage.getItem("user_id");
            },
            saveEdit() {
                this.saveLoading = true;
                axios.post('http://localhost:8080/sys/api/addUser',{
                            'Id': this.Id,
                            'name': this.formItem.name,
                            'tax_number': this.formItem.tax_number,
                            'leagal_person': this.formItem.leagal_person,
                            'phone': this.formItem.phone,
                            'address': this.formItem.address,
                            'registered_capital':this.formItem.registered_capital,
                            'scope':this.formItem.scope,
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

