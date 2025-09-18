import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface IStarReviewProps {
  profileUrl: string;
  profileName: string;
  title: string;
  body: string;
  bundleImage: string;
  bundleName: string;
}

export function StarReview({
  profileUrl,
  profileName,
  title,
  body,
  bundleImage,
  bundleName,
}: IStarReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full md:max-w-xs bg-white rounded-2xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow"
    >
      {/* Profile */}
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <img
          src={profileUrl}
          alt="user profile"
          className="h-12 w-12 rounded-full shadow-md border border-gray-200"
        />
        <p className="font-semibold text-gray-800">{profileName}</p>
      </motion.div>

      {/* Stars + Title */}
      <div className="flex flex-col items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.15 * i,
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
            >
              <Star size={18} className="fill-yellow-400 stroke-yellow-500" />
            </motion.div>
          ))}
        </div>
        <p className="font-bold text-gray-900">{title}</p>
      </div>

      {/* Verified badge */}
      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
        Verified Purchase
      </p>

      {/* Review body */}
      <motion.p
        className="text-sm text-gray-700 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {body}
      </motion.p>

      {/* Bundle */}
      <motion.div
        className="flex items-center space-x-4 pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.img
          src={bundleImage}
          alt="bundle"
          className="w-16 h-16 object-contain rounded-lg border border-gray-100 shadow-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />
        <div>
          <p className="font-medium text-gray-800">{profileName}</p>
          <p className="text-sm text-gray-500">{bundleName}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
