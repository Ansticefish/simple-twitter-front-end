(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e6c2066"],{"73cf":function(r,e,a){"use strict";a.r(e);var t=function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("div",{staticClass:"container"},[t("div",{staticClass:"row"},[t("div",{staticClass:"register col-lg-4 col-xl-4"},[t("img",{staticClass:"\n       register__logo \n       mt-8",attrs:{src:a("94c1")}}),t("h3",{staticClass:"\n       register__header \n       mt-6"},[r._v(" 建立你的帳號 ")]),t("form",{staticClass:"register__form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),r.handleSubmit.apply(null,arguments)}}},[t("div",{staticClass:"\n         register__form__wrapper \n         mt-8"},[t("label",{attrs:{for:"register__form__wrapper__account"}},[r._v(" 帳號 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.account,expression:"account"}],class:{error:r.a.error},attrs:{type:"text",name:"account",id:"register__form__wrapper__account",placeholder:"請輸入帳號",required:"",autofocus:""},domProps:{value:r.account},on:{input:function(e){e.target.composing||(r.account=e.target.value)}}}),t("label",{staticClass:"error-message"},[r._v(" "+r._s(r.a.warning)+" ")]),t("label",{staticClass:"text-count"},[r._v(" "+r._s(r.account.length)+" / 50 ")])]),t("div",{staticClass:"\n          register__form__wrapper \n          mt-6"},[t("label",{attrs:{for:"register__form__wrapper__name"}},[r._v(" 名稱 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.name,expression:"name"}],class:{error:r.n.error},attrs:{type:"text",name:"name",id:"register__form__wrapper__name",placeholder:"請輸入名稱",required:""},domProps:{value:r.name},on:{input:function(e){e.target.composing||(r.name=e.target.value)}}}),t("label",{staticClass:"error-message"},[r._v(" "+r._s(r.n.warning)+" ")]),t("label",{staticClass:"text-count"},[r._v(" "+r._s(r.name.length)+" / 50 ")])]),t("div",{staticClass:"\n          register__form__wrapper \n          mt-6"},[t("label",{attrs:{for:"register__form__wrapper__email"}},[r._v(" Email ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.email,expression:"email"}],class:{error:r.m.error},attrs:{type:"email",name:"email",id:"register__form__wrapper__email",placeholder:"請輸入Email",required:""},domProps:{value:r.email},on:{input:function(e){e.target.composing||(r.email=e.target.value)}}}),t("label",{staticClass:"error-message"},[r._v(" "+r._s(r.m.warning)+" ")])]),t("div",{staticClass:"\n          register__form__wrapper \n          mt-6"},[t("label",{attrs:{for:"register__form__wrapper__password"}},[r._v(" 密碼 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.password,expression:"password"}],class:{error:r.p.error},attrs:{type:"password",name:"password",id:"register__form__wrapper__password",placeholder:"請輸入密碼",required:""},domProps:{value:r.password},on:{input:function(e){e.target.composing||(r.password=e.target.value)}}}),t("label",{staticClass:"error-message"},[r._v(" "+r._s(r.p.warning)+" ")])]),t("div",{staticClass:"\n          register__form__wrapper \n          mt-6"},[t("label",{attrs:{for:"register__form__wrapper__checkPassword"}},[r._v(" 密碼確認 ")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.checkPassword,expression:"checkPassword"}],class:{error:r.cp.error},attrs:{type:"password",name:"checkPassword",id:"register__form__wrapper__checkPassword",placeholder:"請再次輸入密碼",required:""},domProps:{value:r.checkPassword},on:{input:function(e){e.target.composing||(r.checkPassword=e.target.value)}}}),t("label",{staticClass:"error-message"},[r._v(" "+r._s(r.cp.warning)+" ")])]),t("button",{staticClass:"register__form__btn--submit\n         mt-8 \n         mb-6",attrs:{disabled:r.isProcessing||r.a.warning.length>0||r.n.warning.length>0}},[r._v(" 註冊 ")])]),t("router-link",{staticClass:"register__link",attrs:{to:"/signin"}},[r._v(" 取消 ")])],1)])])},s=[],n=a("1da1"),i=(a("96cf"),a("498a"),a("b0c0"),a("fb6a"),a("2fa3")),o=a("2708"),c=a("7696"),l={name:"Register",data:function(){return{account:"",name:"",email:"",password:"",checkPassword:"",a:{error:!1,warning:""},n:{error:!1,warning:""},m:{error:!1,warning:""},p:{error:!1,warning:""},cp:{error:!1,warning:""},isProcessing:!1}},mixins:[o["f"]],methods:{handleSubmit:function(){var r=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,r.isProcessing=!0,r.account.trim()&&r.name.trim()&&r.email.trim()&&r.password.trim()&&r.checkPassword.trim()){e.next=6;break}return i["a"].fire({title:"欄位不可空白",html:i["b"].redCrossHtml}),r.isProcessing=!1,e.abrupt("return");case 6:if(r.password===r.checkPassword){e.next=13;break}return r.p.error=!0,r.p.warning="兩次密碼輸入不同",r.cp.error=!0,r.cp.warning="兩次密碼輸入不同",r.isProcessing=!1,e.abrupt("return");case 13:return e.next=15,c["a"].register({account:r.account,name:r.name,email:r.email,password:r.password,checkPassword:r.checkPassword});case 15:i["a"].fire({title:"已成功註冊！",html:i["b"].greenCheckHtml}),r.$router.push({name:"sign-in"}),e.next=38;break;case 19:if(e.prev=19,e.t0=e["catch"](0),r.isProcessing=!1,a=e.t0.response.data.message,"Error:此欄位不可空白！"!==a){e.next=27;break}i["a"].fire({title:"欄位不可空白",html:i["b"].redCrossHtml}),e.next=36;break;case 27:if("Error:密碼與確認密碼不符！"!==a){e.next=35;break}return r.p.error=!0,r.p.warning="兩次密碼輸入不同",r.cp.error=!0,r.cp.warning="兩次密碼輸入不同",e.abrupt("return");case 35:"Error:此 Email 已被註冊！"===a?i["a"].fire({title:"Email 已重複註冊！",html:i["b"].redCrossHtml}):"Error:此帳號已被註冊！"===a?i["a"].fire({title:"Account 已重複註冊！",html:i["b"].redCrossHtml}):a&&(t=a.slice(6),i["a"].fire({title:"".concat(t),html:i["b"].redCrossHtml}));case 36:r.password="",r.checkPassword="";case 38:case"end":return e.stop()}}),e,null,[[0,19]])})))()}}},m=l,_=(a("9428"),a("2877")),p=Object(_["a"])(m,t,s,!1,null,"03c40af5",null);e["default"]=p.exports},9428:function(r,e,a){"use strict";a("98ec")},"98ec":function(r,e,a){}}]);
//# sourceMappingURL=chunk-7e6c2066.7a13322d.js.map