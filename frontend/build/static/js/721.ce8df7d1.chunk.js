"use strict";(self.webpackChunkthecocoapp=self.webpackChunkthecocoapp||[]).push([[721],{6721:(e,t,r)=>{r.r(t),r.d(t,{default:()=>S});var a=r(5043),n=r(4535),o=r(6446),i=r(611),s=r(344),l=r(9252),d=r(8903),c=r(5865),u=r(1906),p=r(5397),x=r(835),m=r(2030),h=r(423),g=r(7306),b=r(6213),f=(r(3768),r(5756)),v=r(579);const A={flexBox:{display:"flex",justifyContent:"space-between",alignItem:"center"},gridBox:{display:"grid",gap:"16px"},logoBox:{height:"-webkit-fill-available",alignItems:"end",display:"grid",justifyContent:"start"},CombineBox:{display:"grid",padding:"20px 0",gap:"25px",maxWidth:"700px"},buttonHandle:{display:"flex",justifyContent:"space-between",gap:"8px",alignItems:"center","@media(max-width:767px)":{display:"block"}},manageBBHeight:{justifyContent:"center",alignItems:"center",height:"calc(100vh - 368px)",display:"grid",overflow:"auto","@media(max-width:767px)":{height:"calc(100vh - 300px)",justifyContent:"start",alignItems:"start",display:"block"}},displaycustom:{display:"block","@media(max-width:767px)":{display:"none"}},displaycustom1:{display:"none","@media(max-width:767px)":{display:"flex",gap:"8px",alignItems:"center"}}},y=(0,n.Ay)(o.A)((e=>{let{theme:t}=e;return{padding:"60px 0px 0 0px",height:"100vh",overflow:"auto",alignItems:"end",justifyContent:"space-between",alignContent:"space-between"}})),w=(0,n.Ay)(o.A)((e=>{let{theme:t}=e;return{padding:"45px",borderTop:"1px solid #E5E5E5",position:"fixed",bottom:"0",width:"-webkit-fill-available","@media(max-width:767px)":{padding:"15px"},"@media(max-width:1000px)":{padding:"25px"}}})),j=(0,n.Ay)("img")((e=>{let{theme:t}=e;return{width:"80px",height:"80px","@media(max-width:767px)":{width:"30px",height:"30px"}}})),C=(0,n.Ay)("img")((e=>{let{theme:t}=e;return{width:"80px",height:"80px","@media(max-width:767px)":{width:"30px",height:"30px"},"@media(max-width:1000px)":{width:"30px",height:"30px"}}})),k=(0,n.Ay)(i.A)((e=>{let{progressColor:t}=e;return{width:"-webkit-fill-available",height:"10px",backgroundColor:"rgba(216, 216, 218, 1)",borderRadius:"4px","& .MuiLinearProgress-bar":{backgroundColor:"#FE8A36",borderRadius:"4px"}}})),B=(0,n.Ay)("img")((e=>{let{theme:t}=e;return{width:"200px","@media(max-width:767px)":{width:"120px"}}}));const S=function(){var e,t;const r=(0,x.Zp)(),[n,i]=(0,a.useState)(1),[S,I]=(0,a.useState)(""),[F,P]=(0,a.useState)(null);console.log(F,"correctAns");const[q,E]=(0,a.useState)(!1),[_,D]=(0,a.useState)(!1),[R,T]=(0,a.useState)(Math.ceil(33.33)),[M,H]=(0,a.useState)(1),[L,N]=(0,a.useState)({}),z=(0,x.zy)(),[O,Q]=(0,a.useState)([]),W=(0,m.jh)(10),G=(0,f.u)(),X=(0,s.A)(G.breakpoints.down("sm"));console.log(O,"quetionsData");const[J,Z]=(0,a.useState)(O.length);(0,a.useEffect)((()=>{$()}),[]);const $=async()=>{const e=localStorage.getItem("token");try{var t,r;const a=await(0,b.A)({method:"GET",url:"".concat(g.A.getQuestions,"/").concat(null===z||void 0===z||null===(t=z.state)||void 0===t?void 0:t.level_id,"/").concat(null===z||void 0===z||null===(r=z.state)||void 0===r?void 0:r.module_id),headers:{token:e}});200===a.status&&(Q(a.data.result.quesitons),Z(a.data.result.quesitons.length),D(a.data.result.attamptedQuestions))}catch(a){console.log(a,"error")}};return(0,v.jsxs)(y,{children:[(0,v.jsx)(l.A,{maxWidth:"lg",children:(0,v.jsxs)(d.Ay,{container:!0,spacing:3,children:[(0,v.jsx)(d.Ay,{item:!0,xs:12,sx:{alignItems:"center",display:"grid"},children:(0,v.jsxs)(o.A,{sx:{width:"100%",textAlign:"center",display:"flex",gap:"10px",alignItems:"center"},children:[(0,v.jsx)(h.WQq,{color:"#FE8A36",onClick:()=>{r("/dashboard")},cursor:"pointer"}),(0,v.jsx)(k,{variant:"determinate",value:R}),(0,v.jsxs)(c.A,{variant:"body2",color:"#FE8A36",children:[R>1?M:1,"/",J]})]})}),(0,v.jsx)(d.Ay,{item:!0,xs:12,children:(0,v.jsx)(o.A,{sx:""==F?A.manageBoxHeight:A.manageBBHeight,children:(0,v.jsxs)(o.A,{sx:A.CombineBox,children:[(0,v.jsx)(o.A,{sx:{marginBottom:"20px"},children:(0,v.jsx)(c.A,{variant:"h3",fontWeight:600,children:(null===(e=O[n-1])||void 0===e?void 0:e.name)||"--"})}),null===(t=O[n-1])||void 0===t?void 0:t.options.map(((e,t)=>(0,v.jsxs)(o.A,{sx:{display:"flex",gap:"8px",padding:"12px",borderRadius:"8px",border:S===t?"1px solid rgba(0, 186, 242, 1)":"1px solid #D8D8D8",cursor:"pointer",background:S===t?"#E6F8FE":"#fff","&:hover":{background:"#E6F8FE"}},onClick:()=>{var e;I(t),(async e=>{const{question_id:t,answer:r}=e,a=localStorage.getItem("token");try{var o,i;const e=await(0,b.A)({method:"POST",url:"".concat(g.A.attemptQuestions),headers:{token:a},data:{question_no:n,question_id:t,module_id:null===z||void 0===z||null===(o=z.state)||void 0===o?void 0:o.module_id,level_id:null===z||void 0===z||null===(i=z.state)||void 0===i?void 0:i.level_id,answer:r,demo:_}});200===e.status&&(P(e.data.result.correctAnswerStatus),N(e.data.result),T(e.data.result.loaderPercentage),H(e.data.result.susscessQuestions))}catch(s){console.log(s,"error")}})({question_id:null===(e=O[n-1])||void 0===e?void 0:e._id,answer:W[t]})},children:[(0,v.jsxs)(c.A,{variant:"h4",children:[W[t],"."]}),(0,v.jsx)(c.A,{variant:"h4",children:e.value})]})))]})})})]})}),!0===F&&(0,v.jsx)(l.A,{sx:X?{marginTop:"-7px"}:{},children:(0,v.jsx)(o.A,{sx:{display:"flex",justifyContent:"end"},children:(0,v.jsx)(B,{alt:"",src:"images/Coco-Idle_Talking-crop.gif"})})}),(0,v.jsx)(w,{sx:!0===F?{background:"#D7FFB8",marginTop:"55px",border:"none",padding:{md:"29px",sm:"29px",xs:"15px"},height:"128px"}:!1===F?{background:"#FFCFCF",marginTop:"65px",border:"none"}:{background:"#ffff"},children:(0,v.jsx)(l.A,{children:(0,v.jsx)(d.Ay,{spacing:4,children:(0,v.jsx)(d.Ay,{item:!0,xs:12,children:(0,v.jsxs)(o.A,{sx:A.buttonHandle,children:[!0===F?(0,v.jsxs)(o.A,{sx:{display:"flex",gap:"8px",alignItems:"center","@media(max-width:767px)":{marginBottom:"15px"}},children:[(0,v.jsx)(j,{src:"images/correct.png",alt:""}),(0,v.jsx)(c.A,{variant:"h4",color:"#58CC02",children:"Great Job"})]}):!1===F?(0,v.jsxs)(o.A,{sx:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,v.jsx)(o.A,{sx:A.displaycustom,children:(0,v.jsx)(j,{src:"images/wrong.png",alt:""})}),(0,v.jsxs)(o.A,{children:[(0,v.jsxs)(o.A,{sx:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,v.jsx)(o.A,{sx:A.displaycustom1,children:(0,v.jsx)(C,{src:"images/wrong.png",alt:""})}),(0,v.jsx)(c.A,{variant:"h4",color:"#FF4B4B",fontWeight:600,children:"Try next time"})]}),(0,v.jsxs)(c.A,{variant:"h4",color:"#FF4B4B",marginBottom:"8px",marginTop:"12px",children:["Correct Answer: ",L.right_answer||"--"]}),(0,v.jsx)(c.A,{variant:"h4",color:"#FF4B4B",children:L.desc||"--"})]})]}):(0,v.jsx)(o.A,{}),(0,v.jsx)(u.A,{disabled:null==F,sx:{width:{md:"155px",sm:"-webkit-fill-available",xs:"-webkit-fill-available"},marginTop:{md:"0",sm:"10px",xs:"10px"}},style:!0===F?{background:"#58CC02"}:!1===F?{background:"#FF4B4B"}:{background:"#FE8A36",color:"rgb(188 102 40)"},variant:"contained",onClick:()=>{P(null),I(""),"SCORE_BOARD"===L.nextScreen?r("/complete",{state:{totalPoints:L.totalPoints,levelNo:L.levelNo}}):(i(L.nextQuestionNo),P(null))},children:"Continue"})]})})})})}),(0,v.jsx)(p.A,{ContentProps:{sx:{background:"rgba(20, 23, 25, 1)"}},sx:{width:"-webkit-fill-available !important",marginBottom:"140px"},open:q,autoHideDuration:6e3,onClose:(e,t)=>{E(!1)},message:"Select an option before checking !",anchorOrigin:{vertical:"bottom",horizontal:"center"}})]})}},611:(e,t,r)=>{r.d(t,{A:()=>N});var a=r(7528),n=r(8587),o=r(8168),i=r(5043),s=r(8387),l=r(8606),d=r(3290),c=r(7266),u=r(875),p=r(6803),x=r(4535),m=r(2876),h=r(7056),g=r(2400);function b(e){return(0,g.Ay)("MuiLinearProgress",e)}(0,h.A)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var f,v,A,y,w,j,C=r(579);const k=["className","color","value","valueBuffer","variant"];let B,S,I,F,P,q;const E=(0,d.i7)(B||(B=f||(f=(0,a.A)(["\n  0% {\n    left: -35%;\n    right: 100%;\n  }\n\n  60% {\n    left: 100%;\n    right: -90%;\n  }\n\n  100% {\n    left: 100%;\n    right: -90%;\n  }\n"])))),_=(0,d.i7)(S||(S=v||(v=(0,a.A)(["\n  0% {\n    left: -200%;\n    right: 100%;\n  }\n\n  60% {\n    left: 107%;\n    right: -8%;\n  }\n\n  100% {\n    left: 107%;\n    right: -8%;\n  }\n"])))),D=(0,d.i7)(I||(I=A||(A=(0,a.A)(["\n  0% {\n    opacity: 1;\n    background-position: 0 -23px;\n  }\n\n  60% {\n    opacity: 0;\n    background-position: 0 -23px;\n  }\n\n  100% {\n    opacity: 1;\n    background-position: -200px -23px;\n  }\n"])))),R=(e,t)=>"inherit"===t?"currentColor":e.vars?e.vars.palette.LinearProgress["".concat(t,"Bg")]:"light"===e.palette.mode?(0,c.a)(e.palette[t].main,.62):(0,c.e$)(e.palette[t].main,.5),T=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t["color".concat((0,p.A)(r.color))],t[r.variant]]}})((e=>{let{ownerState:t,theme:r}=e;return(0,o.A)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:R(r,t.color)},"inherit"===t.color&&"buffer"!==t.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===t.variant&&{backgroundColor:"transparent"},"query"===t.variant&&{transform:"rotate(180deg)"})})),M=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.dashed,t["dashedColor".concat((0,p.A)(r.color))]]}})((e=>{let{ownerState:t,theme:r}=e;const a=R(r,t.color);return(0,o.A)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===t.color&&{opacity:.3},{backgroundImage:"radial-gradient(".concat(a," 0%, ").concat(a," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),(0,d.AH)(F||(F=y||(y=(0,a.A)(["\n    animation: "," 3s infinite linear;\n  "]))),D)),H=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.bar,t["barColor".concat((0,p.A)(r.color))],("indeterminate"===r.variant||"query"===r.variant)&&t.bar1Indeterminate,"determinate"===r.variant&&t.bar1Determinate,"buffer"===r.variant&&t.bar1Buffer]}})((e=>{let{ownerState:t,theme:r}=e;return(0,o.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===t.color?"currentColor":(r.vars||r).palette[t.color].main},"determinate"===t.variant&&{transition:"transform .".concat(4,"s linear")},"buffer"===t.variant&&{zIndex:1,transition:"transform .".concat(4,"s linear")})}),(e=>{let{ownerState:t}=e;return("indeterminate"===t.variant||"query"===t.variant)&&(0,d.AH)(P||(P=w||(w=(0,a.A)(["\n      width: auto;\n      animation: "," 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    "]))),E)})),L=(0,x.Ay)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.bar,t["barColor".concat((0,p.A)(r.color))],("indeterminate"===r.variant||"query"===r.variant)&&t.bar2Indeterminate,"buffer"===r.variant&&t.bar2Buffer]}})((e=>{let{ownerState:t,theme:r}=e;return(0,o.A)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==t.variant&&{backgroundColor:"inherit"===t.color?"currentColor":(r.vars||r).palette[t.color].main},"inherit"===t.color&&{opacity:.3},"buffer"===t.variant&&{backgroundColor:R(r,t.color),transition:"transform .".concat(4,"s linear")})}),(e=>{let{ownerState:t}=e;return("indeterminate"===t.variant||"query"===t.variant)&&(0,d.AH)(q||(q=j||(j=(0,a.A)(["\n      width: auto;\n      animation: "," 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;\n    "]))),_)})),N=i.forwardRef((function(e,t){const r=(0,m.A)({props:e,name:"MuiLinearProgress"}),{className:a,color:i="primary",value:d,valueBuffer:c,variant:x="indeterminate"}=r,h=(0,n.A)(r,k),g=(0,o.A)({},r,{color:i,variant:x}),f=(e=>{const{classes:t,variant:r,color:a}=e,n={root:["root","color".concat((0,p.A)(a)),r],dashed:["dashed","dashedColor".concat((0,p.A)(a))],bar1:["bar","barColor".concat((0,p.A)(a)),("indeterminate"===r||"query"===r)&&"bar1Indeterminate","determinate"===r&&"bar1Determinate","buffer"===r&&"bar1Buffer"],bar2:["bar","buffer"!==r&&"barColor".concat((0,p.A)(a)),"buffer"===r&&"color".concat((0,p.A)(a)),("indeterminate"===r||"query"===r)&&"bar2Indeterminate","buffer"===r&&"bar2Buffer"]};return(0,l.A)(n,b,t)})(g),v=(0,u.I)(),A={},y={bar1:{},bar2:{}};if("determinate"===x||"buffer"===x)if(void 0!==d){A["aria-valuenow"]=Math.round(d),A["aria-valuemin"]=0,A["aria-valuemax"]=100;let e=d-100;v&&(e=-e),y.bar1.transform="translateX(".concat(e,"%)")}else 0;if("buffer"===x)if(void 0!==c){let e=(c||0)-100;v&&(e=-e),y.bar2.transform="translateX(".concat(e,"%)")}else 0;return(0,C.jsxs)(T,(0,o.A)({className:(0,s.A)(f.root,a),ownerState:g,role:"progressbar"},A,{ref:t},h,{children:["buffer"===x?(0,C.jsx)(M,{className:f.dashed,ownerState:g}):null,(0,C.jsx)(H,{className:f.bar1,ownerState:g,style:y.bar1}),"determinate"===x?null:(0,C.jsx)(L,{className:f.bar2,ownerState:g,style:y.bar2})]}))}))}}]);
//# sourceMappingURL=721.ce8df7d1.chunk.js.map