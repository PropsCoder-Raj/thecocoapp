"use strict";(self.webpackChunkthecocoapp=self.webpackChunkthecocoapp||[]).push([[479],{7306:(e,t,a)=>{a.d(t,{A:()=>n});const i="http://thecocoapp.com:8080/api/v1/",n={loginGenerateOtp:"".concat(i,"auth/login/generate-otp"),loginVerifyOtp:"".concat(i,"auth/login/verify-otp"),signupGenerateOtp:"".concat(i,"auth/signup/generate-otp"),signupVerifiedEmail:"".concat(i,"auth/signup-with-verfied-email"),signupVerifyOtp:"".concat(i,"auth/signup/verify-otp"),createChild:"".concat(i,"child/create"),getSchool:"".concat(i,"school/get-all-schools"),getAllChild:"".concat(i,"child/get-all-childs"),switchChild:"".concat(i,"child/switch-to-active-child"),allModules:"".concat(i,"dashboard/get-all-modules"),getLeason:"".concat(i,"dashboard/get-lessons"),getQuestions:"".concat(i,"dashboard/get-questions"),attemptQuestions:"".concat(i,"questions/attempt-questions")}},7479:(e,t,a)=>{a.r(t),a.d(t,{default:()=>f});var i=a(5043),n=a(6446),l=a(5865),s=a(8903),o=a(9840),c=a(1673),r=a(1906),d=a(3516),h=a(899),u=a(5666),p=a(7306),g=a(6213),m=a(835),x=a(9416),y=a(3768),v=a(4942),A=a(6178),j=a.n(A),b=a(579);const f=function(e){const[t,a]=(0,i.useState)(!1),A=(0,m.Zp)(),f=(0,i.useContext)(v.c);return(0,b.jsx)(u.A,{title:"Login",children:(0,b.jsxs)(n.A,{sx:{display:"grid",gap:"13px",textAlign:"center"},children:[(0,b.jsx)(l.A,{variant:"h1",color:"rgba(67, 69, 71, 1)",mt:1,children:"Login"}),(0,b.jsxs)(l.A,{variant:"h4",color:"rgba(67, 69, 71, 1)",children:["Welcome back! Login now to see",(0,b.jsx)("br",{})," where you left off"]}),(0,b.jsx)(d.l1,{onSubmit:async e=>{a(!0);try{const t=await g.A.post(p.A.loginGenerateOtp,{email:e.email});200===t.status&&(y.Ay.success(t.data.message),a(!1),A("/verify",{state:{email:e.email,type:"login"}}),f.setEndTime(j()().add(3,"m").unix()))}catch(n){var t,i;y.Ay.error((null===n||void 0===n||null===(t=n.response)||void 0===t||null===(i=t.data)||void 0===i?void 0:i.message)||"Something went wrong please try again later"),a(!1)}},initialValues:{email:""},validationSchema:h.Ik().shape({email:h.Yj().required("Please enter your email address.")}),children:e=>{let{errors:a,handleBlur:i,handleChange:h,handleSubmit:u,touched:p,values:g}=e;return(0,b.jsxs)(d.lV,{onSubmit:u,children:[(0,b.jsxs)(s.Ay,{sx:{margin:"13px 0"},children:[(0,b.jsx)(o.A,{placeholder:"Email ID",type:"email",variant:"outlined",fullWidth:!0,size:"small",inputProps:{maxLength:256},value:g.email,name:"email",error:Boolean(p.email&&a.email),onBlur:i,onChange:h,SX:{padding:"8px 13px"}}),(0,b.jsx)(c.A,{error:!0,children:p.email&&a.email})]}),(0,b.jsxs)(s.Ay,{children:[(0,b.jsx)(n.A,{sx:{marginTop:"26px"},children:(0,b.jsxs)(r.A,{type:"submit",variant:"contained",disabled:t,fullWidth:!0,children:["Login",t&&(0,b.jsx)(x.A,{})]})}),(0,b.jsx)(n.A,{sx:{display:"grid",justifyContent:"center",mt:"13px"},children:(0,b.jsxs)(l.A,{variant:"body1",color:"rgba(60, 60, 60, 1)",children:["Don\u2019t have an account?",(0,b.jsx)("span",{onClick:()=>{A("/sign-up")},style:{color:"rgba(0, 186, 242, 1)",cursor:"pointer"},children:"\xa0Sign up"})]})})]})]})}})]})})}}}]);
//# sourceMappingURL=479.1688b0e8.chunk.js.map