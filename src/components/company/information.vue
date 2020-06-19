<template>
<div>
  <i-form :model="formItem" :label-width="210" style="width: 600px; margin-left: 30%;margin-top:20px" >
        <Form-item label="企业名称">
            <i-input v-model="formItem.name" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="税务号">
            <i-select v-model="formItem.type" placeholder="请选择">
                <i-option value=0>身份证</i-option>
                <i-option value=1>护照</i-option>
            </i-select>
        </Form-item>
       <Form-item label="公司地址">
            <i-input v-model="formItem.paperNumber" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="手机号码">
            <i-input v-model="formItem.phone" placeholder="请输入"></i-input>
        </Form-item>
        <Form-item label="企业法人" >
            <Radio-group v-model="formItem.health">
                <Radio v-for="item in selectList" :label="item.value" :key="item.value" >
                    <span>{{item.label}}</span>
                </Radio>
            </Radio-group>
        </Form-item>
         <Form-item label="经营范围">
            <Radio-group v-model="formItem.touch">
                <Radio v-for="item in selectList" :label="item.value" :key="item.value" >
                    <span>{{item.label}}</span>
                </Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="注册资本">
            <i-input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入户籍地址"></i-input>
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
                    'type': '',
                    'paperNumber': '',
                    'phone': '',
                    'address':'',
                    'health': '',
                    'touch':'',
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
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            
            saveEdit() {
                            this.saveLoading = true;
                            axios.post('http://localhost:8080/sys/api/addUser',{
                                'Id': 0,
                                'name': this.formItem.name,
                                'type': parseInt(this.formItem.type),
                                'paperNumber': this.formItem.paperNumber,
                                'phone': this.formItem.phone,
                                'address': this.formItem.address,
                                'health':this.formItem.health,
                                'touch':this.formItem.touch,
                            },{headers:{'Content-Type': 'application/json; charset=utf-8'},dataType:"json",}).then(({data}) => {
                                alert('打卡成功');
                            }).catch(() => {
                                this.saveLoading = false;
                                this.$Message.error('连接失败，请检查网络！');
                            });
            },
            
           
            
        },
       
    };
</script>

