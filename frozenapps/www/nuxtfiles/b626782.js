(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{547:function(t,e,n){"use strict";n.r(e);var l={components:{},props:{title:{default:"Pilih",type:String},initial:{default:"",type:String},info:{default:"",type:String},defaultOptions:{default:function(){return[]},type:Array},value:{default:"",type:String}},data:function(){return{input:null,state:!1,options:[],selected:null}},mounted:function(){this.initial&&(this.input=this.initial)},methods:{show:function(){this.state=!0,this.options=this.defaultOptions},reset:function(){this.input=null,this.selected=null},onSelected:function(dt){this.input=this.value?dt[this.value]:dt,this.selected=dt,this.$emit("submit",this.selected),this.state=!1}}},o=n(84),component=Object(o.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"form-control input-modal mt-2",attrs:{readonly:"",type:"text"},domProps:{value:t.input},on:{click:t.show,input:function(e){e.target.composing||(t.input=e.target.value)}}}),t._v(" "),e("b-modal",{ref:"modalSelect",attrs:{id:"modalSelect",centered:"","no-fade":"","hide-header":"","hide-footer":"","modal-class":"fade scale","content-class":"text-center rounded",title:"BootstrapVue"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},[e("div",[e("b-container",{staticClass:"mb-4"},[t.info?e("b-badge",{attrs:{variant:"warning"}},[t._v("\n          "+t._s(t.info)+"\n        ")]):t._e(),t._v(" "),e("div",{staticClass:"pt-4"},[e("h5",{staticClass:"text-primary"},[e("strong",[t._v("\n              "+t._s(t.title)+"\n            ")])])])],1),t._v(" "),t._l(t.options,(function(dt,i){return e("div",{key:"o-"+i},[e("div",{staticClass:"row mx-0 card clickable mb-2 py-3",on:{click:function(e){return t.onSelected(dt)}}},[t._v("\n          "+t._s(t.value?dt[t.value]:dt)+"\n        ")])])}))],2)])],1)}),[],!1,null,null,null);e.default=component.exports}}]);