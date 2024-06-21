"use strict";exports.id=80,exports.ids=[80],exports.modules={2132:(t,e,l)=>{l.d(e,{IF:()=>IF,Mx:()=>ARKMain,Tp:()=>IFELSE,b0:()=>ContentBlock,iG:()=>ContentBlockGrid});var i=l(997);l(6689);var n=l(779),a=l(961);let ARKMain=t=>(0,i.jsxs)("main",{children:[i.jsx("title",{children:t.title||"Untitled"}),i.jsx(a.Z,{className:t.className||"",children:t.children})]}),ContentBlock=t=>{let{condition:e,title:l,className:a,styles:o={withTitle:!0,withBackground:!0}}=t,{withTitle:r,withBackground:c}=o,d=`bg-white dark:bg-gray-800 border-l-4 border-themeColorLight px-5 pt-3 pb-5 rounded-lg drop-shadow-md itmes-center ${a||""}`;return(void 0==e||e)&&(0,i.jsxs)("div",{className:d,children:[r&&i.jsx(n.f,{children:l||"標題"}),t.children]})},ContentBlockGrid=t=>{let e=t.gridNum?t.gridNum:2;return i.jsx("div",{className:`lg:grid lg:grid-cols-${e} md:block gap-4 items-top justify-center mt-5`,children:t.children})},IF=t=>t.condition&&t.children,IFELSE=t=>t.condition?t.children[0]:t.children[1]},779:(t,e,l)=>{l.d(e,{f:()=>FirstTitle,o:()=>SecondTitle});var i=l(997);let n="text-xl font-bold text-themeColor",FirstTitle=t=>i.jsx("div",{className:"mb-3",children:i.jsx("h3",{className:n,children:t.children})}),SecondTitle=t=>i.jsx("div",{className:"mb-2 mt-3",children:i.jsx("h3",{className:n,children:t.children})})},8946:(t,e,l)=>{l.a(t,async(t,i)=>{try{l.d(e,{c8:()=>clubSignIn,p2:()=>authGuard});var n=l(9648),a=l(7104),o=l.n(a),r=l(7646),c=t([n]);n=(c.then?(await c)():c)[0];let block=t=>{alert(t||"請登錄賬號！"),window.location.href="/clubsignin"},authGuard=t=>{let{credentialName:e,urlParamName:l}=t;if(void 0==l)return block(`URL有誤, 請重新登錄。`),null;let i=o().parse(window.location.search,{ignoreQueryPrefix:!0});if(void 0==i[l])return block(`URL參數有誤, 請重新登錄。`),null;let n=localStorage.getItem(e||"club_token");return n?i[l]:(block("登錄認證過期，請重新登錄。"),null)},clubSignIn=async t=>{let e={account:t.account+"",password:t.password+""};if(!e.account||!e.password)return window.alert("請輸入賬號和密碼"),null;let l=r.eR+r.HT.CLUB_SIGN_IN;await n.default.post(l,o().stringify(e),{withCredentials:!0}).then(t=>{let e=t.data;if("success"==e.message)return localStorage.setItem("club_token",e.token),window.location.href=`./club/clubInfo?club_num=${e.content.club_num}`,e;console.log("登入失敗:",e),window.alert("登入失敗！請檢查賬號密碼是否正確。")}).catch(t=>(console.log(t),window.alert("網路錯誤！請聯係開發者"),null))};i()}catch(t){i(t)}})},1338:(t,e,l)=>{l.d(e,{Ag:()=>duplicateFile,FN:()=>squashDateTime,jZ:()=>JsonToFormData,k4:()=>parseTimeString,wG:()=>parseDateTime});let squashDateTime=(t,e,l)=>t+(l||" ")+e,parseDateTime=t=>({date:t.split(" ")[0],time:t.split(" ")[1].split("+")[0].slice(0,-3)}),parseTimeString=t=>{let e=new Date(t),l=e.getUTCFullYear().toString(),i=(e.getUTCMonth()+1).toString(),n=e.getUTCDate().toString(),a=e.getUTCHours(),o=a>9?a.toString():"0"+a.toString(),r=e.getUTCMinutes(),c=r>9?r.toString():"0"+r.toString();return{Year:l,Month:i,Day:n,Hour:o,Minute:c}},JsonToFormData=t=>{let e=new FormData;for(var l in t)e.append(l,t[l]);return e},duplicateFile=t=>{let e=`${t.name}_${Date.now()}`;return new File([t],e,{type:t.type})}},7646:(t,e,l)=>{l.d(e,{HT:()=>a,a0:()=>n,a4:()=>o,eR:()=>i}),l(2304);let i="https://umall.one/api/",n="https://umall.one",a={APP_INFO:"get_appInfo/",CLUB_SIGN_IN:"club_signin/",CLUB_INFO_ALL:"get_club_info/all",CLUB_INFO_NUM:"get_club_info/club_num/?club_num=",EVENT_INFO_ALL:"get_activity/all",EVENT_INFO_CLUB_NUM:"get_activity/club_num/?club_num=",EVENT_INFO_CLUB_NUM_P:"get_activity/club_num/",EVENT_INFO_EVENT_ID:"get_activity/id/?id=",FOLLOW_EVENT:"get_follow_activity/",FOLLOW_CLUB:"get_follow_club/",NOTICE:"get_notice/",NOTICE_MODE:{event:"activity/",club:"club/",all:"all/"}},o={STD_LOGIN:"student_signin/",CLUB_EDIT_INFO:"edit_club_info/",EVENT_CREATE:"create_activity/",EVENT_EDIT:"edit_activity/",EVENT_DEL:"delete_activity/",ADD_FOLLOW_EVENT:"student_add_follow_activity/",DEL_FOLLOW_EVENT:"student_del_follow_activity/",ADD_FOLLOW_CLUB:"student_add_follow_club/",DEL_FOLLOW_CLUB:"student_del_follow_club/",NOTICE_CREATE:"create_notice/"}}};