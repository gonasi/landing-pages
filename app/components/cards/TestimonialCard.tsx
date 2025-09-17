import { motion } from "framer-motion";
import { Card, CardContent } from "~/components/ui/card";

type TestimonialCardProps = {
  image: string;
  alt: string;
  quote: string;
  name: string;
  role?: string;
  className?: string;
};

export function TestimonialCard({
  image,
  alt,
  quote,
  name,
  role = "Verified Buyer",
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card className="rounded-xl shadow-lg border border-gray-100">
        <CardContent className="flex gap-2 md:gap-4 p-2 md:p-6">
          {/* Profile Image */}
          <motion.div whileHover={{ rotate: 2 }} className="w-24">
            <img
              src={image}
              alt={alt}
              className="h-22 w-22 rounded-full object-cover shadow-lg"
            />
          </motion.div>

          {/* Testimonial Content */}
          <div className="flex flex-col justify-between w-full">
            <p className="text-gray-700 leading-relaxed">{quote}</p>
            <div className="mt-4 flex items-center space-x-8">
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-green-600 font-medium">✔ {role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
