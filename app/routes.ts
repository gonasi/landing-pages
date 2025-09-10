import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("landing-pages/components", [
    route("stepper", "routes/public/landing-pages/components/stepper.tsx"),
    route(
      "trust-badges",
      "routes/public/landing-pages/components/trust-badges.tsx",
    ),
  ]),
] satisfies RouteConfig;
