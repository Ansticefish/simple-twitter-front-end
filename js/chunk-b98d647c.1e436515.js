(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b98d647c"],{1882:function(e,t,a){},"69ed":function(e,t,a){"use strict";a("1882")},f4a9:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.isLoading?a("Spinner"):e._e(),e.isLoading?e._e():a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-2 col-xl-2"},[a("SideBar",{on:{update:e.fetchPosts}})],1),a("div",{staticClass:"\r\n        home\r\n        col-lg-7 \r\n        col-xl-7"},[e._m(0),a("div",{staticClass:"home__createPost",on:{click:e.openCreateModal}},[a("CreatePostModal",{attrs:{currentUser:e.currentUser,isHome:!0}})],1),a("PostBlockShort",{attrs:{"initial-posts":e.posts}})],1),a("div",{staticClass:"\r\n       col-lg-3 \r\n       col-xl-3"},[a("PopularUsers")],1),e.openCreate?a("div",{staticClass:"modal-backdrop"},[a("CreatePostModal",{attrs:{currentUser:e.currentUser,isHome:!1},on:{closeCreateModal:e.closeCreateModal,"update-data":e.updateData}})],1):e._e()])])],1)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home__header"},[a("h4",[e._v("首頁")])])}],o=a("1da1"),n=a("5530"),c=(a("96cf"),a("7c08")),i=a("f963"),l=a("0e6d"),d=a("e770"),u=a("2f62"),p=a("684b"),f=a("2fa3"),h=a("2375"),C={name:"HomePage",components:{SideBar:c["a"],PopularUsers:i["a"],CreatePostModal:l["a"],PostBlockShort:d["a"],Spinner:h["a"]},data:function(){return{openCreate:!1,posts:[],isLoading:!0}},computed:Object(n["a"])({},Object(u["b"])(["currentUser"])),methods:{fetchPosts:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p["a"].getPosts();case 3:a=t.sent,s=a.data,e.posts=s,e.isLoading=!1,t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),f["a"].fire({title:"無法取得推文資料",html:f["b"].redCrossHtml});case 12:e.isLoading=!1;case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()},updateData:function(){this.fetchPosts()},openCreateModal:function(){this.openCreate=!0},closeCreateModal:function(){this.openCreate=!1}},created:function(){this.fetchPosts()}},m=C,v=(a("69ed"),a("2877")),P=Object(v["a"])(m,s,r,!1,null,"260e7b7a",null);t["default"]=P.exports}}]);
//# sourceMappingURL=chunk-b98d647c.1e436515.js.map