"use strict";(self.webpackChunkthecocoapp=self.webpackChunkthecocoapp||[]).push([[477],{3477:(e,t,r)=>{r.r(t),r.d(t,{default:()=>T});var n=r(5043),i=r(6446),o=r(5865),a=r(8903),s=r(3193),l=r(1673),d=r(1906),p=r(3516),c=r(899),u=r(5666),m=r(7306),x=r(6213),h=r(835),g=r(9416),f=r(3768),A=r(4942),v=r(6178),y=r.n(v),b=r(5237),j=r.n(b),C=r(579);const w={otpFormControl:{"& input":{color:"#0B1426",width:"48px !important",height:"48px !important",marginRight:"10px !important",border:"1px solid #D8D8D8",borderRadius:"8px","@media(max-width:460px)":{width:"45px !important",height:"45px !important",marginRight:"7px !important"}}}};const T=function(e){const[t,r]=(0,n.useState)(!1),v=(0,h.Zp)(),b=(0,h.zy)(),T=(0,n.useContext)(A.c);return(0,C.jsx)(u.A,{title:"Reset Password",children:(0,C.jsxs)(i.A,{sx:{display:"grid",gap:"13px",textAlign:"center"},children:[(0,C.jsx)(o.A,{variant:"h1",color:"rgba(67, 69, 71, 1)",mt:1,children:"Reset PIN"}),(0,C.jsxs)(o.A,{variant:"h4",color:"rgba(67, 69, 71, 1)",children:["Forgot your PIN?",(0,C.jsx)("br",{}),"Reset it now to restore your access."]}),(0,C.jsx)(p.l1,{onSubmit:async e=>{var t;r(!0);const n=null===b||void 0===b||null===(t=b.state)||void 0===t?void 0:t.token;try{const t=await(0,x.A)({method:"POST",url:m.A.resetPin,headers:{token:n},data:{new_pin:e.pin,confirm_pin:e.Cotp}});200===t.status&&(f.Ay.success(t.data.message),r(!1),v("/login"),T.setEndTime(y()().add(0,"m").unix()))}catch(a){var i,o;f.Ay.error((null===a||void 0===a||null===(i=a.response)||void 0===i||null===(o=i.data)||void 0===o?void 0:o.message)||"Something went wrong please try again later"),r(!1)}},initialValues:{pin:"",Cotp:""},validationSchema:c.Ik().shape({pin:c.Yj().length(4,"OTP must be 4 digits").required("Please enter your OTP."),Cotp:c.Yj().length(4,"OTP must be 4 digits").required("Please enter your OTP.").oneOf([c.KR("pin"),null],"Pin should match.")}),children:e=>{let{errors:r,handleBlur:n,handleChange:c,handleSubmit:u,touched:m,values:x,setFieldValue:h}=e;return(0,C.jsxs)(p.lV,{onSubmit:u,children:[(0,C.jsx)(a.Ay,{sx:{margin:"13px 0",textAlign:"start"},children:(0,C.jsxs)(i.A,{children:[(0,C.jsx)(o.A,{variant:"body1",color:"rgba(67, 69, 71, 1)",sx:{marginBottom:"13px"},children:"Enter 4-digit pin"}),(0,C.jsx)(s.A,{fullWidth:!0,error:Boolean(m.pin&&r.pin),sx:w.otpFormControl,children:(0,C.jsx)(j(),{value:x.pin,inputVariant:"standard",autoComplete:"off",onChange:e=>{h("pin",e)},name:"pin",id:"inputID",style:{display:"flex",justifyContent:"start",width:"100%",gap:"15px"},OTPLength:4,otpType:"number"})}),m.pin&&r.pin&&(0,C.jsx)(l.A,{error:!0,children:r.pin})]})}),(0,C.jsx)(a.Ay,{sx:{margin:"13px 0",textAlign:"start"},children:(0,C.jsxs)(i.A,{children:[(0,C.jsx)(o.A,{variant:"body1",color:"rgba(67, 69, 71, 1)",sx:{marginBottom:"13px"},children:"Confirm 4-digit pin"}),(0,C.jsx)(s.A,{fullWidth:!0,error:Boolean(m.Cotp&&r.Cotp),sx:w.otpFormControl,children:(0,C.jsx)(j(),{value:x.Cotp,inputVariant:"standard",autoComplete:"off",onChange:e=>{h("Cotp",e)},name:"Cotp",id:"inputID",style:{display:"flex",justifyContent:"start",width:"100%",gap:"15px"},OTPLength:4,otpType:"number"})}),m.Cotp&&r.Cotp&&(0,C.jsx)(l.A,{error:!0,children:r.Cotp})]})}),(0,C.jsxs)(a.Ay,{children:[(0,C.jsx)(i.A,{sx:{marginTop:"18px"},children:(0,C.jsxs)(d.A,{type:"submit",variant:"contained",disabled:t,fullWidth:!0,children:["Submit",t&&(0,C.jsx)(g.A,{})]})}),(0,C.jsx)(i.A,{sx:{display:"grid",justifyContent:"center",mt:"13px"},children:(0,C.jsxs)(o.A,{variant:"body1",color:"rgba(60, 60, 60, 1)",children:["Have an account?",(0,C.jsx)("span",{onClick:()=>{v("/login")},style:{color:"rgba(0, 186, 242, 1)",cursor:"pointer"},children:"\xa0Log In"})]})})]})]})}})]})})}},4827:(e,t,r)=>{function n(e){let{props:t,states:r,muiFormControl:n}=e;return r.reduce(((e,r)=>(e[r]=t[r],n&&"undefined"===typeof t[r]&&(e[r]=n[r]),e)),{})}r.d(t,{A:()=>n})},5213:(e,t,r)=>{r.d(t,{A:()=>o});var n=r(5043),i=r(1053);function o(){return n.useContext(i.A)}},1673:(e,t,r)=>{r.d(t,{A:()=>b});var n=r(8587),i=r(8168),o=r(5043),a=r(8387),s=r(8606),l=r(4827),d=r(5213),p=r(4535),c=r(6803),u=r(7056),m=r(2400);function x(e){return(0,m.Ay)("MuiFormHelperText",e)}const h=(0,u.A)("MuiFormHelperText",["root","error","disabled","sizeSmall","sizeMedium","contained","focused","filled","required"]);var g,f=r(2876),A=r(579);const v=["children","className","component","disabled","error","filled","focused","margin","required","variant"],y=(0,p.Ay)("p",{name:"MuiFormHelperText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.size&&t["size".concat((0,c.A)(r.size))],r.contained&&t.contained,r.filled&&t.filled]}})((e=>{let{theme:t,ownerState:r}=e;return(0,i.A)({color:(t.vars||t).palette.text.secondary},t.typography.caption,{textAlign:"left",marginTop:3,marginRight:0,marginBottom:0,marginLeft:0,["&.".concat(h.disabled)]:{color:(t.vars||t).palette.text.disabled},["&.".concat(h.error)]:{color:(t.vars||t).palette.error.main}},"small"===r.size&&{marginTop:4},r.contained&&{marginLeft:14,marginRight:14})})),b=o.forwardRef((function(e,t){const r=(0,f.A)({props:e,name:"MuiFormHelperText"}),{children:o,className:p,component:u="p"}=r,m=(0,n.A)(r,v),h=(0,d.A)(),b=(0,l.A)({props:r,muiFormControl:h,states:["variant","size","disabled","error","filled","focused","required"]}),j=(0,i.A)({},r,{component:u,contained:"filled"===b.variant||"outlined"===b.variant,variant:b.variant,size:b.size,disabled:b.disabled,error:b.error,filled:b.filled,focused:b.focused,required:b.required}),C=(e=>{const{classes:t,contained:r,size:n,disabled:i,error:o,filled:a,focused:l,required:d}=e,p={root:["root",i&&"disabled",o&&"error",n&&"size".concat((0,c.A)(n)),r&&"contained",l&&"focused",a&&"filled",d&&"required"]};return(0,s.A)(p,x,t)})(j);return(0,A.jsx)(y,(0,i.A)({as:u,ownerState:j,className:(0,a.A)(C.root,p),ref:t},m,{children:" "===o?g||(g=(0,A.jsx)("span",{className:"notranslate",children:"\u200b"})):o}))}))}}]);
//# sourceMappingURL=477.4c0a75ed.chunk.js.map