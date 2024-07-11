import { lazy } from "react";
import HomeLayout from "src/layouts/HomeLayout";
import LoginLayout from "./layouts/LoginLayout";
import DashboardLayout from "./layouts/DashboardLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/home/Home")),
  },
  {
    exact: true,
    path: "/login",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/login/Login")),
  },
  {
    exact: true,
    path: "/verify",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/verify-otp/Verify")),
  },
  {
    exact: true,
    path: "/sign-up",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/signUp/SignUp")),
  },
  {
    exact: true,
    path: "/reset-pin",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/resetPin/ResetPin")),
  },
  {
    exact: true,
    path: "/reset-pin-set",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/resetPin/ResetPassword")),
  },
  {
    exact: true,
    path: "/add-child",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/add-child/index")),
  },
  {
    exact: true,
    path: "/dashboard",
    layout: DashboardLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/dashboard/Dashboard")),
  },
  {
    exact: true,
    path: "/leason",
    // layout: DashboardLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/dashboard/Leason")),
  },
  {
    exact: true,
    path: "/take-quiz",
    // layout: DashboardLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/dashboard/TakeQuiz")),
  },
  {
    exact: true,
    path: "/complete",
    // layout: DashboardLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/dashboard/Complete")),
  },
  {
    exact: true,
    path: "/questions",
    // layout: DashboardLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/dashboard/QuetionsScreen")),
  },
  {
    exact: true,
    path: "/update-profile",
    layout: DashboardLayout,
    // guard: true,
    component: lazy(() => import("src/views/pages/dashboard/UpdateProfile")),
  },
  {
    exact: true,
    path: "/child-profile",
    layout: DashboardLayout,
    // guard: true,
    component: lazy(() => import("src/views/pages/dashboard/ChildProfile")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/license/privacyPolicy")),
  },
  {
    exact: true,
    path: "/terms&condition",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/license/termsCondition")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
];
