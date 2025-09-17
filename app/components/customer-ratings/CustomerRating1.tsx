import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import { cn } from "~/lib/utils";

interface CustomerRatingProps {
  count?: number | string;
  className?: string;
}

export function CustomerRating1({
  count = "50,000+",
  className,
}: CustomerRatingProps) {
  return (
    <motion.div
      className={cn("flex items-center gap-1", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Stars */}
      <motion.div
        className="flex items-center gap-0.5 text-yellow-500"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Star size={18} className="fill-yellow-500 stroke-yellow-500" />
          </motion.div>
        ))}

        <motion.div
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <StarHalf size={18} className="fill-yellow-500 stroke-yellow-500" />
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.span
        className="text-sm font-bold text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {count} Happy Customers
      </motion.span>
    </motion.div>
  );
}
