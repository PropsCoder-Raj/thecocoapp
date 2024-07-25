"use strict";(self.webpackChunkthecocoapp=self.webpackChunkthecocoapp||[]).push([[847],{6847:(e,i,o)=>{o.r(i),o.d(i,{default:()=>D});var t,n,s=o(7528),l=o(5043),a=o(3290),d=o(4535),r=o(6446),x=o(611),c=o(344),p=o(9252),u=o(8903),m=o(5865),g=o(423),h=o(5394),b=o(2030),v=o(835),f=o(7306),w=o(6213),j=(o(3768),o(184)),A=o(5756),k=o(7109),y=o(525),S=o(579);const C=(0,a.i7)(t||(t=(0,s.A)(["\n  0% {\n    background-position: bottom;\n  }\n  100% {\n    background-position: top;\n  }\n"]))),I=(0,a.i7)(n||(n=(0,s.A)(["\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-10px); /* Adjust this value to control the bounce height */\n  }\n"]))),_={flexBox:{display:"flex",justifyContent:"space-between",alignItem:"center","@media(max-width:1000px)":{},"@media(max-width:767px)":{}},gridBox:{display:"grid",gap:"16px",maxWidth:"700px","@media(max-width:900px)":{maxWidth:"-webkit-fill-available"}},logoBox:{height:"-webkit-fill-available",alignItems:"end",display:"grid",justifyContent:"start"},CombineBox:{display:"grid",paddingBottom:"20px",alignItems:"flex-start",height:{md:"calc(100vh - 130px)",sm:"calc(100vh - 125px)",xs:"calc(100vh - 125px)"}},buttonHandle:{display:"flex",justifyContent:"end",gap:"8px"}},B=(0,d.Ay)(r.A)((e=>{let{theme:i}=e;return{padding:"54px 0px 0 0px",[i.breakpoints.down("md")]:{padding:"36px 0px 0 0px"},[i.breakpoints.down("sm")]:{padding:"36px 0px 0 0px"},[i.breakpoints.down("xs")]:{padding:"36px 0px 0 0px"},height:"100vh",overflow:"auto",alignItems:"end",justifyContent:"space-between",alignContent:"space-between"}})),E=(0,d.Ay)(r.A)((e=>{let{theme:i}=e;return{display:"grid",alignItems:"end",height:"71px",transition:"all 0.1s ease-in-out"}})),L=(0,d.Ay)("img")((e=>{let{theme:i}=e;return{width:"100%",maxHeight:"300px"}})),R=(0,d.Ay)("img")((e=>{let{theme:i}=e;return{width:"60px",height:"60px"}})),z=(0,d.Ay)(x.A)((e=>{let{progressColor:i}=e;return{width:"-webkit-fill-available",height:"10px",backgroundColor:"rgba(216, 216, 218, 1)",borderRadius:"4px","& .MuiLinearProgress-bar":{backgroundColor:"rgba(255, 255, 255, 1)",borderRadius:"4px"}}}));const D=function(e){var i,o,t,n,s,a,d,x;const D=(0,v.Zp)(),P=(0,A.u)(),T=(0,l.useContext)(y.R),U=(0,c.A)(P.breakpoints.down("md")),[W,q]=(0,l.useState)(1),Y=(0,v.zy)(),[H,N]=(0,l.useState)([]),[Z,G]=(0,l.useState)(H.length),[M,Q]=(0,l.useState)(!1),[X,$]=((0,l.useRef)(null),(0,l.useState)(0)),[F,J]=(0,l.useState)("UP");(0,l.useEffect)((()=>{K()}),[]);const K=async()=>{const e=localStorage.getItem("token");try{var i,o;const t=await(0,w.A)({method:"GET",url:"".concat(f.A.getLeason,"/").concat(null===Y||void 0===Y||null===(i=Y.state)||void 0===i?void 0:i.level_id,"/").concat(null===Y||void 0===Y||null===(o=Y.state)||void 0===o?void 0:o.module_id),headers:{token:e}});200===t.status&&(N(t.data.result),G(t.data.result.length))}catch(t){console.log(t,"error")}},O=()=>{q((e=>e<Z?e+1:Z)),(0,b.Xm)("  "),Q(!0)},V=()=>{q((e=>e>1?e-1:1)),Q(!0)};(0,l.useEffect)((()=>{if(M){const e=setTimeout((()=>{Q(!1)}),1e3);return()=>clearTimeout(e)}}),[M]);const ee=e=>{switch(e){case 3:return"rgba(255, 246, 200, 1)";case 2:return"rgba(240, 220, 255, 1)";default:return"rgba(255, 220, 234, 1)"}},[ie,oe]=(0,l.useState)(!1),[te,ne]=(0,l.useState)(""),se=(0,k.uh)({onSwipedUp:()=>{var e,i;(oe(!0),ne("up"),console.log("Swiped Up"),O(),W===Z)&&D("/take-quiz",{state:{module_id:null===Y||void 0===Y||null===(e=Y.state)||void 0===e?void 0:e.level_id,level_id:null===Y||void 0===Y||null===(i=Y.state)||void 0===i?void 0:i.module_id}})},onSwipedDown:()=>{oe(!1),ne("down"),console.log("Swiped Down"),V()},onSwiping:e=>{const{dir:i}=e;"Up"!==i&&"Down"!==i||(ne("Swiping ".concat(i.toLowerCase())),console.log("Swiping ".concat(i.toLowerCase())))}}),le=(0,l.useRef)(null);return(0,l.useEffect)((()=>{const e=e=>{e.touches.length>1||e.preventDefault()},i=le.current;return i&&i.addEventListener("touchmove",e,{passive:!1}),()=>{i&&i.removeEventListener("touchmove",e)}}),[]),(0,S.jsxs)(B,{ref:le,sx:{background:ee(W),backgroundSize:"100% 200%",backgroundPosition:"bottom",animation:M?"".concat(C," 1s forwards"):"none",transition:"background 1s"},children:[(0,S.jsx)(p.A,{maxWidth:"lg",children:(0,S.jsxs)(u.Ay,{container:!0,spacing:4,children:[(0,S.jsx)(u.Ay,{item:!0,xs:12,sm:12,md:8,sx:{height:"calc(100vh - 77px)",overflow:"auto"},children:(0,S.jsxs)(r.A,{sx:_.CombineBox,children:[(0,S.jsxs)(r.A,{sx:_.gridBox,children:[(0,S.jsx)(r.A,{sx:_.flexBox,children:(0,S.jsx)(g.WQq,{color:"rgba(0, 0, 0, 1)",onClick:()=>{D("/dashboard")},cursor:"pointer"})}),(0,S.jsxs)(r.A,{sx:{},children:[(0,S.jsx)(m.A,{variant:"h1",children:(null===(i=H[W-1])||void 0===i?void 0:i.name)||"--"}),(0,S.jsx)(m.A,{variant:"h4",sx:{marginTop:"14px"},children:(null===(o=H[W-1])||void 0===o?void 0:o.description)||"--"})]})]}),(0,S.jsx)(r.A,{sx:_.logoBox,children:(0,S.jsxs)(r.A,{sx:{display:"flex",alignItems:"start",gap:"15px"},children:[(null===T||void 0===T||null===(t=T.profile)||void 0===t?void 0:t.schoolLogo)&&(0,S.jsx)(R,{alt:"#",src:null===T||void 0===T||null===(n=T.profile)||void 0===n?void 0:n.schoolLogo}),(0,S.jsxs)(r.A,{children:[(null===T||void 0===T||null===(s=T.profile)||void 0===s?void 0:s.schoolName)&&(0,S.jsx)(m.A,{variant:"body2",children:null===T||void 0===T||null===(a=T.profile)||void 0===a?void 0:a.schoolName}),(null===T||void 0===T||null===(d=T.profile)||void 0===d?void 0:d.schoolAddress)&&(0,S.jsx)(m.A,{variant:"body2",children:null===T||void 0===T||null===(x=T.profile)||void 0===x?void 0:x.schoolAddress})]})]})})]})}),(0,S.jsxs)(u.Ay,{item:!0,md:4,sm:12,xs:12,children:[(0,S.jsx)(r.A,{sx:{background:"rgba(255, 255, 255, 1)",height:"325px",borderRadius:"16px",padding:"10px",border:"1px solid #E5E5E5",display:{md:"block",sm:"none",xs:"none"}},children:(0,S.jsx)(r.A,{sx:{},children:(0,S.jsx)(L,{alt:"",src:"images/add.png"})})}),(0,S.jsx)(r.A,{sx:{display:{md:"none",sm:"flex",xs:"flex"},position:{md:"relative",sm:"fixed",xs:"fixed"},bottom:{md:"",sm:"54px",xs:"54px"},left:{md:"",sm:"0",xs:"0"},width:{md:"auto",sm:"-webkit-fill-available",xs:"-webkit-fill-available"},justifyContent:"center",marginBottom:"5px",background:ee(W),backgroundSize:"100% 200%",backgroundPosition:"bottom",animation:M?"".concat(C," 1s forwards"):"none",transition:"background 1s"},children:(0,S.jsx)(r.A,{sx:{animation:"".concat(I," 1s infinite")},children:"Swiping down"==te?(0,S.jsx)(j.m9_,{style:3===W?{color:"rgba(232, 215, 124, 1)"}:2===W?{color:"rgba(222, 179, 255, 1)"}:{color:"rgba(255, 179, 209, 1)"}}):(0,S.jsx)(j.x$Y,{style:3===W?{color:"rgba(232, 215, 124, 1)"}:2===W?{color:"rgba(222, 179, 255, 1)"}:{color:"rgba(255, 179, 209, 1)"}})})})]})]})}),(0,S.jsx)(E,{sx:3===W?{padding:{md:"10px 25px",sm:"20px 25px",xs:"20px 25px"},position:{md:"fixed",sm:"fixed",xs:"fixed"},bottom:{md:"0",sm:"0",xs:"0"},width:{md:"100%",sm:"-webkit-fill-available",xs:"-webkit-fill-available"},alignItems:"center",background:"rgba(232, 215, 124, 1)"}:2===W?{padding:{md:"10px 25px",sm:"20px 25px",xs:"20px 25px"},position:{md:"fixed",sm:"fixed",xs:"fixed"},bottom:{md:"0",sm:"0",xs:"0"},width:{md:"100%",sm:"-webkit-fill-available",xs:"-webkit-fill-available"},alignItems:"center",background:"rgba(222, 179, 255, 1)"}:{padding:{md:"10px 25px",sm:"20px 25px",xs:"20px 25px"},position:{md:"fixed",sm:"fixed",xs:"fixed"},bottom:{md:"0",sm:"0",xs:"0"},width:{md:"100%",sm:"-webkit-fill-available",xs:"-webkit-fill-available"},alignItems:"center",background:"rgba(255, 179, 209, 1)"},style:"Swiping up"==te?{height:"115px",transition:"all 0.1s ease-in-out"}:"Swiping down"==te?{height:"35px",transition:"all 0.1s ease-in-out"}:{},children:(0,S.jsx)(p.A,{children:(0,S.jsxs)(u.Ay,{container:!0,children:[(0,S.jsx)(u.Ay,{item:!0,xs:12,sm:12,md:8,sx:{alignItems:"center",display:"grid"},children:(0,S.jsxs)(r.A,{children:[(0,S.jsxs)(r.A,{sx:{width:"100%",textAlign:"center",display:"flex",gap:"10px",alignItems:"center"},children:[(0,S.jsx)(z,{variant:"determinate",value:(W-1)/(Z-1)*100}),(0,S.jsxs)(m.A,{variant:"body2",color:"#fff",children:[W,"/",Z]})]}),U&&(0,S.jsx)(r.A,{...se,sx:{width:"100%",height:"100vh",position:"fixed",cursor:"pointer",top:"63px",left:"0"},children:(0,S.jsx)(r.A,{component:"span",sx:{width:"100%",backgroundColor:"blue",borderRadius:"50%"}})})]})}),(0,S.jsx)(u.Ay,{item:!0,md:4,sx:{display:{md:"block",sm:"none",xs:"none"}},children:(0,S.jsxs)(r.A,{sx:{display:"flex",justifyContent:"end",gap:"8px"},children:[(0,S.jsx)(h.Ztw,{onClick:V,disabled:W<=1,color:"rgba(255, 255, 255, 1)",fontSize:"48px",cursor:"pointer"}),(0,S.jsx)(h.fRr,{onClick:()=>{var e,i;0==Z||(O(),W===Z&&D("/take-quiz",{state:{module_id:null===Y||void 0===Y||null===(e=Y.state)||void 0===e?void 0:e.level_id,level_id:null===Y||void 0===Y||null===(i=Y.state)||void 0===i?void 0:i.module_id}}))},disabled:W>=Z,color:"rgba(255, 255, 255, 1)",fontSize:"48px",cursor:"pointer"})]})})]})})})]})}}}]);
//# sourceMappingURL=847.4b81e1fe.chunk.js.map