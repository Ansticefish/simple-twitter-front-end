(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c9a5509c"],{"8b54":function(e,r,t){},e57b:function(e,r,t){"use strict";t("8b54")},e80b:function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-2 col-xl-2"},[t("SideBar")],1),t("div",{staticClass:"setting col-lg-7 col-xl-7"},[e._m(0),t("div",{staticClass:"setting__body"},[t("form",{staticClass:"setting__body__form",on:{submit:function(r){return r.stopPropagation(),r.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[t("div",{staticClass:"\n          setting__body__form__wrapper \n          mt-8"},[t("label",{attrs:{for:"setting__body__form__wrapper__account"}},[e._v(" 帳號 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.account,expression:"account"}],class:{error:e.a.error},attrs:{type:"text",name:"account",id:"setting__body__form__wrapper__account",placeholder:"請輸入帳號",required:"",autofocus:""},domProps:{value:e.account},on:{input:function(r){r.target.composing||(e.account=r.target.value)}}}),t("label",{staticClass:"error-message"},[e._v(" "+e._s(e.a.warning)+" ")]),t("label",{staticClass:"text-count"},[e._v(" "+e._s(e.account.length)+" / 50 ")])]),t("div",{staticClass:"\n            setting__body__form__wrapper \n            mt-6"},[t("label",{attrs:{for:"setting__body__form__wrapper__name"}},[e._v(" 名稱 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],class:{error:e.n.error},attrs:{type:"text",name:"name",id:"setting__body__form__wrapper__name",placeholder:"請輸入名稱",required:""},domProps:{value:e.name},on:{input:function(r){r.target.composing||(e.name=r.target.value)}}}),t("label",{staticClass:"error-message"},[e._v(" "+e._s(e.n.warning)+" ")]),t("label",{staticClass:"text-count"},[e._v(" "+e._s(e.name.length)+" / 50 ")])]),t("div",{staticClass:"\n            setting__body__form__wrapper \n            mt-6"},[t("label",{attrs:{for:"setting__body__form__wrapper__email"}},[e._v(" Email ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],class:{error:e.m.error},attrs:{type:"email",name:"email",id:"setting__body__form__wrapper__email",placeholder:"請輸入Email",required:""},domProps:{value:e.email},on:{input:function(r){r.target.composing||(e.email=r.target.value)}}}),t("label",{staticClass:"error-message"},[e._v(" "+e._s(e.m.warning)+" ")])]),t("div",{staticClass:"\n            setting__body__form__wrapper \n            mt-6"},[t("label",{attrs:{for:"setting__body__form__wrapper__password"}},[e._v(" 密碼 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],class:{error:e.p.error},attrs:{type:"password",name:"password",id:"setting__body__form__wrapper__password",placeholder:"請設定密碼",required:""},domProps:{value:e.password},on:{input:function(r){r.target.composing||(e.password=r.target.value)}}}),t("label",{staticClass:"error-message"},[e._v(" "+e._s(e.p.warning)+" ")])]),t("div",{staticClass:"\n            setting__body__form__wrapper \n            mt-6"},[t("label",{attrs:{for:"setting__body__form__wrapper__checkPassword"}},[e._v(" 密碼再確認 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.checkPassword,expression:"checkPassword"}],class:{error:e.cp.error},attrs:{type:"password",name:"checkPassword",id:"setting__body__form__wrapper__checkPassword",placeholder:"請再次輸入密碼",required:""},domProps:{value:e.checkPassword},on:{input:function(r){r.target.composing||(e.checkPassword=r.target.value)}}}),t("label",{staticClass:"error-message"},[e._v(" "+e._s(e.cp.warning)+" ")])]),t("button",{staticClass:"setting__body__form__btn--submit\n          mt-8 \n          mb-6",attrs:{id:"setting__body__form__btn--submit",disabled:e.isProcessing||e.a.warning.length>0||e.n.warning.length>0}},[e._v(" 儲存 ")])])])])])])},s=[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"setting__header"},[t("h4",[e._v("帳戶設定")])])}],n=t("1da1"),o=t("5530"),i=(t("96cf"),t("b0c0"),t("498a"),t("fb6a"),t("7c08")),c=t("2fa3"),_=t("2f62"),l=t("2708"),m=t("4cce"),d={name:"SettingPage",components:{SideBar:i["a"]},data:function(){return{account:"",name:"",email:"",password:"",checkPassword:"",a:{error:!1,warning:""},n:{error:!1,warning:""},m:{error:!1,warning:""},p:{error:!1,warning:""},cp:{error:!1,warning:""},isProcessing:!1}},mixins:[l["f"]],computed:Object(o["a"])({},Object(_["b"])(["currentUser"])),methods:{fetchCurrentUser:function(){var e=this.currentUser,r=e.account,t=e.name,a=e.email;this.account=r,this.name=t,this.email=a},handleSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var t,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(r.prev=0,e.isProcessing=!0,e.account.trim()&&e.name.trim()&&e.email.trim()&&e.password.trim()&&e.checkPassword.trim()){r.next=6;break}return c["a"].fire({title:"欄位不可空白",html:c["b"].redCrossHtml}),e.isProcessing=!1,r.abrupt("return");case 6:if(e.password===e.checkPassword){r.next=11;break}return c["a"].fire({title:"兩次密碼不同，請重新輸入",html:c["b"].redCrossHtml}),e.checkPassword="",e.isProcessing=!1,r.abrupt("return");case 11:return r.next=13,m["a"].editUserSetting({id:e.currentUser.id,account:e.account,name:e.name,email:e.email,password:e.password,checkPassword:e.checkPassword});case 13:c["a"].fire({title:"資料更新成功",html:c["b"].greenCheckHtml}),e.isProcessing=!1,e.$store.dispatch("fetchCurrentUser"),r.next=23;break;case 18:r.prev=18,r.t0=r["catch"](0),e.isProcessing=!1,t=r.t0.response.data.message,"Error:此 Email 已被註冊！"===t?c["a"].fire({title:"Email 已重複註冊！",html:c["b"].redCrossHtml}):"Error:此帳號已被註冊！"===t?c["a"].fire({title:"Account 已重複註冊！",html:c["b"].redCrossHtml}):t?(a=t.slice(6),c["a"].fire({title:"".concat(a),html:c["b"].redCrossHtml})):c["a"].fire({title:"資料更新失敗",html:c["b"].redCrossHtml});case 23:case"end":return r.stop()}}),r,null,[[0,18]])})))()}},created:function(){this.fetchCurrentUser()}},p=d,u=(t("e57b"),t("2877")),g=Object(u["a"])(p,a,s,!1,null,"56eea14a",null);r["default"]=g.exports}}]);
//# sourceMappingURL=chunk-c9a5509c.a9afb1c0.js.map