(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[602],{9935:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/club/clubInfoEdit",function(){return o(2748)}])},2748:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return clubInfoEdit}});var n=o(5893),l=o(7294);let c=l.forwardRef(function({title:e,titleId:t,...o},n){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":t},o),e?l.createElement("title",{id:t},e):null,l.createElement("path",{fillRule:"evenodd",d:"M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z",clipRule:"evenodd"}))});var r=o(5848),i=o(2148),s=o(7646),a=o(3302),d=o(2132),u=o(779),h=o(2629),m=o(5121);async function upload(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,l=!(arguments.length>4)||void 0===arguments[4]||arguments[4],c=arguments.length>5&&void 0!==arguments[5]&&arguments[5],r=!0;c&&(r=confirm("您即將上傳！")),l&&""!=n&&r&&await m.Z.post(t,e,{withCredentials:!0}).then(e=>{"success"==e.data.message?(alert("成功！"),void 0!=o&&localStorage.removeItem(o),void 0!=n&&(window.location.href=n)):alert("失敗！")}).catch(e=>{alert("請求錯誤，請檢查網路。")})}var p=o(7536),_=o(8946),b=o(5785),v=o(3290);function clubInfoEdit(){var e,t;let[o,m]=(0,l.useState)(null),{register:x,handleSubmit:f,setValue:j,formState:{errors:g},watch:w,reset:N}=(0,p.cI)(),E=w("del_club_photos");(0,l.useEffect)(()=>{let e=(0,_.p2)({urlParamName:"club_num"});(0,b.Vq)(e,s.HT.CLUB_INFO_NUM,m,void 0,!0)},[]),(0,l.useEffect)(()=>{N({intro:(null==o?void 0:o.content.intro)||"",contact:(null==o?void 0:o.content.contact)||[]})},[o]);let onSubmit=async e=>{let t=new FormData;t.append("intro",w("intro")||""),(0,b.J9)(t,"contact",w("contact"),"array"),(0,b.J9)(t,"add_club_photos",w("add_club_photos"),"object"),(0,b.J9)(t,"del_club_photos",w("del_club_photos"),"array"),upload(t,s.eR+s.a4.CLUB_EDIT_INFO,void 0,"./clubInfo?club_num=".concat(null==o?void 0:o.content.club_num))};return(0,n.jsxs)(d.Mx,{title:"社團訊息編輯",children:[(0,n.jsx)(a.Z,{returnLocation:"./clubInfo?club_num=".concat(null==o?void 0:o.content.club_num),returnStr:"社團訊息"}),(0,n.jsxs)("form",{onSubmit:f(onSubmit),children:[(0,n.jsxs)(d.iG,{children:[(0,n.jsxs)(d.b0,{title:"基礎訊息",condition:!0,children:[(0,n.jsxs)("div",{children:[(0,n.jsx)(u.o,{children:"活動簡介"}),(0,n.jsx)("textarea",{placeholder:"活動簡介",className:"border-4 border-themeColor rounded-lg h-10 p-2 w-full h-20",...x("intro")})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(u.o,{children:"聯絡方式"}),(0,n.jsx)("ul",{children:null===(e=w("contact"))||void 0===e?void 0:e.map((e,t)=>void 0!=e.num&&(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:"flex flex-row gap-5 items-center mb-5",children:[(0,n.jsx)("input",{className:" border-4 border-themeColor rounded-lg h-10 p-2",placeholder:"聯絡方式",...x("contact.".concat(t,".type"))}),(0,n.jsx)("input",{className:" border-4 border-themeColor rounded-lg h-10 p-2",placeholder:"内容",...x("contact.".concat(t,".num"))}),(0,n.jsx)(c,{className:"w-10 h-10 text-alert hover:opacity-70 hover:cursor-pointer",onClick:()=>{j("contact",w("contact").filter((e,o)=>o!=t))}})]})},t))}),(0,n.jsx)(r.Z,{className:"w-10 h-10 text-themeColor hover:opacity-70 hover:cursor-pointer",onClick:()=>{j("contact",w("contact")?[...w("contact"),{type:"",num:""}]:[{type:"",num:""}])}}),(0,n.jsx)("br",{})]})]}),(0,n.jsxs)(d.b0,{title:"相關圖片",condition:!0,children:[(0,n.jsxs)("div",{children:[(0,n.jsx)(u.o,{children:"現有圖片"}),(0,n.jsx)("div",{className:"grid grid-cols-4 gap-4 items-top justify-center mt-5",children:null==o?void 0:o.content.club_photos_list.map((e,t)=>(0,n.jsx)("img",{src:s.a0+e,className:"w-40 h-24 rounded-md hover:scale-[1.05] transition-all hover:cursor-pointer ".concat(E&&-1!=E.indexOf(e)&&"opacity-70"),onClick:()=>{if(!E){j("del_club_photos",[e]);return}if(-1!=E.indexOf(e)){let[e,...t]=E;j("del_club_photos",t);return}j("del_club_photos",[...E,e])}},t))})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)(u.o,{children:"新增圖片"}),(0,n.jsx)(v.lS,{base:{regName:"add_club_photos",isRequired:!1,mode:"object",numLimit:5-(null==o?void 0:o.content.club_photos_list.length)+(E?E.length:0)},register:x,imgList:w("add_club_photos"),setValue:j,errText:"圖片總數不能超過5張！",thisErr:null===(t=g.add_club_photos)||void 0===t?void 0:t.message})]})]})]}),(0,n.jsx)(h.S,{children:(0,n.jsx)(h.b,{textContent:"上傳",Icon:i.Z})})]})]})}}},function(e){e.O(0,[885,206,536,876,753,774,888,179],function(){return e(e.s=9935)}),_N_E=e.O()}]);