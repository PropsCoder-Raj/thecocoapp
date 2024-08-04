(self.webpackChunkthecocoapp=self.webpackChunkthecocoapp||[]).push([[479],{7479:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>C});var r=n(5043),a=n(6446),o=n(5865),i=n(8903),u=n(9840),l=n(1673),s=n(3193),c=n(1906),p=n(3516),d=n(899),f=n(6005),h=n(7306),m=n(6213),g=n(835),y=n(9416),x=n(3768),b=n(4942),v=(n(6178),n(5237)),j=n.n(v),O=n(579);const A={otpFormControl:{"& input":{color:"#0B1426",width:"48px !important",height:"48px !important",marginRight:"10px !important",border:"1px solid #D8D8D8",borderRadius:"8px","@media(max-width:460px)":{width:"45px !important",height:"45px !important",marginRight:"7px !important"}}}};const C=function(e){const[t,n]=(0,r.useState)(!1),v=(0,g.Zp)();return(0,r.useContext)(b.c),(0,r.useEffect)((()=>{localStorage.removeItem("emailReset")}),[]),(0,O.jsx)(f.A,{title:"Login",children:(0,O.jsxs)(a.A,{sx:{display:"grid",gap:"13px",textAlign:"center"},children:[(0,O.jsx)(o.A,{variant:"h1",color:"rgba(67, 69, 71, 1)",mt:1,children:"Login"}),(0,O.jsxs)(o.A,{variant:"h4",color:"rgba(67, 69, 71, 1)",children:["Welcome back! Login now to see",(0,O.jsx)("br",{})," where you left off"]}),(0,O.jsx)(p.l1,{onSubmit:async e=>{n(!0);try{const t=await m.A.post(h.A.loginGenerateOtp,{email:e.email,pin:e.pin});200===t.status&&(x.Ay.success(t.data.message),n(!1),v("/dashboard"),localStorage.setItem("token",t.data.token))}catch(a){var t,r;x.Ay.error((null===a||void 0===a||null===(t=a.response)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.message)||"Something went wrong please try again later"),n(!1)}},initialValues:{email:"",pin:""},validationSchema:d.Ik().shape({email:d.Yj().required("Please enter your email address."),pin:d.Yj().length(4,"OTP must be 4 digits").required("Please enter your OTP.")}),children:e=>{let{errors:n,handleBlur:r,handleChange:d,handleSubmit:f,touched:h,values:m,setFieldValue:g}=e;return(0,O.jsxs)(p.lV,{onSubmit:f,children:[(0,O.jsxs)(i.Ay,{sx:{margin:"13px 0"},children:[(0,O.jsx)(u.A,{placeholder:"Email ID",type:"email",variant:"outlined",fullWidth:!0,size:"small",inputProps:{maxLength:256},value:m.email,name:"email",error:Boolean(h.email&&n.email),onBlur:r,onChange:d,SX:{padding:"8px 13px"}}),(0,O.jsx)(l.A,{error:!0,children:h.email&&n.email})]}),(0,O.jsx)(i.Ay,{sx:{margin:"13px 0",textAlign:"start"},children:(0,O.jsxs)(a.A,{children:[(0,O.jsx)(o.A,{variant:"body1",color:"rgba(67, 69, 71, 1)",sx:{marginBottom:"13px"},children:"Enter 4-digit pin"}),(0,O.jsx)(s.A,{fullWidth:!0,error:Boolean(h.pin&&n.pin),sx:A.otpFormControl,children:(0,O.jsx)(j(),{value:m.pin,inputVariant:"standard",autoComplete:"off",onChange:e=>{g("pin",e)},name:"pin",id:"inputID",style:{display:"flex",justifyContent:"start",width:"100%",gap:"15px"},OTPLength:4,otpType:"number"})}),h.pin&&n.pin&&(0,O.jsx)(l.A,{error:!0,children:n.pin})]})}),(0,O.jsx)(i.Ay,{sx:{margin:"13px 0",textAlign:"start"},children:(0,O.jsx)(o.A,{variant:"body1",color:"rgba(67, 69, 71, 1)",sx:{cursor:"pointer"},onClick:()=>{v("/reset-pin")},children:"Reset pin?"})}),(0,O.jsxs)(i.Ay,{children:[(0,O.jsx)(a.A,{sx:{marginTop:"26px"},children:(0,O.jsxs)(c.A,{type:"submit",variant:"contained",disabled:t,fullWidth:!0,children:["Login",t&&(0,O.jsx)(y.A,{})]})}),(0,O.jsx)(a.A,{sx:{display:"grid",justifyContent:"center",mt:"13px"},children:(0,O.jsxs)(o.A,{variant:"body1",color:"rgba(60, 60, 60, 1)",children:["Don\u2019t have an account?",(0,O.jsx)("span",{onClick:()=>{v("/sign-up")},style:{color:"rgba(0, 186, 242, 1)",cursor:"pointer"},children:"\xa0Sign up"})]})})]})]})}})]})})}},5237:(e,t,n)=>{var r;window,e.exports=(r=n(5043),function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/otp-input-react/",n(n.s=1)}([function(e,t){e.exports=r},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){r(e,t,n[t])}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.r(t);var i=n(0),u=n.n(i);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(l){a=!0,o=l}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=function(e){var t=e.maxTime,n=e.onTimerComplete,r=e.timeInterval,a=e.onResendClick,o=Object(i.useRef)(),u=l(Object(i.useState)(t),2),s=u[0],c=u[1];return Object(i.useEffect)((function(){return o.current&&0===s?(clearTimeout(o.current),n&&n()):o.current=setTimeout((function(){c((function(e){return e-1}))}),r),function(){clearTimeout(o.current)}}),[n,s,r]),{handelResendClick:function(){a&&a(0===s),c(t)},remainingTime:s}};function c(e){var t=e.renderTime,n=e.renderButton,r=e.style,i=e.className,l=o(e,["renderTime","renderButton","style","className"]),c=s(l),p=c.remainingTime,d=c.handelResendClick;return u.a.createElement("div",{className:i||"","data-testid":"otp-resend-root",style:a({display:"flex",justifyContent:"space-between"},r)},t?t(p):u.a.createElement("span",null,p," sec"),n?n({disabled:0!==p,onClick:d,remainingTime:p}):u.a.createElement("button",{disabled:0!==p,onClick:d,type:"button"},"Resend OTP"))}c.defaultProps={maxTime:60,timeInterval:1e3,style:{}};var p=c,d={width:32,height:32,textAlign:"center",marginRight:20},f=u.a.memo((function(e){var t=e.focus,n=e.autoFocus,r=e.disabled,l=e.value,s=e.onInputFocus,c=e.index,p=e.secure,f=e.inputStyles,h=e.otpType,m=o(e,["focus","autoFocus","disabled","value","onInputFocus","index","secure","inputStyles","otpType"]),g=Object(i.useRef)(null),y=Object(i.useRef)(!1);Object(i.useEffect)((function(){n&&t&&g.current.focus()}),[]),Object(i.useEffect)((function(){y.current&&t&&g.current.focus(),y.current=!0}),[t]);var x="text";return p?x="password":"number"===h&&(x="tel"),u.a.createElement("input",Object.assign({style:a({},d,f),type:x,maxLength:"1",ref:g,disabled:r,onFocus:function(e){return s(c,e)},value:l||""},m))})),h=function(e){var t=e.autoFocus,n=e.value,r=e.otpType,a=e.onChange,o=e.OTPLength,u=l(Object(i.useState)(t?0:-1),2),s=u[0],c=u[1],p=function(){return n?n.toString().split(""):[]},d=function(e){var t=e.join("");a(t)},f=function(){!function(e){var t=Math.max(Math.min(o-1,e),0);c(t)}("next"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"next")?s+1:s-1)},h=function(e){var t=l(e,1)[0],n=p();n[s]=t,d(n)},m=function(e){switch(r){case"number":return!(e.charCodeAt(0)>57||e.charCodeAt(0)<48);case"alpha":return!(e.charCodeAt(0)>122||e.charCodeAt(0)<65);case"alphanumeric":return!(e.charCodeAt(0)>122||e.charCodeAt(0)<48);default:return!0}};return{activeInput:s,getOtpValue:p,handleOnChange:function(e){m(e.target.value)&&(h(e.target.value),f("next"))},handleOnKeyDown:function(e){switch(e.key){case"Backspace":e.preventDefault(),h(""),f("prev");break;case"Delete":e.preventDefault(),h("");break;case"ArrowLeft":e.preventDefault(),f("prev");break;case"ArrowRight":e.preventDefault(),f("next")}},handelOnInput:function(e){e.target.value.length>1&&(e.preventDefault(),f("next"))},handleOnPaste:function(e,t){e.preventDefault();for(var n=p(),r=e.clipboardData.getData("text/plain").slice(0,o-s).split(""),a=0;a<o;++a)a>=s&&r.length>0&&(n[a]=r.shift());for(var i=[n.length],u=0,l=0;l<n.length;++l)m(n[l])&&(i[u]=n[l],u++);d(i)},onInputFocus:function(e,t){c(e),t.target.select()}}},m=function(e){var t=e.OTPLength,n=e.disabled,r=e.autoFocus,o=e.value,l=void 0===o?"":o,s=e.onChange,c=e.otpType,p=e.secure,d=e.className,m=e.inputClassName,g=e.inputStyles,y=e.style,x=e.placeholder,b=h({autoFocus:r,value:l,otpType:c,onChange:s,OTPLength:t}),v=b.activeInput,j=b.getOtpValue,O=b.handleOnChange,A=b.handleOnKeyDown,C=b.handelOnInput,w=b.handleOnPaste,T=b.onInputFocus,P=Object(i.useMemo)((function(){for(var e=j(),a=[],o=0;o<t;o++)a.push(u.a.createElement(f,{className:m,inputStyles:g,key:o,focus:v===o,value:e[o],onChange:O,onKeyDown:A,onInput:C,onPaste:w,onInputFocus:T,index:o,disabled:n,autoFocus:r,secure:p,"data-testid":"input",otpType:c,placeholder:x&&x[o]}));return a}),[j,t,m,g,v,O,A,C,w,T,n,r,p,c,x]);return u.a.createElement("div",{style:a({display:"flex"},y),className:"".concat(d),"data-testid":"otp-input-root"},P)};m.defaultProps={className:"",inputClassName:"",OTPLength:4,onChange:function(){},disabled:!1,secure:!1,autoFocus:!1,value:"",otpType:"any",inputStyles:{},style:{},placeholder:void 0};var g=m;n.d(t,"ResendOTP",(function(){return p})),n.d(t,"default",(function(){return g}))}]))}}]);
//# sourceMappingURL=479.a83b9118.chunk.js.map