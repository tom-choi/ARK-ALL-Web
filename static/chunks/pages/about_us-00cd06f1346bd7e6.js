(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[40],{2366:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about_us",function(){return a(4708)}])},6152:function(e,n,a){"use strict";var c=a(5893),f=a(7294),h=a(2010);n.Z=()=>{let[e,n]=(0,f.useState)(!1),{theme:a,setTheme:g}=(0,h.F)();return((0,f.useEffect)(()=>n(!0),[]),e)?(0,c.jsx)("div",{className:"flex items-center m-2",children:"dark"===a?(0,c.jsxs)("button",{onClick:()=>g("light"),className:"text-gray-300 rounded-full outline-none focus:outline-none",children:[(0,c.jsx)("span",{className:"sr-only",children:"Light Mode"}),(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-5 h-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,c.jsx)("path",{d:"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"})})]}):(0,c.jsxs)("button",{onClick:()=>g("dark"),className:"text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20",children:[(0,c.jsx)("span",{className:"sr-only",children:"Dark Mode"}),(0,c.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,c.jsx)("circle",{cx:"12",cy:"12",r:"5"}),(0,c.jsx)("path",{d:"M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"})]})]})}):null}},9834:function(e,n,a){"use strict";var c=a(5893),f=a(7294);a(2010);var h=a(7421);n.Z=()=>{let{t:e,i18n:n}=(0,h.$G)(),[a,g]=(0,f.useState)("zh");(0,f.useEffect)(()=>g(n.language),[n.language]);let handleLanguageChange=e=>{let a=e.target.value;g(a),n.changeLanguage(a)};return(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex font-bold justify-between items-center w-24",children:[(0,c.jsx)("button",{onClick:handleLanguageChange,value:"zh",className:"hover:text-themeColor",children:"中"}),(0,c.jsx)("button",{onClick:handleLanguageChange,value:"en",className:"hover:text-themeColor",children:"EN"}),(0,c.jsx)("button",{onClick:handleLanguageChange,value:"ja",className:"hover:text-themeColor",children:"日"})]}),"zh"===n.language&&(0,c.jsx)("div",{className:"text-sm",children:(0,c.jsx)("h1",{children:"語言：中文"})}),"en"===n.language&&(0,c.jsx)("div",{className:"text-sm",children:(0,c.jsx)("h1",{children:"Language: English"})}),"ja"===n.language&&(0,c.jsx)("div",{className:"text-sm",children:(0,c.jsx)("h1",{children:"言語：日本語"})})]})}},961:function(e,n,a){"use strict";var c=a(5893);a(7294),n.Z=e=>(0,c.jsx)("div",{className:"container p-8 mx-auto xl:px-0 ".concat(e.className?e.className:""),children:e.children})},4505:function(e,n,a){"use strict";a.d(n,{Z:function(){return Footer}});var c=a(5893),f=a(1664),h=a.n(f),g=a(5675),p=a.n(g);a(7294);var v=a(961),j=a(7421),w=a(1163);function Footer(){let e=(0,w.useRouter)(),navigateToPage=n=>{e.push(n)},{t:n}=(0,j.$G)();return(0,c.jsx)("div",{className:"relative",children:(0,c.jsxs)(v.Z,{children:[(0,c.jsxs)("div",{className:"grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5",children:[(0,c.jsxs)("div",{className:"lg:col-span-2",children:[(0,c.jsxs)("div",{children:[" ",(0,c.jsx)(h(),{href:"/",children:(0,c.jsxs)("span",{className:"flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100",children:[(0,c.jsx)("span",{children:(0,c.jsx)(p(),{src:"/img/logo.png",alt:"N",width:"32",height:"32",className:"w-8 rounded-md"})}),(0,c.jsx)("span",{className:"text-themeColor font-bold",children:"ARK ALL"})]})})]}),(0,c.jsx)("div",{className:"max-w-md mt-4 text-gray-500 dark:text-gray-400"})]}),(0,c.jsx)("div",{children:(0,c.jsx)("div",{className:"flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0",children:["Tutorial","QA","User_Agreement","About_us"].map((e,a)=>(0,c.jsx)(h(),{href:"/",className:"w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-themeColor hover:bg-themeColorUltraLight focus:text-themeColor focus:bg-themeColorUltraLight focus:outline-none dark:hover:text-themeColor dark:hover:bg-gray-800 dark:focus:bg-gray-800",onClick:()=>navigateToPage("/"+e.toLowerCase()),children:n(e)},a))})}),(0,c.jsx)("div",{children:(0,c.jsx)("div",{className:"flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0",children:["Terms","Privacy","Legal"].map((e,a)=>(0,c.jsx)(h(),{href:"/",className:"w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-themeColor hover:bg-themeColorUltraLight focus:text-indigo-500 focus:bg-themeColorUltraLight focus:outline-none dark:hover:text-themeColor dark:hover:bg-gray-800 dark:focus:bg-trueGray-700",onClick:()=>navigateToPage("/"+e.toLowerCase()),children:n(e)},a))})}),(0,c.jsxs)("div",{className:"",children:[(0,c.jsx)("div",{children:n("Follow us")}),(0,c.jsxs)("div",{className:"flex mt-5 space-x-5 text-gray-400 dark:text-gray-500",children:[(0,c.jsxs)("a",{className:"hover:opacity-50",href:"https://twitter.com",target:"_blank",rel:"noopener",children:[(0,c.jsx)("span",{className:"sr-only",children:"Twitter"}),(0,c.jsx)(Twitter,{})]}),(0,c.jsxs)("a",{className:"hover:opacity-50",href:"https://facebook.com",target:"_blank",rel:"noopener",children:[(0,c.jsx)("span",{className:"sr-only",children:"Facebook"}),(0,c.jsx)(Facebook,{})]}),(0,c.jsxs)("a",{className:"hover:opacity-50",href:"https://instagram.com",target:"_blank",rel:"noopener",children:[(0,c.jsx)("span",{className:"sr-only",children:"Instagram"}),(0,c.jsx)(Instagram,{})]}),(0,c.jsxs)("a",{className:"hover:opacity-50",href:"https://github.com/UM-ARK",target:"_blank",rel:"noopener",children:[(0,c.jsx)("span",{className:"sr-only",children:"Github"}),(0,c.jsx)(Github,{})]})]})]})]}),(0,c.jsxs)("div",{className:"my-10 text-sm text-center text-gray-600 dark:text-gray-400",children:["Copyright \xa9 ",new Date().getFullYear(),". Made with ♥ by"," ",(0,c.jsx)("a",{className:"hover:opacity-50",href:"https://github.com/UM-ARK",target:"_blank",rel:"noopener",children:"ARK All."})," "]})]})})}let Twitter=e=>{let{size:n=24}=e;return(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:"currentColor",children:(0,c.jsx)("path",{d:"M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z"})})},Facebook=e=>{let{size:n=24}=e;return(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:"currentColor",children:(0,c.jsx)("path",{d:"M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"})})},Instagram=e=>{let{size:n=24}=e;return(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 24 24",fill:"currentColor",children:(0,c.jsx)("path",{d:"M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"})})},Github=e=>{let{size:n=24}=e;return(0,c.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,viewBox:"0 0 64 64",xmlnsXlink:"http://www.w3.org/1999/xlink",children:[(0,c.jsx)("path",{d:"M32 0a32.021 32.021 0 0 0-10.1 62.4c1.6.3 2.2-.7 2.2-1.5v-6c-8.9 1.9-10.8-3.8-10.8-3.8-1.5-3.7-3.6-4.7-3.6-4.7-2.9-2 .2-1.9.2-1.9 3.2.2 4.9 3.3 4.9 3.3 2.9 4.9 7.5 3.5 9.3 2.7a6.93 6.93 0 0 1 2-4.3c-7.1-.8-14.6-3.6-14.6-15.8a12.27 12.27 0 0 1 3.3-8.6 11.965 11.965 0 0 1 .3-8.5s2.7-.9 8.8 3.3a30.873 30.873 0 0 1 8-1.1 30.292 30.292 0 0 1 8 1.1c6.1-4.1 8.8-3.3 8.8-3.3a11.965 11.965 0 0 1 .3 8.5 12.1 12.1 0 0 1 3.3 8.6c0 12.3-7.5 15-14.6 15.8a7.746 7.746 0 0 1 2.2 5.9v8.8c0 .9.6 1.8 2.2 1.5A32.021 32.021 0 0 0 32 0z","data-name":"layer2",fill:"currentColor"}),(0,c.jsx)("path",{d:"M12.1 45.9c-.1.2-.3.2-.5.1s-.4-.3-.3-.5.3-.2.6-.1c.2.2.3.4.2.5zm1.3 1.5a.589.589 0 0 1-.8-.8.631.631 0 0 1 .7.1.494.494 0 0 1 .1.7zm1.3 1.8a.585.585 0 0 1-.7-.3.6.6 0 0 1 0-.8.585.585 0 0 1 .7.3c.2.3.2.7 0 .8zm1.7 1.8c-.2.2-.5.1-.8-.1-.3-.3-.4-.6-.2-.8a.619.619 0 0 1 .8.1.554.554 0 0 1 .2.8zm2.4 1c-.1.3-.4.4-.8.3s-.6-.4-.5-.7.4-.4.8-.3c.3.2.6.5.5.7zm2.6.2c0 .3-.3.5-.7.5s-.7-.2-.7-.5.3-.5.7-.5c.4.1.7.3.7.5zm2.4-.4q0 .45-.6.6a.691.691 0 0 1-.8-.3q0-.45.6-.6c.5-.1.8.1.8.3z","data-name":"layer1",fill:"currentColor"})]})}},3247:function(e,n,a){"use strict";var c=a(5893),f=a(1664),h=a.n(f),g=a(6152),p=a(5675),v=a.n(p),j=a(9167),w=a(9834),b=a(7421),N=a(1163);a(2304),n.Z=()=>{let e=(0,N.useRouter)(),navigateToPage=n=>{e.push(n)},{t:n}=(0,b.$G)(),a=["ClubSignin","Tutorial","QA","User_Agreement","About_us"];return(0,c.jsxs)("div",{className:"w-full",children:[(0,c.jsxs)("nav",{className:"container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0",children:[(0,c.jsx)(j.p,{children:e=>{let{open:f}=e;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between w-full lg:w-auto",children:[(0,c.jsx)(h(),{href:"/",children:(0,c.jsxs)("span",{className:"flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100",children:[(0,c.jsx)("span",{children:(0,c.jsx)(v(),{src:"/img/logo.png",alt:"N",width:"32",height:"32",className:"w-8 rounded-md"})}),(0,c.jsx)("span",{className:"text-themeColor font-bold",children:"ARK ALL"})]})}),(0,c.jsx)(j.p.Button,{"aria-label":"Toggle Menu",className:"px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover: text-text-indigo-500 focus:text-themeColor focus:bg-themeColorUltraLight focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700",children:(0,c.jsxs)("svg",{className:"w-6 h-6 fill-current",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[f&&(0,c.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"}),!f&&(0,c.jsx)("path",{fillRule:"evenodd",d:"M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"})]})}),(0,c.jsx)(j.p.Panel,{className:"flex flex-wrap w-full my-5 lg:hidden",children:(0,c.jsx)(c.Fragment,{children:a.map((e,a)=>(0,c.jsx)(h(),{href:"/".concat(e.toLowerCase()),className:"w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-200 hover:text-themeColor hover:bg-themeColorUltraLight dark:hover:text-themeColor dark:hover:bg-gray-800 focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800",onClick:()=>navigateToPage("/"+e.toLowerCase()),children:n(e)}))})})]})})}}),(0,c.jsx)("div",{className:"hidden text-center lg:flex lg:items-center",children:(0,c.jsx)("ul",{className:"items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex",children:a.map((e,a)=>(0,c.jsx)("li",{className:"mr-3 nav__item",children:(0,c.jsx)(h(),{href:"/".concat(e.toLowerCase()),className:"inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-themeColor hover:bg-themeColorUltraLight dark:hover:text-themeColor dark:hover:bg-gray-800 focus:text-themeColor focus:bg-themeColorUltraLignt focus:outline-none dark:focus:bg-gray-800",onClick:()=>navigateToPage("/"+e.toLowerCase()),children:n(e)})},a))})}),(0,c.jsxs)("div",{className:"hidden mr-3 space-x-4 lg:flex nav__item",children:[(0,c.jsx)(g.Z,{}),(0,c.jsx)(w.Z,{})]})]}),!1]})}},4708:function(e,n,a){"use strict";a.r(n);var c=a(5893);a(7294);var f=a(3247),h=a(4505),g=a(961);n.default=()=>(0,c.jsxs)("div",{className:"relative",children:[(0,c.jsx)(f.Z,{}),(0,c.jsx)(g.Z,{children:(0,c.jsxs)("div",{className:"block flex-wrap w-full -mt-2 -ml-3 lg:ml-0",children:[(0,c.jsx)("h1",{style:{fontWeight:"600",fontSize:"30px",textAlign:"center",marginBottom:"30px",color:"#328ad1"},children:"關於ARK ALL"}),(0,c.jsxs)("ul",{className:"space-y-8",children:[(0,c.jsx)("li",{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("h2",{className:"font-bold text-xl",children:"ARK ALL 的由來？"}),(0,c.jsx)("p",{children:"   ARK ALL 是 2022 年暑假，幾位不知名的 FST 同學奮戰兩個月做出來的，整個應用全程都是由我們自主開發，其中都踩了不少坑，掉了不少頭髮 QAQ。 ARK ALL 的前身是 ARK 微信小程式，該小程式已集成 ARK 學術分享會發佈、UM 校園巴士等功能，也是首次由第三方聯合 FST 的眾學會、社團，為如今的 ARK ALL 運作模式提供了寶貴的經驗。 小程式於 21 年 9 月發佈，22 年 4 月停運，2 個月後作者與這幾位不知名同學正式成立新 ARK 開發團隊，ARK ALL 項目正式立項開始開發。"})]})}),(0,c.jsx)("li",{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("h2",{className:"font-bold text-xl",children:"ARK ALL 免費嗎？"}),(0,c.jsx)("p",{children:"   ARK ALL 為免費軟件，組織申請進駐也無需費用。作者為愛發電 ing。。。希望 ARK ALL 能越來越壯大，最後能真正包羅 UM 的所有。同學們的喜歡與讚揚就是對作者最大的支持~~"})]})}),(0,c.jsx)("li",{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("h2",{className:"font-bold text-xl",children:"ARK ALL是澳大官方應用程式嗎？"}),(0,c.jsx)("p",{children:"   非也~ 至少在作者寫下這段文字時仍不是。如有改善 ARK ALL 的功能和體驗的方法、渠道，開發者團隊都會盡力去嘗試的！"})]})}),(0,c.jsx)("li",{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("h2",{className:"font-bold text-xl",children:"那幾位不知名的同學是？"}),(0,c.jsxs)("p",{children:["   ARK ALL 第一批代碼貢獻者： ",(0,c.jsx)("br",{}),"   Rookie, yyyyyyounger ",(0,c.jsx)("br",{}),"   Tony, tony153 ",(0,c.jsx)("br",{}),"   Box, BoxMars ",(0,c.jsx)("br",{}),"   Syukugen, Syukugen ",(0,c.jsx)("br",{}),"   Kalo, K4Lok ",(0,c.jsx)("br",{}),"   Kelvin, keltam27 ",(0,c.jsx)("br",{}),"  YZ Huang 為第一版的 UI 設計師，製作了大部分的設計稿。 kevin、Mega、Mane、Ray 等大佬都提供了友情技術支援。"]})]})}),(0,c.jsxs)("li",{children:[(0,c.jsx)("h2",{className:"font-bold text-xl",children:"Add Drop不能正常使用"}),(0,c.jsx)("p",{children:" 因為澳大系統的固有設計問題，例如 Add Drop 此類網頁會需要彈窗操作，盡量在電腦上操作會更便利。因此留下複製鏈接和在瀏覽器打開的功能。該功能主要是為新同學準備，初來乍到並不知道舊生所講的服務是何，ARK ALL 可以讓同學對澳大服務先有直觀的了解。"})]})]})]})}),(0,c.jsx)(h.Z,{})]})},2304:function(e,n,a){},9167:function(e,n,a){"use strict";a.d(n,{p:function(){return V}});var c,f,h,g,p,v=a(7294),j=a(3781),w=a(7896),b=a(6723),N=a(2180);let A=null!=(g=v.useId)?g:function(){let e=(0,N.H)(),[n,a]=v.useState(e?()=>w.O.nextId():null);return(0,b.e)(()=>{null===n&&a(w.O.nextId())},[n]),null!=n?""+n:void 0};function i(e){var n;if(e.type)return e.type;let a=null!=(n=e.as)?n:"button";if("string"==typeof a&&"button"===a.toLowerCase())return"button"}var L=a(3784),E=a(6567),S=a(2984),P=a(2351);let M=null!=(p=v.startTransition)?p:function(e){e()};var O=((c=O||{}).Space=" ",c.Enter="Enter",c.Escape="Escape",c.Backspace="Backspace",c.Delete="Delete",c.ArrowLeft="ArrowLeft",c.ArrowUp="ArrowUp",c.ArrowRight="ArrowRight",c.ArrowDown="ArrowDown",c.Home="Home",c.End="End",c.PageUp="PageUp",c.PageDown="PageDown",c.Tab="Tab",c),D=((f=D||{})[f.Open=0]="Open",f[f.Closed=1]="Closed",f),z=((h=z||{})[h.ToggleDisclosure=0]="ToggleDisclosure",h[h.CloseDisclosure=1]="CloseDisclosure",h[h.SetButtonId=2]="SetButtonId",h[h.SetPanelId=3]="SetPanelId",h[h.LinkPanel=4]="LinkPanel",h[h.UnlinkPanel=5]="UnlinkPanel",h);let H={0:e=>({...e,disclosureState:(0,S.E)(e.disclosureState,{0:1,1:0})}),1:e=>1===e.disclosureState?e:{...e,disclosureState:1},4:e=>!0===e.linkedPanel?e:{...e,linkedPanel:!0},5:e=>!1===e.linkedPanel?e:{...e,linkedPanel:!1},2:(e,n)=>e.buttonId===n.buttonId?e:{...e,buttonId:n.buttonId},3:(e,n)=>e.panelId===n.panelId?e:{...e,panelId:n.panelId}},B=(0,v.createContext)(null);function _(e){let n=(0,v.useContext)(B);if(null===n){let n=Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,_),n}return n}B.displayName="DisclosureContext";let Z=(0,v.createContext)(null);Z.displayName="DisclosureAPIContext";let $=(0,v.createContext)(null);function ee(e,n){return(0,S.E)(n.type,H,e,n)}$.displayName="DisclosurePanelContext";let Y=v.Fragment,G=P.AN.RenderStrategy|P.AN.Static,V=Object.assign((0,P.yV)(function(e,n){let{defaultOpen:a=!1,...c}=e,f=(0,v.useRef)(null),h=(0,L.T)(n,(0,L.h)(e=>{f.current=e},void 0===e.as||e.as===v.Fragment)),g=(0,v.useRef)(null),p=(0,v.useRef)(null),b=(0,v.useReducer)(ee,{disclosureState:a?0:1,linkedPanel:!1,buttonRef:p,panelRef:g,buttonId:null,panelId:null}),[{disclosureState:N,buttonId:A},M]=b,O=(0,j.z)(e=>{M({type:1});let n=w.O.isServer?null:f instanceof Node?f.ownerDocument:null!=f&&f.hasOwnProperty("current")&&f.current instanceof Node?f.current.ownerDocument:document;if(!n||!A)return;let a=e?e instanceof HTMLElement?e:e.current instanceof HTMLElement?e.current:n.getElementById(A):n.getElementById(A);null==a||a.focus()}),D=(0,v.useMemo)(()=>({close:O}),[O]),z=(0,v.useMemo)(()=>({open:0===N,close:O}),[N,O]);return v.createElement(B.Provider,{value:b},v.createElement(Z.Provider,{value:D},v.createElement(E.up,{value:(0,S.E)(N,{0:E.ZM.Open,1:E.ZM.Closed})},(0,P.sY)({ourProps:{ref:h},theirProps:c,slot:z,defaultTag:Y,name:"Disclosure"}))))}),{Button:(0,P.yV)(function(e,n){let a=A(),{id:c=`headlessui-disclosure-button-${a}`,...f}=e,[h,g]=_("Disclosure.Button"),p=(0,v.useContext)($),w=null!==p&&p===h.panelId,N=(0,v.useRef)(null),E=(0,L.T)(N,n,w?null:h.buttonRef),S=(0,P.Y2)();(0,v.useEffect)(()=>{if(!w)return g({type:2,buttonId:c}),()=>{g({type:2,buttonId:null})}},[c,g,w]);let M=(0,j.z)(e=>{var n;if(w){if(1===h.disclosureState)return;switch(e.key){case O.Space:case O.Enter:e.preventDefault(),e.stopPropagation(),g({type:0}),null==(n=h.buttonRef.current)||n.focus()}}else switch(e.key){case O.Space:case O.Enter:e.preventDefault(),e.stopPropagation(),g({type:0})}}),D=(0,j.z)(e=>{e.key===O.Space&&e.preventDefault()}),z=(0,j.z)(n=>{var a;(function(e){let n=e.parentElement,a=null;for(;n&&!(n instanceof HTMLFieldSetElement);)n instanceof HTMLLegendElement&&(a=n),n=n.parentElement;let c=(null==n?void 0:n.getAttribute("disabled"))==="";return!(c&&function(e){if(!e)return!1;let n=e.previousElementSibling;for(;null!==n;){if(n instanceof HTMLLegendElement)return!1;n=n.previousElementSibling}return!0}(a))&&c})(n.currentTarget)||e.disabled||(w?(g({type:0}),null==(a=h.buttonRef.current)||a.focus()):g({type:0}))}),H=(0,v.useMemo)(()=>({open:0===h.disclosureState}),[h]),B=function(e,n){let[a,c]=(0,v.useState)(()=>i(e));return(0,b.e)(()=>{c(i(e))},[e.type,e.as]),(0,b.e)(()=>{a||n.current&&n.current instanceof HTMLButtonElement&&!n.current.hasAttribute("type")&&c("button")},[a,n]),a}(e,N),Z=w?{ref:E,type:B,onKeyDown:M,onClick:z}:{ref:E,id:c,type:B,"aria-expanded":0===h.disclosureState,"aria-controls":h.linkedPanel?h.panelId:void 0,onKeyDown:M,onKeyUp:D,onClick:z};return(0,P.sY)({mergeRefs:S,ourProps:Z,theirProps:f,slot:H,defaultTag:"button",name:"Disclosure.Button"})}),Panel:(0,P.yV)(function(e,n){let a=A(),{id:c=`headlessui-disclosure-panel-${a}`,...f}=e,[h,g]=_("Disclosure.Panel"),{close:p}=function K(e){let n=(0,v.useContext)(Z);if(null===n){let n=Error(`<${e} /> is missing a parent <Disclosure /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,K),n}return n}("Disclosure.Panel"),j=(0,P.Y2)(),w=(0,L.T)(n,h.panelRef,e=>{M(()=>g({type:e?4:5}))});(0,v.useEffect)(()=>(g({type:3,panelId:c}),()=>{g({type:3,panelId:null})}),[c,g]);let b=(0,E.oJ)(),N=null!==b?(b&E.ZM.Open)===E.ZM.Open:0===h.disclosureState,S=(0,v.useMemo)(()=>({open:0===h.disclosureState,close:p}),[h,p]);return v.createElement($.Provider,{value:h.panelId},(0,P.sY)({mergeRefs:j,ourProps:{ref:w,id:c},theirProps:f,slot:S,defaultTag:"div",features:G,visible:N,name:"Disclosure.Panel"}))})})},3781:function(e,n,a){"use strict";a.d(n,{z:function(){return o}});var c=a(7294),f=a(3855);let o=function(e){let n=(0,f.E)(e);return c.useCallback((...e)=>n.current(...e),[n])}},6723:function(e,n,a){"use strict";a.d(n,{e:function(){return l}});var c=a(7294),f=a(7896);let l=(e,n)=>{f.O.isServer?(0,c.useEffect)(e,n):(0,c.useLayoutEffect)(e,n)}},3855:function(e,n,a){"use strict";a.d(n,{E:function(){return s}});var c=a(7294),f=a(6723);function s(e){let n=(0,c.useRef)(e);return(0,f.e)(()=>{n.current=e},[e]),n}},2180:function(e,n,a){"use strict";a.d(n,{H:function(){return l}});var c,f=a(7294),h=a(7896);function l(){let e;let n=(e="undefined"==typeof document,(0,(c||(c=a.t(f,2))).useSyncExternalStore)(()=>()=>{},()=>!1,()=>!e)),[g,p]=f.useState(h.O.isHandoffComplete);return g&&!1===h.O.isHandoffComplete&&p(!1),f.useEffect(()=>{!0!==g&&p(!0)},[g]),f.useEffect(()=>h.O.handoff(),[]),!n&&g}},3784:function(e,n,a){"use strict";a.d(n,{T:function(){return y},h:function(){return T}});var c=a(7294),f=a(3781);let h=Symbol();function T(e,n=!0){return Object.assign(e,{[h]:n})}function y(...e){let n=(0,c.useRef)(e);(0,c.useEffect)(()=>{n.current=e},[e]);let a=(0,f.z)(e=>{for(let a of n.current)null!=a&&("function"==typeof a?a(e):a.current=e)});return e.every(e=>null==e||(null==e?void 0:e[h]))?void 0:a}},6567:function(e,n,a){"use strict";a.d(n,{ZM:function(){return g},oJ:function(){return u},up:function(){return s}});var c,f=a(7294);let h=(0,f.createContext)(null);h.displayName="OpenClosedContext";var g=((c=g||{})[c.Open=1]="Open",c[c.Closed=2]="Closed",c[c.Closing=4]="Closing",c[c.Opening=8]="Opening",c);function u(){return(0,f.useContext)(h)}function s({value:e,children:n}){return f.createElement(h.Provider,{value:e},n)}},4067:function(e,n,a){"use strict";function t(...e){return Array.from(new Set(e.flatMap(e=>"string"==typeof e?e.split(" "):[]))).filter(Boolean).join(" ")}a.d(n,{A:function(){return t}})},7896:function(e,n,a){"use strict";a.d(n,{O:function(){return f}});var c=Object.defineProperty,d=(e,n,a)=>n in e?c(e,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[n]=a,r=(e,n,a)=>(d(e,"symbol"!=typeof n?n+"":n,a),a);let f=new class{constructor(){r(this,"current",this.detect()),r(this,"handoffState","pending"),r(this,"currentId",0)}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"undefined"==typeof window||"undefined"==typeof document?"server":"client"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}}},2984:function(e,n,a){"use strict";function u(e,n,...a){if(e in n){let c=n[e];return"function"==typeof c?c(...a):c}let c=Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(c,u),c}a.d(n,{E:function(){return u}})},2351:function(e,n,a){"use strict";a.d(n,{AN:function(){return v},Y2:function(){return I},l4:function(){return j},sY:function(){return C},yV:function(){return U}});var c,f,h=a(7294),g=a(4067),p=a(2984),v=((c=v||{})[c.None=0]="None",c[c.RenderStrategy=1]="RenderStrategy",c[c.Static=2]="Static",c),j=((f=j||{})[f.Unmount=0]="Unmount",f[f.Hidden=1]="Hidden",f);function C({ourProps:e,theirProps:n,slot:a,defaultTag:c,features:f,visible:h=!0,name:g,mergeRefs:v}){v=null!=v?v:k;let j=R(n,e);if(h)return m(j,a,c,g,v);let w=null!=f?f:0;if(2&w){let{static:e=!1,...n}=j;if(e)return m(n,a,c,g,v)}if(1&w){let{unmount:e=!0,...n}=j;return(0,p.E)(e?0:1,{0:()=>null,1:()=>m({...n,hidden:!0,style:{display:"none"}},a,c,g,v)})}return m(j,a,c,g,v)}function m(e,n={},a,c,f){let{as:p=a,children:v,refName:j="ref",...w}=F(e,["unmount","static"]),b=void 0!==e.ref?{[j]:e.ref}:{},N="function"==typeof v?v(n):v;"className"in w&&w.className&&"function"==typeof w.className&&(w.className=w.className(n));let A={};if(n){let e=!1,a=[];for(let[c,f]of Object.entries(n))"boolean"==typeof f&&(e=!0),!0===f&&a.push(c);e&&(A["data-headlessui-state"]=a.join(" "))}if(p===h.Fragment&&Object.keys(x(w)).length>0){if(!(0,h.isValidElement)(N)||Array.isArray(N)&&N.length>1)throw Error(['Passing props on "Fragment"!',"",`The current component <${c} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(w).map(e=>`  - ${e}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(e=>`  - ${e}`).join(`
`)].join(`
`));let e=N.props,n="function"==typeof(null==e?void 0:e.className)?(...n)=>(0,g.A)(null==e?void 0:e.className(...n),w.className):(0,g.A)(null==e?void 0:e.className,w.className),a=n?{className:n}:{};return(0,h.cloneElement)(N,Object.assign({},R(N.props,x(F(w,["ref"]))),A,b,{ref:f(N.ref,b.ref)},a))}return(0,h.createElement)(p,Object.assign({},F(w,["ref"]),p!==h.Fragment&&b,p!==h.Fragment&&A),N)}function I(){let e=(0,h.useRef)([]),n=(0,h.useCallback)(n=>{for(let a of e.current)null!=a&&("function"==typeof a?a(n):a.current=n)},[]);return(...a)=>{if(!a.every(e=>null==e))return e.current=a,n}}function k(...e){return e.every(e=>null==e)?void 0:n=>{for(let a of e)null!=a&&("function"==typeof a?a(n):a.current=n)}}function R(...e){if(0===e.length)return{};if(1===e.length)return e[0];let n={},a={};for(let c of e)for(let e in c)e.startsWith("on")&&"function"==typeof c[e]?(null!=a[e]||(a[e]=[]),a[e].push(c[e])):n[e]=c[e];if(n.disabled||n["aria-disabled"])return Object.assign(n,Object.fromEntries(Object.keys(a).map(e=>[e,void 0])));for(let e in a)Object.assign(n,{[e](n,...c){for(let f of a[e]){if((n instanceof Event||(null==n?void 0:n.nativeEvent)instanceof Event)&&n.defaultPrevented)return;f(n,...c)}}});return n}function U(e){var n;return Object.assign((0,h.forwardRef)(e),{displayName:null!=(n=e.displayName)?n:e.name})}function x(e){let n=Object.assign({},e);for(let e in n)void 0===n[e]&&delete n[e];return n}function F(e,n=[]){let a=Object.assign({},e);for(let e of n)e in a&&delete a[e];return a}}},function(e){e.O(0,[61,774,888,179],function(){return e(e.s=2366)}),_N_E=e.O()}]);