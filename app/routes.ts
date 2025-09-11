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
    route("ad-sets", "routes/private/ad-sets/ad-sets.tsx", [
      route("new", "routes/private/ad-sets/new-ad-set.tsx"),
    ]),
  ]),

  layout("routes/layouts/logged-in-layout.tsx", [
    route("ad-sets/:adSetId", "routes/private/ad-sets/view-ad-set.tsx"),
  ]),

  ...prefix("landing-pages/components", [
    route("stepper", "routes/public/landing-pages/components/stepper.tsx"),
    route(
      "trust-badges",
      "routes/public/landing-pages/components/trust-badges.tsx",
    ),
  ]),
] satisfies RouteConfig;
