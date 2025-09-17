import { Link } from "react-router";

// update meta
export function meta() {
  return [
    { title: "Landing Pages | SMC" },
    {
      name: "description",
      content:
        "Explore our collection of SMC landing pages, each tailored to your needs.",
    },
  ];
}

// define pages
const pages = [
  {
    slug: "senior-friendly-choking-protection",
    path: "/landing-pages/page/senior-friendly-choking-protection",
  },
];

export default function LandingPagesIndex() {
  return (
    <div className="space-y-4 py-10">
      <ul className="list-disc pl-6">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link to={page.path} className="text-blue-600 hover:underline">
              {page.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
