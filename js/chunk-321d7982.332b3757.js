(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-321d7982"],{"1fcc":function(e,t,r){},"4cce":function(e,t,r){"use strict";r("b0c0");var o=r("2fa3");t["a"]={getUsersTop:function(){return o["c"].get("/users/top")},getUser:function(e){var t=e.id;return o["c"].get("/users/".concat(t))},editUserProfile:function(e){var t=e.id,r=e.formData;return o["c"].put("/users/".concat(t),r,{headers:{"Content-Type":"multipart/form-data"}})},editUserSetting:function(e){var t=e.id,r=e.account,n=e.name,a=e.email,s=e.password,c=e.checkPassword;return o["c"].put("/users/".concat(t,"/setting"),{account:r,name:n,email:a,password:s,checkPassword:c})},getUserPosts:function(e){return o["c"].get("/users/".concat(e,"/tweets"))},getUserReplies:function(e){return o["c"].get("/users/".concat(e,"/replied_tweets"))},getUserLikes:function(e){return o["c"].get("/users/".concat(e,"/likes"))},userFollowings:function(e){return o["c"].get("/users/".concat(e,"/followings"))},userFollowers:function(e){return o["c"].get("/users/".concat(e,"/followers"))},followUser:function(e){return o["c"].post("/followships",{id:e})},unfollowUser:function(e){return o["c"].delete("/followships/".concat(e))}}},bc04:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}]},[r("FollowUsers",{attrs:{user:e.user,"initial-list":e.followList},on:{update:e.updateTop}})],1)},n=[],a=r("1da1"),s=(r("96cf"),r("a9e3"),r("c3f7")),c=r("4cce"),i=r("2fa3"),l={name:"FollowersPage",props:{user:{type:Object,required:!0},rerenderList:{type:Number,default:0}},components:{FollowUsers:s["a"]},data:function(){return{followList:[],isLoading:!0}},methods:{fetchFollowers:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var o,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,c["a"].userFollowers(e);case 3:o=r.sent,n=o.data,t.followList=n,n.length||i["a"].fire({title:"尚無追隨者",html:i["b"].yellowWarningHtml}),t.isLoading=!1,r.next=14;break;case 10:r.prev=10,r.t0=r["catch"](0),i["a"].fire({title:"無法取得資料",html:i["b"].redCrossHtml}),t.isLoading=!1;case 14:case"end":return r.stop()}}),r,null,[[0,10]])})))()},updateTop:function(){this.$emit("update")},rerender:function(){this.fetchFollowers(this.user.id)}},created:function(){var e=this.$route.params.id;this.fetchFollowers(e)},watch:{rerenderList:{handler:"rerender"}}},u=l,f=r("2877"),d=Object(f["a"])(u,o,n,!1,null,null,null);t["default"]=d.exports},bc0a:function(e,t,r){"use strict";r("1fcc")},c3f7:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._l(e.followList,(function(t,o){return r("div",{directives:[{name:"show",rawName:"v-show",value:e.followList.length>0,expression:"followList.length > 0"}],key:o,staticClass:"followBlock"},[r("img",{staticClass:"followBlock__avatar",attrs:{src:e._f("emptyAvatar")(t.avatar),alt:""},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.toPersonalPage(t.account)}}}),r("div",{staticClass:"followBlock__wrapper"},[r("div",{staticClass:"followBlock__wrapper__header"},[r("p",{staticClass:"followBlock__wrapper__header__name",on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.toPersonalPage(t.account)}}},[e._v(" "+e._s(t.name)+" ")]),t.account!==e.currentUser.account?[t.isFollowed?r("button",{staticClass:"followBlock__wrapper__header__btn--following",on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.removeFollow(t.account)}}},[e._v(" 正在跟隨 ")]):r("button",{staticClass:"followBlock__wrapper__header__btn--follow",on:{click:function(r){return r.stopPropagation(),r.preventDefault(),e.addFollow(t.account)}}},[e._v(" 跟隨 ")])]:e._e()],2),r("p",{staticClass:"followBlock__wrapper__content"},[e._v(" "+e._s(t.introduction)+" ")])])])})),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.followList.length,expression:"!followList.length"}],staticClass:"follow__empty"},[r("h5",[e._v(" "+e._s("follow-page-followers"===this.$route.name?"尚無追隨者":"尚無追蹤者")+" ")])])],2)},n=[],a=r("1da1"),s=r("5530"),c=(r("96cf"),r("4de4"),r("d3b7"),r("d81d"),r("fb6a"),r("4cce")),i=r("2fa3"),l=r("2f62"),u=r("2708"),f={name:"FollowUsers",props:{initialList:{type:Array,required:!0}},mixins:[u["b"]],data:function(){return{followList:[]}},computed:Object(s["a"])({},Object(l["b"])(["currentUser"])),methods:{fetchData:function(){this.followList=this.initialList},getUserId:function(e){var t=this.followList.filter((function(t){return t.account===e})),r=t[0].followingId||t[0].followerId;return r},toPersonalPage:function(e){var t=this.getUserId(e);this.$router.push({name:"personal-page-root",params:{id:t}})},addFollow:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var o,n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,o=t.getUserId(e),r.next=4,c["a"].followUser(o);case 4:t.followList=t.followList.map((function(t){return t.account===e?Object(s["a"])(Object(s["a"])({},t),{},{isFollowed:!0}):t})),t.$emit("update"),r.next=12;break;case 8:r.prev=8,r.t0=r["catch"](0),n=r.t0.response.data.message,n?(a=n.slice(6),i["a"].fire({title:"".concat(a),html:i["b"].redCrossHtml})):i["a"].fire({title:"追蹤失敗",html:i["b"].redCrossHtml});case 12:case"end":return r.stop()}}),r,null,[[0,8]])})))()},removeFollow:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var o,n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,o=t.getUserId(e),r.next=4,c["a"].unfollowUser(o);case 4:t.followList=t.followList.map((function(t){return t.account===e?Object(s["a"])(Object(s["a"])({},t),{},{isFollowed:!1}):t})),t.$emit("update"),r.next=12;break;case 8:r.prev=8,r.t0=r["catch"](0),n=r.t0.response.data.message,n?(a=n.slice(6),i["a"].fire({title:"".concat(a),html:i["b"].redCrossHtml})):i["a"].fire({title:"取消追蹤失敗",html:i["b"].redCrossHtml});case 12:case"end":return r.stop()}}),r,null,[[0,8]])})))()}},created:function(){this.fetchData()},watch:{initialList:{handler:"fetchData"}}},d=f,p=(r("bc0a"),r("2877")),w=Object(p["a"])(d,o,n,!1,null,"232875da",null);t["a"]=w.exports},d81d:function(e,t,r){"use strict";var o=r("23e7"),n=r("b727").map,a=r("1dde"),s=a("map");o({target:"Array",proto:!0,forced:!s},{map:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-321d7982.332b3757.js.map