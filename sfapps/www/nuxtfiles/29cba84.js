(window.webpackJsonp=window.webpackJsonp||[]).push([[30,3],{535:function(t,e,n){t.exports=n.p+"img/logo.62dff6b.png"},538:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this._self._c;return t("div",{staticClass:"d-flex justify-content-center"},[t("div",{staticClass:"dev"},[t("img",{attrs:{src:n(535),width:"130"}})])])}],r={data:function(){return{}}},c=n(84),component=Object(c.a)(r,(function(){this._self._c;return this._m(0)}),o,!1,null,null,null);e.default=component.exports},544:function(t,e,n){var content=n(554);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(171).default)("688bfa3e",content,!0,{sourceMap:!1})},553:function(t,e,n){"use strict";n(544)},554:function(t,e,n){var o=n(170)((function(i){return i[1]}));o.push([t.i,"\n.card-login[data-v-f2de97ec] {\n  z-index: 5;\n  min-width: 30vw;\n  height: auto;\n  padding-bottom: 100px;\n}\n.btn-login[data-v-f2de97ec] {\n  position: absolute;\n  bottom: 0;\n  width: calc(100% - 30px);\n}\n",""]),o.locals={},t.exports=o},567:function(t,e,n){"use strict";n.r(e);n(25),n(32);var o={name:"Login",components:{dev:n(538).default},asyncData:function(t){t.isDev,t.route;var e=t.store;t.env,t.params,t.query,t.req,t.res,t.redirect,t.error;e.commit("uac/init")},data:function(){return{username:"",password:"",isLoading:!1,isCheck:!1}},created:function(){this.$store.state.uac.token&&this.onFetchConfig()},methods:{navigateTo:function(t,e){e?this.$router.push(t):this.$router.replace(t)},onLogin:function(){var t=this;this.isLoading=!0,this.$store.dispatch("uac/login",{username:this.username,password:this.password}).then((function(e){t.isLoading=!1,t.$store.commit("alert/setAlert",{type:"succeed",msg:"Login Berhasil"}),t.onFetchConfig()})).catch((function(e){console.error(e),t.isLoading=!1,t.password=null,t.$store.commit("alert/setAlert",{type:"fail",msg:"Login Gagal"})}))},onFetchConfig:function(){var t=this;this.isCheck=!0;var e=this;this.$store.dispatch("app/fetch",{params:{}}).then((function(e){t.isCheck=!0,t.navigateTo("/dashboard")})).catch((function(t){t.response&&401===t.response.status?(e.$store.commit("alert/setAlert",{type:"fail",msg:t.response&&t.response.statusText?t.response.statusText:"Failed"}),e.password=null,e.isCheck=!1):(e.$store.commit("alert/setAlert",{type:"fail",msg:t.response&&t.response.statusText?t.response.statusText:"Failed"}),e.isCheck=!1)}))}}},r=(n(553),n(84)),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"layout d-flex flex-column justify-content-center h-100"},[t.isCheck?e("div",[e("b-spinner",{staticClass:"mt-4",attrs:{variant:"primary",type:"grow",label:"Spinning"}})],1):e("div",{staticClass:"card card-login"},[e("div",{staticClass:"container mt-4"},[e("h4",{staticClass:"text-primary",on:{click:function(e){return t.navigateTo("/dashboard/setting")}}},[e("strong",[t._v("\n          Login\n        ")])]),t._v(" "),t._m(0),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),e("p",{staticClass:"mb-0 mt-3 text-primary"},[t._v("\n        Password\n      ")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),e("button",{staticClass:"btn btn-primary btn-block btn-login mb-4",on:{click:t.onLogin}},[t._v("\n        Login\n      ")])])]),t._v(" "),e("dev")],1)}),[function(){var t=this._self._c;return t("p",{staticClass:"text-primary mb-0 mt-3"},[t("strong",[this._v("\n          Username\n        ")])])}],!1,null,"f2de97ec",null);e.default=component.exports}}]);