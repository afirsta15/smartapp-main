(window.webpackJsonp=window.webpackJsonp||[]).push([[27,4,9],{516:function(t,e,n){"use strict";var o=n(26),r=n(98).findIndex,l=n(119),c="findIndex",d=!0;c in[]&&Array(1)[c]((function(){d=!1})),o({target:"Array",proto:!0,forced:d},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),l(c)},517:function(t,e,n){"use strict";n.r(e);n(41),n(25),n(32);var o={props:{title:{default:"Slimplan",type:String},subtitle:{default:"Home",type:String},refresh:{default:!1,type:Boolean}},data:function(){return{}},methods:{navigateTo:function(t,e){e?this.$router.push(t):this.$router.replace(t)},onLogout:function(){this.$store.commit("uac/logout"),this.navigateTo("/")}}},r=n(84),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout d-flex flex-column justify-content-center"},[e("div",{staticClass:"row p-3 bb-1 bg-primary",staticStyle:{position:"fixed",top:"0",width:"100%","z-index":"9"}},[e("div",{staticClass:"col text-left"},[e("h4",{staticClass:"text-white"},[e("strong",[t._v(t._s(t.title))])]),t._v(" "),e("h6",{staticClass:"text-white"},[t._v("\n        "+t._s(t.subtitle)+"\n      ")])]),t._v(" "),e("div",{staticClass:"col text-right"},["dashboard"===t.$route.name?e("button",{staticClass:"btn btn-danger btn-sm",on:{click:t.onLogout}},[t._v("\n        Logout\n      ")]):e("button",{staticClass:"btn btn-light btn-sm mr-2",on:{click:function(e){return t.$router.back()}}},[t._v("\n        Kembali\n      ")]),t._v(" "),t.refresh?e("button",{staticClass:"btn btn-info btn-sm mr-2",on:{click:function(e){return t.$emit("refreshed")}}},[t._v("\n        Refresh\n      ")]):t._e()])])])}),[],!1,null,null,null);e.default=component.exports},518:function(t,e,n){var content=n(521);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(171).default)("faa51b84",content,!0,{sourceMap:!1})},520:function(t,e,n){"use strict";n(518)},521:function(t,e,n){var o=n(170)((function(i){return i[1]}));o.push([t.i,"\n.modal-xl {\n  max-width: 90vw !important;\n}\n",""]),o.locals={},t.exports=o},522:function(t,e,n){"use strict";n.r(e);n(90),n(142),n(516),n(208),n(25),n(118);var o={components:{},props:{title:{default:"Pilih Produk",type:String},warehouse:{default:function(){return{}},type:Object}},data:function(){return{endpoint:"item/category",state:!1,options:[],selected:[],search:null,isError:!1,isLoading:!1}},methods:{show:function(){this.state=!0,this.fetchData()},onFilter:function(){},onSelected:function(dt){var t=this.selected.findIndex((function(t){return t===dt}));t>=0?this.selected.splice(t,1):this.selected.push(dt)},onRemove:function(t){},fetchData:function(){var t=this,e=this;this.isError=!1,this.isLoading=!0;var n={search:e.search};this.$store.dispatch(this.endpoint,n).then((function(n){t.options=n.data.data,e.isError=!1,e.isLoading=!1})).catch((function(t){console.log("err",t),e.$store.commit("alert/setAlert",{type:"fail",msg:"Gagal Mengambil Data"}),e.isError=!0,e.isLoading=!1}))},submit:function(){this.state=!1,this.$emit("submit",this.selected)}}},r=(n(520),n(84)),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",[e("b-modal",{ref:"modalFilter",attrs:{id:"modalFilter",centered:"","no-fade":"","hide-header":"","hide-footer":"",size:"l","modal-class":"fade scale","content-class":"rounded"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},[e("div",[e("div",{staticClass:"pb-5"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("strong",{staticClass:"text-primary"},[t._v("\n              Filter\n            ")])])]),t._v(" "),t.isLoading?e("div",{staticClass:"row"},[e("div",{staticClass:"col v-center"},[e("b-spinner",{staticClass:"mt-4",attrs:{variant:"primary",type:"grow",label:"Spinning"}})],1)]):e("div",{staticClass:"row",staticStyle:{"overflow-y":"scroll",height:"50vh"}},t._l(t.options,(function(dt,n){return e("div",{key:n,staticClass:"col-3 mt-2 px-0"},[e("div",{staticClass:"card m-1 text-center text-primary v-center",class:{"bg-soft":t.selected.includes(dt.KodeKategori)},staticStyle:{height:"3rem"},on:{click:function(e){return t.onSelected(dt.KodeKategori)}}},[t._v("\n              "+t._s(dt.NamaKategori)+"\n            ")])])})),0)]),t._v(" "),e("div",{staticClass:"row",staticStyle:{position:"absolute",bottom:"0",width:"100%"}},[e("div",{staticClass:"col"},[t._v("\n          "+t._s(t.selected.length)+" Filter Terpilih\n        ")]),t._v(" "),e("div",{staticClass:"col text-right"},[e("b-button",{staticClass:"button-bottom mb-2",attrs:{variant:"outline-danger"},on:{click:function(e){t.selected=[]}}},[t._v("\n            Reset\n          ")]),t._v(" "),e("b-button",{staticClass:"button-bottom mb-2",attrs:{variant:"primary"},on:{click:t.submit}},[t._v("\n            Terapkan\n          ")])],1)])])])],1)}),[],!1,null,null,null);e.default=component.exports},559:function(t,e,n){"use strict";n.r(e);n(25),n(118),n(11),n(8),n(32),n(60);var o=n(517),filter=n(522),r={name:"Transaction",components:{topbar:o.default,inputFilter:filter.default},asyncData:function(t){t.isDev,t.route;var e=t.store;t.env,t.params,t.query,t.req,t.res,t.redirect,t.error;e.commit("uac/init")},data:function(){return{endpoint:"item/fetch",cancel_endpoint:"item/cancelTransaction",search:null,dateStart:null,dateEnd:null,page:1,pageData:[],filter:[],selected:null,total:0,isError:!1,isLoading:!1,isLoading_mutation:!1,debounce:null,returnState:!0,dateState:!1}},mounted:function(){this.fetchData()},methods:{navigateTo:function(t,e){e?this.$router.push(t):this.$router.replace(t)},onSearch:function(){var t=this;this.debounce&&clearTimeout(this.debounce),this.debounce=setTimeout((function(){t.onRefresh()}),1e3)},onFilter:function(){this.$refs.inputFilter.show()},onFilterAdded:function(dt){this.filter=dt,this.fetchData()},onClick:function(dt){this.selected=dt},onRefresh:function(){this.selected=null,this.fetchData()},fetchData:function(){var t=this,e=this;this.isError=!1,this.isLoading=!0;var n={per_page:6,page:e.page,search:e.search,category:e.filter};this.$store.dispatch(this.endpoint,n).then((function(n){t.pageData=n.data.data.data,t.total=n.data.data.total,e.isError=!1,e.isLoading=!1})).catch((function(t){console.log("err",t),e.$store.commit("alert/setAlert",{type:"fail",msg:"Gagal Mengambil Data"}),e.isError=!0,e.isLoading=!1}))},onCancel:function(){this.$refs.modalConfirm.show()},onCanceled:function(){var t=this;this.isLoading_mutation=!0;var e={code:this.selected.KodeKasir};this.$store.dispatch(this.cancel_endpoint,e).then((function(e){t.isLoading_mutation=!1,t.$store.commit("alert/setAlert",{type:"success",msg:"Data Berhasil Dibatalkan"}),t.onRefresh()})).catch((function(e){t.isLoading_mutation=!1,console.log(e),t.$store.commit("alert/setAlert",{type:"fail",msg:e.message})}))},onEdit:function(){this.$store.commit("item/setSelected",this.selected),this.navigateTo("/dashboard/product/create")}}},l=n(84),component=Object(l.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout d-flex flex-column h-100"},[e("topbar",{attrs:{refresh:!0,subtitle:"Daftar Produk"},on:{refreshed:t.onRefresh}}),t._v(" "),e("div",{staticClass:"top-divider"}),t._v(" "),e("div",{staticClass:"row mt-3 mx-2 pb-2",staticStyle:{height:"85% !important"}},[e("div",{staticClass:"col-3"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"form-control input-modal mt-2 mb-3",attrs:{placeholder:"Cari",type:"text"},domProps:{value:t.search},on:{input:[function(e){e.target.composing||(t.search=e.target.value)},t.onSearch]}})]),t._v(" "),e("div",{staticClass:"col-2 pl-1"},[e("b-icon",{staticClass:"mt-3",attrs:{variant:t.filter.length>0?"primary":"","font-scale":"1.2",icon:"ui-radios"},on:{click:t.onFilter}})],1)]),t._v(" "),t.isLoading?e("div",{staticClass:"row"},[e("div",{staticClass:"col v-center"},[e("b-spinner",{staticClass:"mt-4",attrs:{variant:"primary",type:"grow",label:"Spinning"}})],1)]):e("div",{staticClass:"row",staticStyle:{"max-height":"80% !important","overflow-y":"scroll"}},t._l(t.pageData,(function(dt,n){return e("div",{key:n,staticClass:"col-12"},[e("div",{staticClass:"card px-2 py-1",class:{"bg-soft":dt===t.selected},on:{click:function(e){return t.onClick(dt)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col pr-0"},[e("h5",{staticClass:"text-primary"},[e("small",[t._v("\n                    "+t._s(dt.KodeItem)+"\n                  ")])])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h6",[t._v("\n                  "+t._s(dt.NamaItem)+"\n                ")])])]),t._v(" "),t._m(0,!0)])])})),0),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:0===t.total,expression:"total === 0"}],staticClass:"row mt-3"},[e("div",{staticClass:"col text-center"},[t._v("\n          Tidak ada Data\n        ")])]),t._v(" "),e("div",{staticClass:"row",staticStyle:{position:"absolute",bottom:"0",width:"100%"}},[e("div",{staticClass:"col-12 justify-content-center"},[e("b-pagination",{attrs:{"total-rows":t.total,limit:3,"per-page":6,disabled:t.isLoading,align:"center"},on:{input:t.onRefresh},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)])]),t._v(" "),e("div",{staticClass:"col-9 card"},[t.selected?[e("div",{staticClass:"row mt-3"},[e("div",{staticClass:"col"},[e("h4",{staticClass:"text-primary"},[e("strong",[t._v("\n                "+t._s(t.selected&&t.selected.KodeItem)+"\n              ")])]),t._v(" "),e("h6",[t._v("\n              "+t._s(t.selected&&t.selected.NamaItem)+"\n            ")]),t._v(" "),e("h6",[e("small",[t._v("\n                Oleh "+t._s(t.selected&&t.selected.KodeUser)+"\n              ")])]),t._v(" "),e("b-badge",{attrs:{variant:"primary"}},[t._v("\n              "+t._s(t.selected&&t.selected.jenisitem)+"\n            ")]),t._v(" "),e("h6",{staticClass:"mt-2 mb-0"},[t._v("\n              Deskripsi : "+t._s(t.selected&&t.selected.Keterangan)+"\n            ")]),t._v(" "),e("h6",{staticClass:"mt-2 mb-0"},[t._v("\n              Jumlah Stok : "+t._s(t.selected&&t.selected.Stok)+"\n            ")])],1),t._v(" "),e("div",{staticClass:"col text-right"},[e("h6",[t._v("\n              "+t._s(t._f("toDate")(t.selected&&t.selected.created_at))+"\n            ")])])]),t._v(" "),e("hr"),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"row mt-3"},t._l(t.selected.Stats,(function(dt,i){return e("div",{key:i,staticClass:"col-12 mt-2"},[e("b-card",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("h5",{staticClass:"mb-0"},[t._v("\n                    "+t._s(dt.NamaLokasi)+" ("+t._s(dt.KodeLokasi)+")\n                  ")])]),t._v(" "),e("div",{staticClass:"col-6 text-right"},[e("h4",{staticClass:"mb-0 text-primary"},[t._v("\n                    Stok "+t._s(dt.Stok||0)+"\n                  ")])])])])],1)})),0),t._v(" "),e("div",{staticClass:"row",staticStyle:{position:"absolute",bottom:"0",width:"100%"}},[e("div",{staticClass:"col-12 text-right"},[e("button",{staticClass:"btn btn-info btn-sm mb-3 mx-1",on:{click:t.onEdit}},[t._v("\n              Ubah\n            ")])])])]:[e("div",{staticClass:"v-center"},[t._v("\n          Silahkan memilih transaksi untuk melihat detail\n        ")])]],2)]),t._v(" "),e("inputFilter",{ref:"inputFilter",on:{submit:t.onFilterAdded}})],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[t("h6")])])},function(){var t=this._self._c;return t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[this._v("\n            Rincian Stok\n          ")])])}],!1,null,null,null);e.default=component.exports}}]);