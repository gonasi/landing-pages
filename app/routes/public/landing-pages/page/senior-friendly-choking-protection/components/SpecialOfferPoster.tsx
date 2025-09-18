import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function SpecialOfferPoster() {
  return (
    <section className="bg-red-50/80 border-2 border-red-500 rounded-xl p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://firstaiddevices.com/cdn/shop/files/PHOTO-2024-10-14-02-11-29.jpg?v=1738720423&width=720"
            alt="VitalVac Anti-Choking Device"
            className="w-full max-w-sm"
          />
        </motion.div>

        {/* Right Side - Offer Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Special Offer On Now!
          </h2>
          <p className="text-gray-700 mt-2">
            Get your{" "}
            <span className="font-bold">VitalVac Anti-Choking Device</span>{" "}
            <span className="text-red-600 font-bold">Risk-Free</span> at an
            all-time low price!
          </p>

          <p className="mt-4 font-bold text-lg text-gray-900">
            Act Now and You'll Get:
          </p>

          <motion.ul
            className="mt-4 space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {[
              "52% OFF – VitalVac Anti-Choking Device",
              "90-Day Money Back Guarantee",
              "BONUS! “Stock Up & Save” Bulk Discount ($250 Value)",
              "BONUS! FREE Shipping & Handling ($9.99 Value)",
            ].map((text, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle className="text-red-600 w-6 h-6 mt-0.5" />
                <span className="text-gray-800 font-medium">{text}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Call to Action */}
          <div className="py-10">
            <motion.a
              href="https://firstaiddevices.com/products/vitalvac%C2%AE-your-ultimate-safety-net-against-choking-emergencies"
              target="_blank"
              rel="noopener noreferrer"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-4 bg-red-700 text-white font-semibold rounded-2xl shadow-md hover:bg-red-800 transition-colors duration-200"
            >
              🚨 Get 52% Off VitalVac – Today Only!
            </motion.a>
          </div>

          {/* Extra Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
            className="text-center mt-4"
          >
            <p className="text-sm">
              <span className="font-bold text-red-600">FREE Shipping</span> When
              You Order Today!
            </p>
            <p className="mt-1 text-sm text-green-600 font-bold">
              NOTE: Not Available on Amazon or eBay
            </p>
            <p className="mt-2 text-xs text-gray-600">
              Sale Ends Today,{" "}
              <span className="font-bold">September 17, 2025 at 23:59</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
