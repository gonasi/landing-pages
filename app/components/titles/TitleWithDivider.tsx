import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

type Props = {
  /** Title text or node to render in the center */
  title: React.ReactNode;
  /** Additional container class names */
  className?: string;
  /** Tailwind class applied to the horizontal lines */
  lineClassName?: string;
  /** Small / medium / large sizes */
  size?: "sm" | "md" | "lg";
  /** Whether to animate the lines and title */
  animated?: boolean;
};

export default function TitleWithDivider({
  title,
  className,
  lineClassName,
  size = "md",
  animated = true,
}: Props) {
  const sizeMap: Record<typeof size, string> = {
    sm: "text-sm py-1",
    md: "text-base py-2",
    lg: "text-lg py-3",
  };

  const lineBase = "flex-1 h-px bg-current opacity-30";
  const lineClasses = cn(lineBase, lineClassName);

  const titleWrapper = cn(
    "inline-flex items-center justify-center gap-4",
    sizeMap[size]
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className={cn("w-full flex items-center", className)}
        role="group"
        aria-label={typeof title === "string" ? title : "Section title"}
      >
        <motion.div
          className={lineClasses}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.36 }}
          style={{ transformOrigin: "left center" }}
        />

        <div className={titleWrapper} aria-hidden={false}>
          <motion.span
            className="whitespace-nowrap font-medium"
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.06 }}
          >
            {title}
          </motion.span>
        </div>

        <motion.div
          className={lineClasses}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.36, delay: 0.06 }}
          style={{ transformOrigin: "right center" }}
        />
      </motion.div>
    );
  }

  return (
    <div
      className={cn("w-full flex items-center", className)}
      role="group"
      aria-label={typeof title === "string" ? title : "Section title"}
    >
      <div className={lineClasses} />

      <div className={titleWrapper} aria-hidden={false}>
        <span className="whitespace-nowrap font-medium">{title}</span>
      </div>

      <div className={lineClasses} />
    </div>
  );
}

/*
Usage examples:

<TitleWithDivider title="Features" />

// customize size and line appearance
<TitleWithDivider
  title={<span className="uppercase tracking-wide">Reviews</span>}
  size="sm"
  className="my-6"
  lineClassName="bg-gray-300"
/>

// disable animation for SSR snapshots or tests
<TitleWithDivider title="Get started" animated={false} />
*/
