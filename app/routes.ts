import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("landing-pages/stepper", "routes/landing-pages/stepper.tsx"),
] satisfies RouteConfig;
