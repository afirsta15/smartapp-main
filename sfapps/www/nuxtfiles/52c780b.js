(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{539:function(t,e,n){"use strict";n.r(e);n(25),n(118),n(60);var o={components:{},props:{title:{default:"Pilih",type:String},except:{default:"",type:String},initial:{default:"",type:String}},data:function(){return{input:null,state:!1,search:null,options:[],selected:null,endpoint:"app/fetchCustomer",page:1,total:0,isError:!1,isLoading:!1,debounce:null}},mounted:function(){this.initial&&(this.input=this.initial)},methods:{onSearch:function(){var t=this;this.debounce&&clearTimeout(this.debounce),this.debounce=setTimeout((function(){t.fetchData()}),1e3)},fetchData:function(){var t=this,e=this;this.isError=!1,this.isLoading=!0;var n={page:e.page,search:e.search};this.$store.dispatch(this.endpoint,n).then((function(n){t.options=n.data.data.data,t.total=n.data.data.total,e.isError=!1,e.isLoading=!1})).catch((function(t){console.log("err",t),e.$store.commit("alert/setAlert",{type:"fail",msg:"Gagal Mengambil Data"}),e.isError=!0,e.isLoading=!1}))},show:function(){this.state=!0,this.search=null,this.fetchData()},reset:function(){this.input=null,this.selected=null},onSelected:function(dt){this.input=dt.NamaPelanggan,this.selected=dt,this.$emit("submit",this.selected),this.state=!1}}},r=n(84),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"form-control input-modal mt-2",attrs:{readonly:"",type:"text"},domProps:{value:t.input},on:{click:t.show,input:function(e){e.target.composing||(t.input=e.target.value)}}}),t._v(" "),e("b-modal",{ref:"modalSelect",attrs:{id:"modalSelect",centered:"","no-fade":"","hide-header":"","hide-footer":"","modal-class":"fade scale","content-class":"text-center rounded",title:"BootstrapVue"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},[e("div",[e("b-container",{staticClass:"mb-4"},[e("div",{staticClass:"pt-4"},[e("h5",{staticClass:"text-primary"},[e("strong",[t._v("\n              "+t._s(t.title)+"\n            ")])])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"form-control input-modal mt-2 mb-3",attrs:{placeholder:"Cari",type:"text"},domProps:{value:t.search},on:{input:[function(e){e.target.composing||(t.search=e.target.value)},t.onSearch]}}),t._v(" "),t.isLoading?e("div",{staticClass:"row"},[e("div",{staticClass:"col v-center"},[e("b-spinner",{staticClass:"mt-4",attrs:{variant:"primary",type:"grow",label:"Spinning"}})],1)]):t._l(t.options,(function(dt,i){return e("div",{key:"o-"+i},[e("div",{staticClass:"row mx-0 card clickable mb-2 py-3",on:{click:function(e){return t.onSelected(dt)}}},[t._v("\n            "+t._s(dt.Kontak)+" "),e("br"),t._v(" "+t._s(dt.NamaPelanggan)+"\n          ")])])})),t._v(" "),0!==t.options.length||t.isError?t._e():e("div",{staticClass:"mt-3"},[t._v("\n          Data Tidak Ditemukan "),e("br"),t._v(" "),e("b-button",{staticClass:"mt-3",attrs:{variant:"primary"}},[t._v("\n            Customer Baru\n          ")])],1)],2),t._v(" "),e("div",[e("div",{staticClass:"justify-content-center"},[e("b-pagination",{attrs:{"total-rows":t.total,"per-page":5,disabled:t.isLoading,align:"center"},on:{input:t.fetchData},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)])],1)])],1)}),[],!1,null,null,null);e.default=component.exports}}]);