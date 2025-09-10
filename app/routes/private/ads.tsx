import { Plus } from "lucide-react";
import { Link, Outlet } from "react-router";

export function meta() {
  return [
    { title: "Ads | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

export default function AdsPage() {
  return (
    <>
      <section className="container mx-auto p-4 h-screen">
        <div className="flex items-center justify-between">
          <h2>Ads</h2>
          <Link
            to="/ads/new"
            className="flex items-center space-x-2  mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus />
            <span className="hidden md:flex">Upload Creative</span>
          </Link>
        </div>
      </section>
      <Outlet />
    </>
  );
}
