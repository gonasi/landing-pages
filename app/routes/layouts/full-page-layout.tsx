import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

type FullPageLayoutProps = {
  children: React.ReactNode;
  prevLink?: string;
  title: string;
  className?: string;
};

export default function FullPageLayout({
  children,
  prevLink = "/",
  title,
  className = "",
}: FullPageLayoutProps) {
  return (
    <div className={className}>
      <nav className="sticky top-0 z-50 bg-background/90 py-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
          <div className="flex items-center space-x-4">
            {prevLink && (
              <Link to={prevLink} className="hover:opacity-80">
                <ArrowLeft />
              </Link>
            )}
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        </div>
      </nav>
      <main className="container mx-auto min-h-screen pt-4">{children}</main>
    </div>
  );
}
