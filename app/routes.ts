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
    route(
      "landing-pages",
      "routes/public/landing-pages/landing-pages-index.tsx",
    ),
  ]),

  layout("routes/layouts/logged-in-layout.tsx", [
    route("ad-sets/:adSetId", "routes/private/ad-sets/view-ad-set.tsx", [
      route(
        ":adCreativeId/edit",
        "routes/private/ad-creatives/edit-ad-creative.tsx",
      ),
      route(
        ":adCreativeId/delete",
        "routes/private/ad-creatives/delete-ad-creative.tsx",
      ),
    ]),
  ]),

  ...prefix("landing-pages/components", [
    route("stepper", "routes/public/landing-pages/components/stepper.tsx"),
    route(
      "trust-badges",
      "routes/public/landing-pages/components/trust-badges.tsx",
    ),
    route(
      "this-anti-choking-device",
      "routes/public/landing-pages/components/this-anti-choking-device.tsx",
    ),
  ]),

  ...prefix("landing-pages/page", [
    route(
      "senior-friendly-choking-protection",
      "routes/public/landing-pages/page/senior-friendly-choking-protection.tsx",
    ),
  ]),
] satisfies RouteConfig;
