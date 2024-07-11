"use strict";(self.webpackChunkthecocoapp=self.webpackChunkthecocoapp||[]).push([[139],{7603:(e,t,i)=>{i.r(t),i.d(t,{default:()=>f});var r=i(5043),l=i(4535),n=i(6446),o=i(5865),a=i(9840),d=i(835),s=i(7306),p=i(6213),c=i(8877),u=i(525),m=i(579);const x={flexBox:{display:"flex",justifyContent:"space-between",alignItem:"center","@media(max-width:1000px)":{},"@media(max-width:767px)":{}},editBox:{position:"relative",bottom:"0",right:"30%"},gridBox:{display:"grid",gap:"16px"},logoBox:{height:"-webkit-fill-available",alignItems:"end",display:"grid",justifyContent:"start"},CombineBox:{paddingBottom:"20px",justifyContent:"center",alignItems:"center",border:"1px solid rgba(229, 229, 229, 1)",margin:"auto",maxWidth:"550px",borderRadius:"10px",padding:"40px"},buttonHandle:{display:"flex",justifyContent:"end",gap:"8px"},profileBox:{display:"flex",gap:"8px",padding:"10px",margin:"15px 0",border:"1px solid rgba(229, 229, 229, 1)",borderRadius:"8px"}},g=(0,l.Ay)(n.A)((e=>{let{theme:t}=e;return{padding:"15px 0px 0 0px",overflow:"auto",alignItems:"end",justifyContent:"space-between",alignContent:"space-between"}})),h=((0,l.Ay)(n.A)((e=>{let{theme:t}=e;return{padding:"45px",borderTop:"2px solid #D8D8D8","@media(max-width:767px)":{padding:"30px"}}})),(0,l.Ay)("img")((e=>{let{theme:t}=e;return{maxWidth:"330px","@media(max-width:767px)":{width:"100%"}}})),(0,l.Ay)("img")((e=>{let{theme:t}=e;return{width:"70px",height:"70px",margin:"0 12px"}})));const f=function(){var e;const t=(0,d.Zp)(),i=((0,d.zy)(),(0,r.useContext)(u.R)),[l,f]=(0,r.useState)([]),[A,y]=(0,r.useState)(""),[v,b]=(0,r.useState)(A),[j,C]=(0,r.useState)("");(0,r.useEffect)((()=>{var e;C((null===i||void 0===i||null===(e=i.profile)||void 0===e?void 0:e.name)||"")}),[i.profile]),console.log(l,"childData"),(0,r.useEffect)((()=>{w()}),[]);const w=async()=>{const e=localStorage.getItem("token");try{const t=await(0,p.A)({method:"GET",url:s.A.getAllChild,headers:{token:e}});200===t.status&&f(t.data.data)}catch(t){console.log(t,"error")}};return(0,m.jsx)(g,{children:(0,m.jsxs)(n.A,{sx:x.CombineBox,children:[(0,m.jsxs)("div",{style:{display:"grid",justifyContent:"center",alignItems:"center"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"center",marginBottom:"10px",position:"relative"},children:[(0,m.jsx)("img",{src:A?A=="".concat(s.A.imagGet,"/media/null")||A=="".concat(s.A.imagGet,"/media/None")?"images/defaultPic.png":A:"images/defaultPic.png",alt:"",style:{width:"80px",height:"80px",borderRadius:"50%"}}),(0,m.jsx)("div",{style:{position:"absolute",bottom:"-10px",right:"35px"},children:(0,m.jsxs)(n.A,{sx:x.editBox,children:[(0,m.jsx)("input",{type:"file",accept:"image/*",multiple:"false",style:{position:"absolute",zIndex:"1",width:"-webkit-fill-available",overflow:"hidden",height:"100%",opacity:"0"},onChange:e=>(e=>{if(e.target.files[0]){const t=e.target.files[0];b(t);const i=new FileReader;i.onload=()=>{y(i.result)},i.readAsDataURL(t)}else b(A)})(e)}),(0,m.jsx)("img",{src:"images/editProfile.svg",style:{width:"35px",height:"35px",cursor:"pointer"}})]})})]}),(0,m.jsx)(o.A,{children:"Change Profile Photo"})]}),(0,m.jsxs)(n.A,{children:[(0,m.jsx)(a.A,{placeholder:"Your Full name",variant:"outlined",fullWidth:!0,size:"small",disabled:!0,inputProps:{maxLength:256},value:null===i||void 0===i||null===(e=i.profile)||void 0===e?void 0:e.email,name:"name",onChange:()=>{},style:{margin:"15px 0"}}),(0,m.jsx)(a.A,{placeholder:"Your Full name",variant:"outlined",fullWidth:!0,size:"small",inputProps:{maxLength:256},value:j,name:"name",onChange:e=>{C(e.target.value)},style:{marginTop:"5px"}})]}),0!=l.length?l.map(((e,i)=>(0,m.jsx)(n.A,{sx:x.profileBox,children:(0,m.jsx)(n.A,{style:{background:"rgba(255, 255, 255, 1)"},sx:x.userBox,children:(0,m.jsxs)(n.A,{sx:{display:"flex",alignItems:"center",gap:"10px"},onClick:()=>{t("/child-profile",{state:{name:e.childName,img:e.profilePic?e.profilePic:"Male"==e.gender?"images/boyprofile.jpg":"images/girlprofile.jpg",childId:e._id,data:e}})},children:[(0,m.jsx)(h,{alt:"",src:e.profilePic?e.profilePic:"Male"==e.gender?"images/boyprofile.jpg":"images/girlprofile.jpg"}),(0,m.jsxs)(n.A,{children:[" ",(0,m.jsx)(o.A,{variant:"body1",children:e.childName}),(0,m.jsx)(n.A,{sx:x.GapBox})]})]})})}))):(0,m.jsx)(n.A,{sx:x.profileBox,children:(0,m.jsx)(n.A,{style:{background:"rgba(255, 255, 255, 1)"},sx:x.userBox,children:(0,m.jsxs)(n.A,{sx:{display:"flex",alignItems:"center",gap:"10px"},onClick:()=>{t("/child-profile",{state:{name:"Add",img:"",childId:"",data:""}})},children:[(0,m.jsx)(c.Ve7,{style:{color:"#D8D8D8",fontSize:"25px"}}),(0,m.jsx)(o.A,{variant:"body2",children:"Add child"}),(0,m.jsx)(n.A,{children:(0,m.jsx)(n.A,{sx:x.GapBox})})]})})})]})})}},3193:(e,t,i)=>{i.d(t,{A:()=>v});var r=i(8587),l=i(8168),n=i(5043),o=i(8387),a=i(8606),d=i(2876),s=i(4535),p=i(112),c=i(6803),u=i(154),m=i(1053),x=i(7056),g=i(2400);function h(e){return(0,g.Ay)("MuiFormControl",e)}(0,x.A)("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);var f=i(579);const A=["children","className","color","component","disabled","error","focused","fullWidth","hiddenLabel","margin","required","size","variant"],y=(0,s.Ay)("div",{name:"MuiFormControl",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return(0,l.A)({},t.root,t["margin".concat((0,c.A)(i.margin))],i.fullWidth&&t.fullWidth)}})((e=>{let{ownerState:t}=e;return(0,l.A)({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},"normal"===t.margin&&{marginTop:16,marginBottom:8},"dense"===t.margin&&{marginTop:8,marginBottom:4},t.fullWidth&&{width:"100%"})})),v=n.forwardRef((function(e,t){const i=(0,d.A)({props:e,name:"MuiFormControl"}),{children:s,className:x,color:g="primary",component:v="div",disabled:b=!1,error:j=!1,focused:C,fullWidth:w=!1,hiddenLabel:B=!1,margin:S="none",required:W=!1,size:I="medium",variant:P="outlined"}=i,k=(0,r.A)(i,A),D=(0,l.A)({},i,{color:g,component:v,disabled:b,error:j,fullWidth:w,hiddenLabel:B,margin:S,required:W,size:I,variant:P}),z=(e=>{const{classes:t,margin:i,fullWidth:r}=e,l={root:["root","none"!==i&&"margin".concat((0,c.A)(i)),r&&"fullWidth"]};return(0,a.A)(l,h,t)})(D),[F,R]=n.useState((()=>{let e=!1;return s&&n.Children.forEach(s,(t=>{if(!(0,u.A)(t,["Input","Select"]))return;const i=(0,u.A)(t,["Select"])?t.props.input:t;i&&(0,p.gr)(i.props)&&(e=!0)})),e})),[N,q]=n.useState((()=>{let e=!1;return s&&n.Children.forEach(s,(t=>{(0,u.A)(t,["Input","Select"])&&((0,p.lq)(t.props,!0)||(0,p.lq)(t.props.inputProps,!0))&&(e=!0)})),e})),[E,L]=n.useState(!1);b&&E&&L(!1);const M=void 0===C||b?E:C;let G;const T=n.useMemo((()=>({adornedStart:F,setAdornedStart:R,color:g,disabled:b,error:j,filled:N,focused:M,fullWidth:w,hiddenLabel:B,size:I,onBlur:()=>{L(!1)},onEmpty:()=>{q(!1)},onFilled:()=>{q(!0)},onFocus:()=>{L(!0)},registerEffect:G,required:W,variant:P})),[F,g,b,j,N,M,w,B,G,W,I,P]);return(0,f.jsx)(m.A.Provider,{value:T,children:(0,f.jsx)(y,(0,l.A)({as:v,ownerState:D,className:(0,o.A)(z.root,x),ref:t},k,{children:s}))})}))},1053:(e,t,i)=>{i.d(t,{A:()=>r});const r=i(5043).createContext(void 0)},112:(e,t,i)=>{function r(e){return null!=e&&!(Array.isArray(e)&&0===e.length)}function l(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e&&(r(e.value)&&""!==e.value||t&&r(e.defaultValue)&&""!==e.defaultValue)}function n(e){return e.startAdornment}i.d(t,{gr:()=>n,lq:()=>l})}}]);
//# sourceMappingURL=139.61ede86e.chunk.js.map