(window.webpackJsonp=window.webpackJsonp||[]).push([[23,3,4],{517:function(t,n,e){"use strict";e.r(n);e(41),e(25),e(32);var r={props:{title:{default:"Slimplan",type:String},subtitle:{default:"Home",type:String},refresh:{default:!1,type:Boolean}},data:function(){return{}},methods:{navigateTo:function(t,n){n?this.$router.push(t):this.$router.replace(t)},onLogout:function(){this.$store.commit("uac/logout"),this.navigateTo("/")}}},c=e(84),component=Object(c.a)(r,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"layout d-flex flex-column justify-content-center"},[n("div",{staticClass:"row p-3 bb-1 bg-primary",staticStyle:{position:"fixed",top:"0",width:"100%","z-index":"9"}},[n("div",{staticClass:"col text-left"},[n("h4",{staticClass:"text-white"},[n("strong",[t._v(t._s(t.title))])]),t._v(" "),n("h6",{staticClass:"text-white"},[t._v("\n        "+t._s(t.subtitle)+"\n      ")])]),t._v(" "),n("div",{staticClass:"col text-right"},["dashboard"===t.$route.name?n("button",{staticClass:"btn btn-danger btn-sm",on:{click:t.onLogout}},[t._v("\n        Logout\n      ")]):n("button",{staticClass:"btn btn-light btn-sm mr-2",on:{click:function(n){return t.$router.back()}}},[t._v("\n        Kembali\n      ")]),t._v(" "),t.refresh?n("button",{staticClass:"btn btn-info btn-sm mr-2",on:{click:function(n){return t.$emit("refreshed")}}},[t._v("\n        Refresh\n      ")]):t._e()])])])}),[],!1,null,null,null);n.default=component.exports},535:function(t,n,e){t.exports=e.p+"img/logo.62dff6b.png"},538:function(t,n,e){"use strict";e.r(n);var r=[function(){var t=this._self._c;return t("div",{staticClass:"d-flex justify-content-center"},[t("div",{staticClass:"dev"},[t("img",{attrs:{src:e(535),width:"130"}})])])}],c={data:function(){return{}}},o=e(84),component=Object(o.a)(c,(function(){this._self._c;return this._m(0)}),r,!1,null,null,null);n.default=component.exports},542:function(t,n,e){var content=e(550);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(171).default)("ddbe4f98",content,!0,{sourceMap:!1})},549:function(t,n,e){"use strict";e(542)},550:function(t,n,e){var r=e(170)((function(i){return i[1]}));r.push([t.i,"\n.card-menu {\n    height: 20vh;\n}\n",""]),r.locals={},t.exports=r},555:function(t,n,e){"use strict";e.r(n);e(25),e(32);var r=e(538),c={name:"Dashboard",components:{topbar:e(517).default,dev:r.default},data:function(){return{}},methods:{navigateTo:function(t,n){n?this.$router.push(t):this.$router.replace(t)},onCreateOutbound:function(){this.$store.commit("item/setSelected",null),this.navigateTo("dashboard/outbound/create",!0)},onCreateOrder:function(){this.$store.commit("item/setSelected",null),this.navigateTo("dashboard/cashier/create",!0)},onCreateProduct:function(){this.$store.commit("item/setSelected",null),this.navigateTo("dashboard/product/create",!0)}}},o=(e(549),e(84)),component=Object(o.a)(c,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"layout d-flex flex-column justify-content-center h-100"},[n("topbar",{attrs:{subtitle:"Home"}}),t._v(" "),n("div",{staticClass:"row mt-4 w-100"},[n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:t.onCreateOrder}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"file-earmark-plus-fill"}})],1),t._v(" "),t._m(0)])])]),t._v(" "),n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:function(n){return t.navigateTo("dashboard/cashier",!0)}}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"file-earmark-text-fill"}})],1),t._v(" "),t._m(1)])])]),t._v(" "),n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:function(n){return t.navigateTo("dashboard/return",!0)}}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"file-earmark-text-fill"}})],1),t._v(" "),t._m(2)])])]),t._v(" "),n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:t.onCreateOutbound}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"file-earmark-plus-fill"}})],1),t._v(" "),t._m(3)])])]),t._v(" "),n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:function(n){return t.navigateTo("dashboard/outbound",!0)}}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"file-earmark-text-fill"}})],1),t._v(" "),t._m(4)])])]),t._v(" "),n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:t.onCreateProduct}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"file-earmark-plus-fill"}})],1),t._v(" "),t._m(5)])])]),t._v(" "),n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:function(n){return t.navigateTo("dashboard/product",!0)}}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"file-earmark-text-fill"}})],1),t._v(" "),t._m(6)])])]),t._v(" "),n("div",{staticClass:"col-3 mt-3"},[n("div",{staticClass:"b-primary pb-3 text-center clickable",on:{click:function(n){return t.navigateTo("dashboard/setting",!0)}}},[n("div",{staticClass:"container mt-4 text-primary"},[n("h1",[n("b-icon",{attrs:{icon:"gear-fill"}})],1),t._v(" "),t._m(7)])])])]),t._v(" "),n("dev")],1)}),[function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Buat Transaksi\n            ")])])},function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Daftar Transaksi\n            ")])])},function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Daftar Retur\n            ")])])},function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Buat Mutasi\n            ")])])},function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Daftar Mutasi\n            ")])])},function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Tambah Produk\n            ")])])},function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Daftar Produk\n            ")])])},function(){var t=this._self._c;return t("h6",{staticClass:"mt-3"},[t("strong",[this._v("\n              Pengaturan\n            ")])])}],!1,null,null,null);n.default=component.exports}}]);