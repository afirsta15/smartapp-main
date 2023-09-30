(window.webpackJsonp=window.webpackJsonp||[]).push([[19,4,5,8,10,15],{515:function(t,e,n){"use strict";n.r(e);n(8),n(47),n(209),n(36);var o={props:{value:{default:0,type:Number},max:{default:null,type:Number}},data:function(){return{input:this.value?this.value:0,state:!1,parsed:null}},watch:{value:function(t){this.parsed=t}},mounted:function(){this.parsed=this.value},methods:{show:function(){this.state=!0,this.input=this.parsed.toString()},onAdd:function(dt){this.max&&parseFloat(this.input+dt)>this.max?this.input=this.max.toString():0===parseInt(this.input)?this.input=dt:this.input+=dt},onDelete:function(){this.input=this.input.slice(0,-1)},onSubmit:function(){this.parsed=parseFloat(this.input?this.input:0),this.$emit("submit",this.parsed),this.state=!1}}},l=n(84),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.parsed,expression:"parsed"}],staticClass:"form-control input-modal",attrs:{readonly:"",type:"text"},domProps:{value:t.parsed},on:{click:t.show,input:function(e){e.target.composing||(t.parsed=e.target.value)}}}),t._v(" "),e("b-modal",{ref:"modalNumber",attrs:{id:"modalNumber",centered:"","no-fade":"","hide-header":"","hide-footer":"","modal-class":"fade scale","content-class":"text-center rounded",title:"BootstrapVue"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},[e("b-container",[e("div",{staticClass:"pt-4 text-right"},[e("h5",[e("strong",[t._v("\n            "+t._s(t.input?t.input:0)+"\n          ")])])])]),t._v(" "),e("hr",{staticClass:"m-3"}),t._v(" "),t.max?e("b-container",[e("div",{staticClass:"text-right"},[e("h6",{staticClass:"text-danger"},[e("strong",[t._v("\n            ( Max "+t._s(t.max)+" )\n          ")])])])]):t._e(),t._v(" "),e("div",[e("div",{staticClass:"row m-3 mb-5"},[t._l(9,(function(i){return e("div",{key:i,staticClass:"col-4 p-4 b-1 clickable",on:{click:function(e){t.onAdd(i.toString())}}},[t._v("\n          "+t._s(i)+"\n        ")])})),t._v(" "),e("div",{staticClass:"col-4 p-4 b-1",on:{click:function(e){return t.onAdd(".")}}},[t._v("\n          .\n        ")]),t._v(" "),e("div",{staticClass:"col-4 p-4 b-1",on:{click:function(e){t.input.length>0&&t.onAdd("0")}}},[t._v("\n          0\n        ")]),t._v(" "),e("div",{staticClass:"col-4 p-4 b-1",on:{click:t.onDelete}},[t._v("\n          x\n        ")])],2)]),t._v(" "),e("b-button",{staticClass:"mt-3 text-white",attrs:{variant:"primary",block:""},on:{click:t.onSubmit}},[t._v("\n      Simpan\n    ")]),t._v(" "),e("b-button",{staticClass:"mt-3",attrs:{variant:"outline-danger",block:""},on:{click:function(){t.state=!1}}},[t._v("\n      Batal\n    ")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},517:function(t,e,n){"use strict";n.r(e);n(41),n(25),n(32);var o={props:{title:{default:"Slimplan",type:String},subtitle:{default:"Home",type:String},refresh:{default:!1,type:Boolean}},data:function(){return{}},methods:{navigateTo:function(t,e){e?this.$router.push(t):this.$router.replace(t)},onLogout:function(){this.$store.commit("uac/logout"),this.navigateTo("/")}}},l=n(84),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout d-flex flex-column justify-content-center"},[e("div",{staticClass:"row p-3 bb-1 bg-primary",staticStyle:{position:"fixed",top:"0",width:"100%","z-index":"9"}},[e("div",{staticClass:"col text-left"},[e("h4",{staticClass:"text-white"},[e("strong",[t._v(t._s(t.title))])]),t._v(" "),e("h6",{staticClass:"text-white"},[t._v("\n        "+t._s(t.subtitle)+"\n      ")])]),t._v(" "),e("div",{staticClass:"col text-right"},["dashboard"===t.$route.name?e("button",{staticClass:"btn btn-danger btn-sm",on:{click:t.onLogout}},[t._v("\n        Logout\n      ")]):e("button",{staticClass:"btn btn-light btn-sm mr-2",on:{click:function(e){return t.$router.back()}}},[t._v("\n        Kembali\n      ")]),t._v(" "),t.refresh?e("button",{staticClass:"btn btn-info btn-sm mr-2",on:{click:function(e){return t.$emit("refreshed")}}},[t._v("\n        Refresh\n      ")]):t._e()])])])}),[],!1,null,null,null);e.default=component.exports},519:function(t,e,n){var content=n(524);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(171).default)("167b46f8",content,!0,{sourceMap:!1})},523:function(t,e,n){"use strict";n(519)},524:function(t,e,n){var o=n(170)((function(i){return i[1]}));o.push([t.i,"\n.truncate[data-v-62788d70] {\n    width: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n.body-content[data-v-62788d70] {\n    min-height: 350px;\n}\n.calWrap[data-v-62788d70] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n",""]),o.locals={},t.exports=o},528:function(t,e,n){"use strict";n.r(e);var o={props:{},data:function(){return{state:!1}},mounted:function(){},methods:{show:function(){this.state=!0},onSubmit:function(){this.$emit("submit"),this.state=!1}}},l=n(84),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",[e("b-modal",{ref:"modalaction",attrs:{id:"modalaction",centered:"","no-fade":"","hide-header":"","hide-footer":"","modal-class":"fade scale","content-class":"text-center rounded"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},[e("div",[e("p",{staticClass:"mt-4"},[t._v("\n        Apakah anda yakin ?\n      ")])]),t._v(" "),e("b-row",[e("b-col",{attrs:{cols:"6"}},[e("b-button",{staticClass:"mt-3 text-white",attrs:{variant:"secondary",block:""},on:{click:function(e){t.state=!1}}},[t._v("\n          Batal\n        ")])],1),t._v(" "),e("b-col",{attrs:{cols:"6"}},[e("b-button",{staticClass:"mt-3 text-white",attrs:{variant:"primary",block:""},on:{click:t.onSubmit}},[t._v("\n          Ya\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},529:function(t,e,n){"use strict";n.r(e);var o=n(525),l=n(526),r=n(10),c=n.n(r),d={components:{Datepicker:o.a},props:{hidePlaceholder:{default:!1,type:Boolean},placeholder:{default:"Filter Tanggal",type:String},defaultStartDate:{default:null,type:Date},defaultEndDate:{default:null,type:Date}},data:function(){return{inputDateStart:null,inputDateEnd:null,disabledDate:{from:new Date},isModalShow:!1,id:l.id,index:1}},mounted:function(){this.inputDateStart=this.defaultStartDate,this.inputDateEnd=this.defaultEndDate},methods:{show:function(){this.isModalShow=!0},apply:function(){var t=c()(this.inputDateStart).diff(c()(this.inputDateEnd),"days");Math.abs(t)>31?this.$bvModal.msgBoxOk(this.labelGeneral.alert.date[this.$store.getters["modules/app/getLanguage"]],{centered:!0,modalClass:"ok-modal"}).then((function(t){})).catch((function(t){console.log("err: ",t)})):(this.isModalShow=!1,this.index=1,this.$emit("changed",{date_gte:this.inputDateStart,date_lte:this.inputDateEnd}))},handleSelectStartDate:function(dt){this.inputDateStart=dt,this.index=2},handleSelectEndDate:function(dt){this.inputDateEnd=dt},uiDate:function(dt){return c()(dt).format("DD/MM/YYYY")},helperDate:function(dt){return dt?c()(dt).toDate():null},clear:function(){this.isModalShow=!1,this.inputDateStart=null,this.inputDateEnd=null,this.index=1,this.$emit("changed",{date_gte:this.inputDateStart,date_lte:this.inputDateEnd})},reset:function(){this.index=this.inputDateStart?2:1},default:function(){this.inputDateStart=null,this.inputDateEnd=null,this.index=1}}},v=(n(523),n(84)),component=Object(v.a)(d,(function(){var t=this,e=t._self._c;return e("div",[e("b-modal",{attrs:{"content-class":"rounded",title:"Filter Tanggal",size:"sm",centered:""},on:{show:t.reset},scopedSlots:t._u([{key:"default",fn:function(){return[e("div",{staticClass:"row body-content rounded"},[e("div",{staticClass:"col-12"},[e("b-tabs",{attrs:{"content-class":"mt-3",fill:""}},[e("b-tab",{attrs:{title:t.inputDateStart?t.uiDate(t.inputDateStart):"Dari",active:1===t.index}},[e("datepicker",{attrs:{"wrapper-class":"calWrap","calendar-class":"w-100",language:t.id,inline:!0,value:t.helperDate(t.inputDateStart),"disabled-dates":t.disabledDate},on:{selected:t.handleSelectStartDate}})],1),t._v(" "),e("b-tab",{attrs:{title:"s.d.",disabled:""}}),t._v(" "),e("b-tab",{attrs:{title:t.inputDateEnd?t.uiDate(t.inputDateEnd):"Sampai",active:2===t.index}},[e("datepicker",{attrs:{"wrapper-class":"calWrap","calendar-class":"w-100",language:t.id,inline:!0,value:t.helperDate(t.inputDateEnd),"disabled-dates":t.disabledDate},on:{selected:t.handleSelectEndDate}})],1)],1)],1)])]},proxy:!0},{key:"modal-footer",fn:function(){return[e("b-button",{staticClass:"w-100",attrs:{variant:"primary",disabled:!t.inputDateEnd||!t.inputDateStart},on:{click:function(e){return t.apply()}}},[t._v("\n        Simpan\n      ")]),t._v(" "),e("b-button",{staticClass:"w-100",attrs:{variant:"default"},on:{click:function(e){return t.clear()}}},[t._v("\n        Reset\n      ")])]},proxy:!0}]),model:{value:t.isModalShow,callback:function(e){t.isModalShow=e},expression:"isModalShow"}})],1)}),[],!1,null,"62788d70",null);e.default=component.exports},534:function(t,e,n){"use strict";n.r(e);n(16),n(31);var o={components:{inputNumber:n(515).default},props:{value:{default:function(){return{}},type:Object},invoice:{default:function(){return{}},type:Object}},data:function(){return{state:!1,options:[],selected:null,store_endpoint:"item/returnTransaction",isLoading:!1}},methods:{show:function(){this.state=!0;var t=JSON.parse(JSON.stringify(this.invoice.Items));this.options=t.map((function(dt){return{NamaItem:dt.NamaItem,KodeItem:dt.KodeItem,KodeSatuan:dt.KodeSatuan,Qty:0,Max:dt.Return?dt.Qty-dt.Return.Qty:dt.Qty}}))},reset:function(){this.input=null,this.selected=null},onSubmit:function(){var t=this;this.isLoading=!0,console.log("options: ",this.options);var e={code:this.invoice.KodeKasir,warehouse:this.invoice.KodeLokasi,lines:this.options.map((function(dt){return{code:dt.KodeItem,qty:dt.Qty}}))};this.$store.dispatch(this.store_endpoint,e).then((function(e){t.$store.commit("alert/setAlert",{type:"success",msg:"Data Berhasil Disimpan"}),t.isLoading=!1,t.state=!1,t.$emit("submit")})).catch((function(e){console.log(e),t.$store.commit("alert/setAlert",{type:"fail",msg:"Terjadi Kesalahan"}),t.isLoading=!1}))}}},l=n(84),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;return e("div",[e("b-modal",{ref:"modalReturn",attrs:{id:"modalReturn",centered:"","no-fade":"","hide-header":"","hide-footer":"","modal-class":"fade scale","content-class":"rounded",title:"BootstrapVue"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},[e("div",[e("b-container",{staticClass:"mb-4"},[e("div",{staticClass:"text-center pt-4"},[e("h5",{staticClass:"text-primary"},[e("strong",[t._v("\n              Form Retur\n            ")])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"text-center col"},[e("h5",[t._v("\n              "+t._s(t.invoice&&t.invoice.KodeKasir)+"\n            ")])]),t._v(" "),e("div",{staticClass:"col-12 mt-3"},[e("h6",[t._v("Daftar Item")])]),t._v(" "),e("div",{staticClass:"col-12 row"},[e("div",{staticClass:"col-8"},[e("h6",{staticClass:"mb-0 text-primary"},[e("strong",[t._v("\n                  Barang\n                ")])])]),t._v(" "),e("div",{staticClass:"col-2"},[e("h6",{staticClass:"mb-0 text-primary"},[e("strong",[t._v("\n                  Satuan\n                ")])])]),t._v(" "),e("div",{staticClass:"col-2"},[e("h6",{staticClass:"mb-0 text-primary"},[e("strong",[t._v("\n                  Qty\n                ")])])])]),t._v(" "),t._l(t.options,(function(dt,i){return e("div",{directives:[{name:"show",rawName:"v-show",value:dt.Max>0,expression:"dt.Max > 0"}],key:"i-"+i,staticClass:"col-12 row mt-2"},[e("div",{staticClass:"col-8 mx-0 pr-0"},[e("input",{directives:[{name:"model",rawName:"v-model",value:dt.NamaItem,expression:"dt.NamaItem"}],staticClass:"form-control input-modal",attrs:{readonly:"",type:"text"},domProps:{value:dt.NamaItem},on:{input:function(e){e.target.composing||t.$set(dt,"NamaItem",e.target.value)}}})]),t._v(" "),e("div",{staticClass:"col-2 mx-0 pr-0"},[e("input",{directives:[{name:"model",rawName:"v-model",value:dt.KodeSatuan,expression:"dt.KodeSatuan"}],staticClass:"form-control input-modal",attrs:{readonly:"",type:"text"},domProps:{value:dt.KodeSatuan},on:{input:function(e){e.target.composing||t.$set(dt,"KodeSatuan",e.target.value)}}})]),t._v(" "),e("div",{staticClass:"col-2 mx-0 pr-0"},[e("inputNumber",{ref:"inputNumber",refInFor:!0,attrs:{value:dt.Qty,max:dt.Max},on:{submit:function(t){dt.Qty=t}}})],1)])})),t._v(" "),e("div",{staticClass:"col-12 pt-2"},[e("hr")]),t._v(" "),e("div",{staticClass:"col-12 pt-2"},[e("button",{staticClass:"btn btn-block btn-primary btn-sm mb-3",attrs:{disabled:t.isLoading},on:{click:t.onSubmit}},[t._v("\n              Retur\n            ")])])],2)])],1)])],1)}),[],!1,null,null,null);e.default=component.exports},556:function(t,e,n){"use strict";n.r(e);n(25),n(118),n(32),n(60),n(8),n(13);var o=n(517),l=n(528),r=n(534),c=n(529),d={name:"Transaction",components:{topbar:o.default,confirmModal:l.default,returnModal:r.default,filterDateModal:c.default},asyncData:function(t){t.isDev,t.route;var e=t.store;t.env,t.params,t.query,t.req,t.res,t.redirect,t.error;e.commit("uac/init")},data:function(){return{endpoint:"item/fetchTransaction",cancel_endpoint:"item/cancelTransaction",search:"",dateStart:null,dateEnd:null,page:1,pageData:[],selected:null,total:0,isError:!1,isLoading:!1,isLoading_mutation:!1,debounce:null,returnState:!0,dateState:!1}},mounted:function(){this.fetchData()},methods:{navigateTo:function(t,e){e?this.$router.push(t):this.$router.replace(t)},handleCalendar:function(dt){dt&&dt.date_gte&&(this.dateState=!0),dt&&dt.date_lte?this.dateState=!0:this.dateState=!1,this.dateStart=dt.date_gte,this.dateEnd=dt.date_lte,this.onRefresh()},showCalendar:function(){this.$refs.modalDateRange.show()},onSearch:function(){var t=this;this.debounce&&clearTimeout(this.debounce),this.debounce=setTimeout((function(){t.onRefresh()}),1e3)},onClick:function(dt){this.selected=dt;var t=0;this.selected.Items.forEach((function(element){element.Return?element.Return.Qty<element.Qty&&(t+=0):t+=1})),this.returnState=t>0},onRefresh:function(){this.selected=null,this.fetchData()},fetchData:function(){var t=this,e=this;this.isError=!1,this.isLoading=!0;var n={page:e.page,search:e.search,start_date:e.dateStart,end_date:e.dateEnd};this.$store.dispatch(this.endpoint,n).then((function(n){t.pageData=n.data.data.data,t.total=n.data.data.total,e.isError=!1,e.isLoading=!1})).catch((function(t){console.log("err",t),e.$store.commit("alert/setAlert",{type:"fail",msg:"Gagal Mengambil Data"}),e.isError=!0,e.isLoading=!1}))},onConfirm:function(){var t=this;this.isLoading_mutation=!0;var e={code:this.selected.KodePindah};this.$store.dispatch(this.outbound_endpoint,e).then((function(e){t.isLoading_mutation=!1,t.$store.commit("alert/setAlert",{type:"success",msg:"Data Berhasil Disimpan"}),t.onRefresh()})).catch((function(e){t.isLoading_mutation=!1,console.log(e),t.$store.commit("alert/setAlert",{type:"fail",msg:e.message})}))},onCancel:function(){this.$refs.modalConfirm.show()},onReturn:function(){this.$refs.modalReturn.show()},onCanceled:function(){var t=this;this.isLoading_mutation=!0;var e={code:this.selected.KodeKasir};this.$store.dispatch(this.cancel_endpoint,e).then((function(e){t.isLoading_mutation=!1,t.$store.commit("alert/setAlert",{type:"success",msg:"Data Berhasil Dibatalkan"}),t.onRefresh()})).catch((function(e){t.isLoading_mutation=!1,console.log(e),t.$store.commit("alert/setAlert",{type:"fail",msg:e.message})}))},onEdit:function(){this.$store.commit("item/setSelected",this.selected),this.navigateTo("/dashboard/checker/create",!0)}}},v=n(84),component=Object(v.a)(d,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout d-flex flex-column h-100"},[e("topbar",{attrs:{refresh:!0,subtitle:"Daftar Transaksi"},on:{refreshed:t.onRefresh}}),t._v(" "),e("div",{staticClass:"top-divider"}),t._v(" "),e("div",{staticClass:"row mt-3 mx-2 pb-2",staticStyle:{height:"80% !important"}},[e("div",{staticClass:"col-3"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"form-control input-modal mt-2 mb-3",attrs:{placeholder:"Cari",type:"text"},domProps:{value:t.search},on:{input:[function(e){e.target.composing||(t.search=e.target.value)},t.onSearch]}})]),t._v(" "),e("div",{staticClass:"col-2 pl-1"},[e("b-icon",{staticClass:"mt-3",attrs:{variant:t.dateState?"primary":"","font-scale":"1",icon:"calendar"},on:{click:t.showCalendar}})],1)]),t._v(" "),t.isLoading?e("div",{staticClass:"row"},[e("div",{staticClass:"col v-center"},[e("b-spinner",{staticClass:"mt-4",attrs:{variant:"primary",type:"grow",label:"Spinning"}})],1)]):e("div",{staticClass:"row",staticStyle:{"max-height":"85% !important","overflow-y":"scroll"}},t._l(t.pageData,(function(dt,n){return e("div",{key:n,staticClass:"col-12"},[e("div",{staticClass:"card px-2 py-1",class:{"bg-soft":dt===t.selected},on:{click:function(e){return t.onClick(dt)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col pr-0"},[e("h5",{staticClass:"text-primary"},[e("small",[t._v("\n                    "+t._s(dt.KodeKasir)+"\n                  ")])])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h6",[t._v("\n                  "+t._s(dt.Customer?dt.Customer.NamaPelanggan:"-")+"\n                ")])]),t._v(" "),e("div",{staticClass:"col text-right"},[e("h6",[e("strong",[t._v(t._s(dt.DariLokasi))])])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h6",[t._v("\n                  "+t._s(t._f("toDate")(dt.created_at))+"\n                ")])]),t._v(" "),e("div",{staticClass:"col"},[e("h6",{staticClass:"text-right"},[e("strong",[t._v(t._s(dt.KodeLokasi))])])])])])])})),0),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0===t.total,expression:"total === 0"}],staticClass:"row mt-3"},[e("div",{staticClass:"col text-center"},[t._v("\n          Tidak ada Data\n        ")])]),t._v(" "),e("div",{staticClass:"row",staticStyle:{position:"absolute",bottom:"0",width:"100%"}},[e("div",{staticClass:"col-12 justify-content-center"},[e("b-pagination",{attrs:{"total-rows":t.total,limit:3,"per-page":5,disabled:t.isLoading,align:"center"},on:{input:t.onRefresh},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)])]),t._v(" "),e("div",{staticClass:"col-9 card"},[t.selected?[e("div",{staticClass:"row mt-3"},[e("div",{staticClass:"col"},[e("h4",{staticClass:"text-primary"},[e("strong",[t._v("\n                "+t._s(t.selected&&t.selected.KodeKasir)+"\n              ")])]),t._v(" "),e("h6",[e("small",[t._v("\n                Oleh "+t._s(t.selected&&t.selected.KodeUser)+"\n              ")])])]),t._v(" "),e("div",{staticClass:"col text-right"},[e("h6",[t._v("\n              "+t._s(t._f("toDate")(t.selected&&t.selected.created_at))+"\n            ")]),t._v(" "),e("h6",[t._v("\n              "+t._s(t.selected&&t.selected.KodeLokasi)+"\n            ")]),t._v(" "),e("h6",[e("small",[t._v("\n                Pelanggan "+t._s(t.selected&&t.selected.Customer?t.selected.Customer.NamaPelanggan:"")+"\n              ")])])])]),t._v(" "),e("hr"),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"row pb-5",staticStyle:{"max-height":"45vh !important","overflow-y":"scroll"}},[e("div",{staticClass:"col"},t._l(t.selected&&t.selected.Items,(function(dt,n){return e("div",{key:n,staticClass:"row"},[e("div",{staticClass:"col"},[t._v("\n                "+t._s(dt.NamaItem)+"\n              ")]),t._v(" "),e("div",{staticClass:"col text-right"},[t._v("\n                "+t._s(dt.Qty)+" "+t._s(dt.KodeSatuan)+"\n                "),dt.Return?e("div",[e("span",{staticClass:"text-danger"},[t._v(t._s(dt.Return.Qty)+" "+t._s(dt.Return.KodeSatuan)+" (Diretur)")])]):t._e()]),t._v(" "),e("div",{staticClass:"col text-right"},[t._v("\n                (@"+t._s(t._f("formatPrice")(dt.Harga))+") "+t._s(t._f("formatPrice")(dt.Harga*dt.Qty))+"\n              ")])])})),0)]),t._v(" "),e("div",{staticClass:"row mb-3 bg-white",staticStyle:{position:"absolute",bottom:"0",width:"100%"}},[e("div",{staticClass:"col-4"},[t._v("\n            PPN\n          ")]),t._v(" "),e("div",{staticClass:"col-8 text-right"},[t._v("\n            "+t._s(t.selected&&0===t.selected.NilaiPPN?"Harga Sudah Termasuk Pajak (11%)":"(11%) "+t.selected.NilaiPPN)+"\n          ")]),t._v(" "),e("div",{staticClass:"col-4"},[t._v("\n            Total\n          ")]),t._v(" "),e("div",{staticClass:"col-8 text-right"},[t._v("\n            "+t._s(t._f("formatPrice")(t.selected&&t.selected.Total))+"\n          ")]),t._v(" "),e("div",{staticClass:"col-4"},[t._v("\n            Diskon\n          ")]),t._v(" "),e("div",{staticClass:"col-8 text-right"},[t._v("\n            "+t._s(t._f("formatPrice")(t.selected&&t.selected.NilaiDiskon))+"\n          ")]),t._v(" "),e("div",{staticClass:"col-4"},[t._v("\n            Subtotal\n          ")]),t._v(" "),e("div",{staticClass:"col-8 text-right"},[t._v("\n            "+t._s(t._f("formatPrice")(t.selected&&t.selected.Subtotal))+"\n          ")]),t._v(" "),t.selected&&"CFM"===t.selected.Status?e("div",{directives:[{name:"show",rawName:"v-show",value:t.returnState,expression:"returnState"}],staticClass:"col-12 text-right mt-3"},[e("button",{staticClass:"btn btn-danger btn-block btn-sm mb-3 mx-1",on:{click:t.onReturn}},[t._v("\n              Retur\n            ")])]):t._e(),t._v(" "),t.selected&&"OPN"===t.selected.Status?e("div",{staticClass:"col-12 text-right mt-3"},[e("button",{staticClass:"btn btn-success btn-block btn-sm mb-3 mx-1",on:{click:t.onEdit}},[t._v("\n              Cek\n            ")])]):t._e(),t._v(" "),t.selected&&"CFM"===t.selected.Status?e("div",{staticClass:"col-12 text-right mt-3"},[e("button",{staticClass:"btn btn-primary btn-block btn-sm mb-3 mx-1",on:{click:t.onReturn}},[t._v("\n              Print\n            ")])]):t._e()])]:[e("div",{staticClass:"v-center"},[t._v("\n          Silahkan memilih transaksi untuk melihat detail\n        ")])]],2)]),t._v(" "),e("confirmModal",{ref:"modalConfirm",on:{submit:t.onCanceled}}),t._v(" "),e("returnModal",{ref:"modalReturn",attrs:{invoice:t.selected},on:{submit:t.onRefresh}}),t._v(" "),e("filterDateModal",{ref:"modalDateRange",attrs:{"default-start-date":t.dateStart,"default-end-date":t.dateEnd},on:{changed:t.handleCalendar}})],1)}),[function(){var t=this._self._c;return t("h5",{staticClass:"text-primary"},[t("strong",[this._v("\n            Barang\n          ")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h6",{staticClass:"text-primary"},[e("strong",[t._v("\n                Nama\n              ")])])]),t._v(" "),e("div",{staticClass:"col text-right"},[e("h6",{staticClass:"text-primary"},[e("strong",[t._v("\n                Kuantitas\n              ")])])]),t._v(" "),e("div",{staticClass:"col text-right"},[e("h6",{staticClass:"text-primary"},[e("strong",[t._v("\n                Harga Jual\n              ")])])])])}],!1,null,null,null);e.default=component.exports}}]);