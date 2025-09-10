import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signout", "routes/signout.tsx"),

  layout("routes/layouts/private-layout.tsx", [
    route("ads", "routes/private/ads.tsx"),
  ]),

  ...prefix("landing-pages/components", [
    route("stepper", "routes/public/landing-pages/components/stepper.tsx"),
    route(
      "trust-badges",
      "routes/public/landing-pages/components/trust-badges.tsx",
    ),
  ]),
] satisfies RouteConfig;
