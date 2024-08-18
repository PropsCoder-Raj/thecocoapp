"use strict";(self.webpackChunkthecocoapp=self.webpackChunkthecocoapp||[]).push([[721],{6721:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I});var r=n(5043),a=n(4535),o=n(6446),i=n(611),s=n(344),l=n(9252),d=n(8903),c=n(5865),u=n(1906),p=n(5397),x=n(835),m=n(2030),h=n(423),f=n(7306),g=n(6213),b=(n(3768),n(5756)),v=n(1218),A=n(579);const y={flexBox:{display:"flex",justifyContent:"space-between",alignItem:"center"},gridBox:{display:"grid",gap:"16px"},logoBox:{height:"-webkit-fill-available",alignItems:"end",display:"grid",justifyContent:"start"},CombineBox:{display:"grid",padding:"20px 0",gap:"25px",maxWidth:"700px"},buttonHandle:{display:"flex",justifyContent:"space-between",gap:"8px",alignItems:"center","@media(max-width:767px)":{display:"block"}},manageBBHeight:{justifyContent:"center",alignItems:"center",height:"calc(100vh - 368px)",display:"grid",overflow:"auto","@media(max-width:767px)":{height:"calc(100vh - 300px)",justifyContent:"start",alignItems:"start",display:"block"}},displaycustom:{display:"block","@media(max-width:767px)":{display:"none"}},displaycustom1:{display:"none","@media(max-width:767px)":{display:"flex",gap:"8px",alignItems:"center"}}},w=(0,a.Ay)(o.A)((e=>{let{theme:t}=e;return{padding:"60px 0px 0 0px",height:"100vh",overflow:"auto",alignItems:"end",justifyContent:"space-between",alignContent:"space-between","@media(max-width:767px)":{position:"fixed",top:"56px",padding:"0"}}})),j=(0,a.Ay)(o.A)((e=>{let{theme:t}=e;return{padding:"45px",borderTop:"1px solid #E5E5E5",position:"fixed",bottom:"0",width:"-webkit-fill-available","@media(max-width:767px)":{padding:"15px"},"@media(max-width:1000px)":{padding:"25px"}}})),k=(0,a.Ay)("img")((e=>{let{theme:t}=e;return{width:"80px",height:"80px","@media(max-width:767px)":{width:"30px",height:"30px"}}})),C=(0,a.Ay)("img")((e=>{let{theme:t}=e;return{width:"80px",height:"80px","@media(max-width:767px)":{width:"30px",height:"30px"},"@media(max-width:1000px)":{width:"30px",height:"30px"}}})),S=(0,a.Ay)(i.A)((e=>{let{progressColor:t}=e;return{width:"-webkit-fill-available",height:"10px",backgroundColor:"rgba(216, 216, 218, 1)",borderRadius:"4px","& .MuiLinearProgress-bar":{backgroundColor:"#FE8A36",borderRadius:"4px"}}})),B=(0,a.Ay)("img")((e=>{let{theme:t}=e;return{width:"200px","@media(max-width:767px)":{width:"120px"}}}));const I=function(){var e,t,n;const a=(0,x.Zp)(),[i,I]=(0,r.useState)(1),[F,E]=(0,r.useState)(""),[P,R]=(0,r.useState)(null),[q,_]=(0,r.useState)(!1),[N,O]=(0,r.useState)(!1),[D,H]=(0,r.useState)(Math.ceil(33.33)),[M,Q]=(0,r.useState)(1),[T,L]=(0,r.useState)({}),z=(0,x.zy)();(0,r.useEffect)((()=>{var e,t,n;null!==z&&void 0!==z&&null!==(e=z.state)&&void 0!==e&&e.nextQuestionNo?(I(null===z||void 0===z||null===(t=z.state)||void 0===t?void 0:t.nextQuestionNo),Q(null===z||void 0===z||null===(n=z.state)||void 0===n?void 0:n.nextQuestionNo)):(I(1),Q(1))}),[null===z||void 0===z||null===(e=z.state)||void 0===e?void 0:e.nextQuestionNo]);const[W]=(0,v.A)("sound/correct-answer-sound-effect-19.mp3"),[G]=(0,v.A)("sound/wrong_SriFgVc.mp3"),[J,X]=(0,r.useState)([]),V=(0,m.jh)(10),Z=(0,b.u)(),[$,K]=((0,s.A)(Z.breakpoints.down("sm")),(0,r.useState)(J.length));(0,r.useEffect)((()=>{U()}),[]);const U=async()=>{const e=localStorage.getItem("token");try{var t,n;const r=await(0,g.A)({method:"GET",url:"".concat(f.A.getQuestions,"/").concat(null===z||void 0===z||null===(t=z.state)||void 0===t?void 0:t.level_id,"/").concat(null===z||void 0===z||null===(n=z.state)||void 0===n?void 0:n.module_id),headers:{token:e}});200===r.status&&(X(r.data.result.quesitons),K(r.data.result.quesitons.length),O(r.data.result.attamptedQuestions))}catch(r){console.log(r,"error")}};return(0,A.jsxs)(w,{children:[(0,A.jsx)(l.A,{maxWidth:"lg",children:(0,A.jsxs)(d.Ay,{container:!0,spacing:3,children:[(0,A.jsx)(d.Ay,{item:!0,xs:12,sx:{alignItems:"center",display:"grid"},children:(0,A.jsxs)(o.A,{sx:{width:"100%",textAlign:"center",display:"flex",gap:"10px",alignItems:"center"},children:[(0,A.jsx)(h.WQq,{color:"#FE8A36",onClick:()=>{a("/dashboard")},cursor:"pointer"}),(0,A.jsx)(S,{variant:"determinate",value:D}),(0,A.jsxs)(c.A,{variant:"body2",color:"#FE8A36",children:[D>1?M:1,"/",$]})]})}),(0,A.jsx)(d.Ay,{item:!0,xs:12,children:(0,A.jsx)(o.A,{sx:y.manageBBHeight,children:(0,A.jsxs)(o.A,{sx:y.CombineBox,children:[(0,A.jsx)(o.A,{sx:{marginBottom:"20px"},children:(0,A.jsx)(c.A,{variant:"h3",fontWeight:600,children:(null===(t=J[i-1])||void 0===t?void 0:t.name)||"--"})}),null===(n=J[i-1])||void 0===n?void 0:n.options.map(((e,t)=>(0,A.jsxs)(o.A,{sx:{display:"flex",gap:"8px",padding:"12px",borderRadius:"8px",border:F===t?"1px solid rgba(0, 186, 242, 1)":"1px solid #D8D8D8",cursor:"pointer",background:F===t?"#E6F8FE":"#fff","&:hover":{background:"#E6F8FE"}},onClick:()=>{var e;E(t),(async e=>{const{question_id:t,answer:n}=e,r=localStorage.getItem("token");try{var a,o;const e=await(0,g.A)({method:"POST",url:"".concat(f.A.attemptQuestions),headers:{token:r},data:{question_no:i,question_id:t,module_id:null===z||void 0===z||null===(a=z.state)||void 0===a?void 0:a.module_id,level_id:null===z||void 0===z||null===(o=z.state)||void 0===o?void 0:o.level_id,answer:n,demo:N}});200===e.status&&(R(e.data.result.correctAnswerStatus),L(e.data.result),H(e.data.result.loaderPercentage),Q(e.data.result.susscessQuestions),e.data.result.correctAnswerStatus?W():G())}catch(s){console.log(s,"error")}})({question_id:null===(e=J[i-1])||void 0===e?void 0:e._id,answer:V[t]})},children:[(0,A.jsxs)(c.A,{variant:"h4",children:[V[t],"."]}),(0,A.jsx)(c.A,{variant:"h4",children:e.value})]})))]})})})]})}),!0===P&&(0,A.jsx)(l.A,{sx:{position:"fixed",bottom:"125px"},children:(0,A.jsx)(o.A,{sx:{display:"flex",justifyContent:"end"},children:(0,A.jsx)(B,{alt:"",src:"images/Coco-Idle_Talking-crop.gif"})})}),(0,A.jsx)(j,{sx:!0===P?{background:"#D7FFB8",marginTop:"55px",border:"none",padding:{md:"29px",sm:"29px",xs:"15px"},height:"128px"}:!1===P?{background:"#FFCFCF",marginTop:"65px",border:"none"}:{background:"#ffff"},children:(0,A.jsx)(l.A,{children:(0,A.jsx)(d.Ay,{spacing:4,children:(0,A.jsx)(d.Ay,{item:!0,xs:12,children:(0,A.jsxs)(o.A,{sx:y.buttonHandle,children:[!0===P?(0,A.jsxs)(o.A,{sx:{display:"flex",gap:"8px",alignItems:"center","@media(max-width:767px)":{marginBottom:"15px"}},children:[(0,A.jsx)(k,{src:"images/correct.png",alt:""}),(0,A.jsx)(c.A,{variant:"h4",color:"#58CC02",children:"Great Job"})]}):!1===P?(0,A.jsxs)(o.A,{sx:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,A.jsx)(o.A,{sx:y.displaycustom,children:(0,A.jsx)(k,{src:"images/wrong.png",alt:""})}),(0,A.jsxs)(o.A,{sx:{maxWidth:"870px"},children:[(0,A.jsxs)(o.A,{sx:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,A.jsx)(o.A,{sx:y.displaycustom1,children:(0,A.jsx)(C,{src:"images/wrong.png",alt:""})}),(0,A.jsx)(c.A,{variant:"h4",color:"#FF4B4B",fontWeight:600,children:"Try next time"})]}),(0,A.jsxs)(c.A,{variant:"h4",color:"#FF4B4B",marginBottom:"8px",marginTop:"12px",children:["Correct Answer: ",T.right_answer||"--"]}),(0,A.jsx)(c.A,{variant:"h4",color:"#FF4B4B",children:T.desc||"--"})]})]}):(0,A.jsx)(o.A,{}),(0,A.jsx)(u.A,{disabled:null==P,sx:{width:"155px",marginTop:{md:"0",sm:"10px",xs:"10px"},"@media(max-width:767px)":{width:"-webkit-fill-available"}},style:!0===P?{background:"#58CC02"}:!1===P?{background:"#FF4B4B"}:{background:"#FE8A36",color:"rgb(188 102 40)"},variant:"contained",onClick:()=>{R(null),E(""),"SCORE_BOARD"===T.nextScreen?a("/complete",{state:{totalPoints:T.totalPoints,levelNo:T.levelNo}}):(I(T.nextQuestionNo),R(null))},children:"Continue"})]})})})})}),(0,A.jsx)(p.A,{ContentProps:{sx:{background:"rgba(20, 23, 25, 1)"}},sx:{width:"-webkit-fill-available !important",marginBottom:"140px"},open:q,autoHideDuration:6e3,onClose:(e,t)=>{_(!1)},message:"Select an option before checking !",anchorOrigin:{vertical:"bottom",horizontal:"center"}})]})}},611:(e,t,n)=>{n.d(t,{A:()=>Q});var r=n(7528),a=n(8587),o=n(8168),i=n(5043),s=n(8387),l=n(8606),d=n(3290),c=n(7266),u=n(875),p=n(6803),x=n(4535),m=n(2876),h=n(7056),f=n(2400);function g(e){return(0,f.Ay)("MuiLinearProgress",e)}(0,h.A)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var b,v,A,y,w,j,k=n(579);const C=["className","color","value","valueBuffer","variant"];let S,B,I,F,E,P;const R=(0,d.i7)(S||(S=b||(b=(0,r.A)(["\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n"])))),q=(0,d.i7)(B||(B=v||(v=(0,r.A)(["\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n"])))),_=(0,d.i7)(I||(I=A||(A=(0,r.A)(["\n  0% {\n    opacity: 1;\n    background-position: 0 -23px;\n  }\n\n  60% {\n    opacity: 0;\n    background-position: 0 -23px;\n  }\n\n  100% {\n    opacity: 1;\n    background-position: -200px -23px;\n  }\n"])))),N=(e,t)=>"inherit"===t?"currentColor":e.vars?e.vars.palette.LinearProgress["".concat(t,"Bg")]:"light"===e.palette.mode?(0,c.a)(e.palette[t].main,.62):(0,c.e$)(e.palette[t].main,.5),O=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t["color".concat((0,p.A)(n.color))],t[n.variant]]}})((e=>{let{ownerState:t,theme:n}=e;return(0,o.A)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:N(n,t.color)},"inherit"===t.color&&"buffer"!==t.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===t.variant&&{backgroundColor:"transparent"},"query"===t.variant&&{transform:"rotate(180deg)"})})),D=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.dashed,t["dashedColor".concat((0,p.A)(n.color))]]}})((e=>{let{ownerState:t,theme:n}=e;const r=N(n,t.color);return(0,o.A)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===t.color&&{opacity:.3},{backgroundImage:"radial-gradient(".concat(r," 0%, ").concat(r," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),(0,d.AH)(F||(F=y||(y=(0,r.A)(["\n    animation: "," 3s infinite linear;\n  "]))),_)),H=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.bar,t["barColor".concat((0,p.A)(n.color))],("indeterminate"===n.variant||"query"===n.variant)&&t.bar1Indeterminate,"determinate"===n.variant&&t.bar1Determinate,"buffer"===n.variant&&t.bar1Buffer]}})((e=>{let{ownerState:t,theme:n}=e;return(0,o.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===t.color?"currentColor":(n.vars||n).palette[t.color].main},"determinate"===t.variant&&{transition:"transform .".concat(4,"s linear")},"buffer"===t.variant&&{zIndex:1,transition:"transform .".concat(4,"s linear")})}),(e=>{let{ownerState:t}=e;return("indeterminate"===t.variant||"query"===t.variant)&&(0,d.AH)(E||(E=w||(w=(0,r.A)(["\n      width: auto;\n      animation: "," 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    "]))),R)})),M=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.bar,t["barColor".concat((0,p.A)(n.color))],("indeterminate"===n.variant||"query"===n.variant)&&t.bar2Indeterminate,"buffer"===n.variant&&t.bar2Buffer]}})((e=>{let{ownerState:t,theme:n}=e;return(0,o.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==t.variant&&{backgroundColor:"inherit"===t.color?"currentColor":(n.vars||n).palette[t.color].main},"inherit"===t.color&&{opacity:.3},"buffer"===t.variant&&{backgroundColor:N(n,t.color),transition:"transform .".concat(4,"s linear")})}),(e=>{let{ownerState:t}=e;return("indeterminate"===t.variant||"query"===t.variant)&&(0,d.AH)(P||(P=j||(j=(0,r.A)(["\n      width: auto;\n      animation: "," 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;\n    "]))),q)})),Q=i.forwardRef((function(e,t){const n=(0,m.A)({props:e,name:"MuiLinearProgress"}),{className:r,color:i="primary",value:d,valueBuffer:c,variant:x="indeterminate"}=n,h=(0,a.A)(n,C),f=(0,o.A)({},n,{color:i,variant:x}),b=(e=>{const{classes:t,variant:n,color:r}=e,a={root:["root","color".concat((0,p.A)(r)),n],dashed:["dashed","dashedColor".concat((0,p.A)(r))],bar1:["bar","barColor".concat((0,p.A)(r)),("indeterminate"===n||"query"===n)&&"bar1Indeterminate","determinate"===n&&"bar1Determinate","buffer"===n&&"bar1Buffer"],bar2:["bar","buffer"!==n&&"barColor".concat((0,p.A)(r)),"buffer"===n&&"color".concat((0,p.A)(r)),("indeterminate"===n||"query"===n)&&"bar2Indeterminate","buffer"===n&&"bar2Buffer"]};return(0,l.A)(a,g,t)})(f),v=(0,u.I)(),A={},y={bar1:{},bar2:{}};if("determinate"===x||"buffer"===x)if(void 0!==d){A["aria-valuenow"]=Math.round(d),A["aria-valuemin"]=0,A["aria-valuemax"]=100;let e=d-100;v&&(e=-e),y.bar1.transform="translateX(".concat(e,"%)")}else 0;if("buffer"===x)if(void 0!==c){let e=(c||0)-100;v&&(e=-e),y.bar2.transform="translateX(".concat(e,"%)")}else 0;return(0,k.jsxs)(O,(0,o.A)({className:(0,s.A)(b.root,r),ownerState:f,role:"progressbar"},A,{ref:t},h,{children:["buffer"===x?(0,k.jsx)(D,{className:b.dashed,ownerState:f}):null,(0,k.jsx)(H,{className:b.bar1,ownerState:f,style:y.bar1}),"determinate"===x?null:(0,k.jsx)(M,{className:b.bar2,ownerState:f,style:y.bar2})]}))}))},1218:(e,t,n)=>{n.d(t,{A:()=>i});var r=n(5043);function a(){return a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a.apply(null,arguments)}var o=["id","volume","playbackRate","soundEnabled","interrupt","onload"];const i=function(e,t){var i,s=void 0===t?{}:t,l=s.volume,d=void 0===l?1:l,c=s.playbackRate,u=void 0===c?1:c,p=s.soundEnabled,x=void 0===p||p,m=s.interrupt,h=void 0!==m&&m,f=s.onload,g=function(e,t){if(null==e)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}(s,o),b=r.useRef(null),v=r.useRef(!1),A=r.useState(null),y=A[0],w=A[1],j=r.useState(null),k=j[0],C=j[1],S=function(){"function"===typeof f&&f.call(this),v.current&&w(1e3*this.duration()),C(this)};i=function(){return n.e(885).then(n.t.bind(n,9885,23)).then((function(t){var n;v.current||(b.current=null!==(n=t.Howl)&&void 0!==n?n:t.default.Howl,v.current=!0,new b.current(a({src:Array.isArray(e)?e:[e],volume:d,rate:u,onload:S},g)))})),function(){v.current=!1}},(0,r.useEffect)(i,[]),r.useEffect((function(){b.current&&k&&C(new b.current(a({src:Array.isArray(e)?e:[e],volume:d,onload:S},g)))}),[JSON.stringify(e)]),r.useEffect((function(){k&&(k.volume(d),k.rate(u))}),[d,u]);var B=r.useCallback((function(e){"undefined"===typeof e&&(e={}),k&&(x||e.forceSoundEnabled)&&(h&&k.stop(),e.playbackRate&&k.rate(e.playbackRate),k.play(e.id))}),[k,x,h]),I=r.useCallback((function(e){k&&k.stop(e)}),[k]),F=r.useCallback((function(e){k&&k.pause(e)}),[k]);return[B,{sound:k,stop:I,pause:F,duration:y}]}}}]);
//# sourceMappingURL=721.c2933e7d.chunk.js.map