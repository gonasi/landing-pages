import { NavLink, useLocation } from "react-router";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface Props {
  icon: React.ReactNode;
  to: string;
  name: string;
  isLoading?: boolean;
}

export function NavbarLink({ icon, to, name, isLoading = false }: Props) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      aria-disabled={isActive || isLoading}
      className={({ isPending }) =>
        cn(
          "group relative flex h-full items-center gap-2 px-3 py-2",
          "text-gray-600 transition-colors duration-200",
          "hover:text-gray-900",

          isActive && "text-gray-900 font-medium",
          (isPending || isLoading) && "opacity-60 cursor-wait",
          isPending && "animate-pulse"
        )
      }
    >
      <div className="shrink-0">{icon}</div>

      <span className="text-sm">{name}</span>

      {/* Simple bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gray-900"
        initial={false}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </NavLink>
  );
}
