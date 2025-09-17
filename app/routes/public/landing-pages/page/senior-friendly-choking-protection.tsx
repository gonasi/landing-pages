import { TopBanner } from "~/components/banners/TopBanner";
import { CustomerRating1 } from "~/components/customer-ratings/CustomerRating1";
import { FeatureList } from "~/components/lists/FeatureList";
import { motion } from "framer-motion";
import { TestimonialCard } from "~/components/cards/TestimonialCard";
import TitleWithDivider from "~/components/titles/TitleWithDivider";
import { FeatureCard } from "~/components/cards/FeatureCard";

export function meta() {
  return [
    { title: "Login | SMC" },
    { name: "description", content: "Securely log in to your SMC account" },
  ];
}

const features = [
  {
    title: "Easy to Use for Seniors",
    description:
      "Simply place, press, and pull. No strength needed, even for those with limited mobility.",
  },
  {
    title: "Self-Use",
    description:
      "Ideal for when you’re alone, giving you the ability to act independently.",
  },
  {
    title: "Works for All Ages",
    description:
      "Includes two masks, one for adults and one for children, making it perfect for everyone in the family.",
  },
  {
    title: "FDA-Cleared",
    description:
      "Safe, trusted, and designed with seniors’ specific needs in mind.",
  },
];

const featureOptions = [
  {
    src: "https://img.funnelish.com/14613/758053/1758041315-free-shipping-icon-opt.webp",
    alt: "Free shipping",
    title: "Free Shipping",
  },
  {
    src: "https://img.funnelish.com/14613/758053/1758041330-90-days-opt.webp",
    alt: "Money back guarantee",
    title: "90 Day Money Back Guarantee",
  },
  {
    src: "https://img.funnelish.com/14613/758053/1758041343-prescription-icon-opt.webp",
    alt: "No prescription",
    title: "No Prescription Needed",
  },
  {
    src: "https://img.funnelish.com/14613/758053/1758041664-FDA-logo-opt.webp",
    alt: "FDA cleared",
    title: "FDA-Cleared",
  },
];

export default function SeniorFriendlyChokingProtection() {
  return (
    <div>
      <div>
        <TopBanner className="py-2 bg-gray-900">
          <div className="flex w-full items-center justify-center text-gray-100 font-bold">
            VitalVac
          </div>
        </TopBanner>
      </div>
      <div className="container p-4 mx-auto">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
          <div className="w-full">
            <CustomerRating1 className="pt-2 md:pt-8" />
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold">
                Senior-Friendly Choking Protection
              </h2>
              <p className="py-4">
                VitalVac is an easy-to-use choking rescue device that can save
                your life or a loved one’s life in a choking emergency.
              </p>
              <FeatureList
                features={features}
                className="max-w-lg py-4"
                checkStyles="text-red-700"
              />
              <div className="py-4">
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
                  className="px-6 py-4 bg-red-700 text-white font-semibold rounded-2xl shadow-md hover:bg-red-800 transition-colors duration-200"
                >
                  🚨 Get 52% Off VitalVac – Today Only!
                </motion.a>
                <div className="py-6 flex items-center space-x-1">
                  <div className="bg-red-700 h-4 w-4 ml-4 rounded-full animate-pulse"></div>
                  <p className="text-muted-foreground text-sm">
                    Ships by 1-2 Days • 90 Day Money-Back
                  </p>
                </div>
              </div>
              <div className="">
                <TestimonialCard
                  image="https://img.funnelish.com/14613/758053/1758040438-verified-buyer-opt.webp"
                  alt="Betty Profile"
                  quote="I’m so thankful this device is affordable. Living alone with a health condition that occasionally causes me to choke, it’s become a household necessity..."
                  name="Betty W."
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <img src="/assets/images/vital-vac-doctor.png" alt="doctor" />
          </div>
        </div>
      </div>

      <div className="py-8">
        <TitleWithDivider
          title={
            <span className="text-3xl px-4 tracking-wide font-extrabold text-red-700">
              The VitalVac Promise
            </span>
          }
          size="sm"
          className="my-6"
          lineClassName="bg-gray-300"
        />
        <div className="container mx-auto px-4 flex items-center justify-center">
          {featureOptions.map((f, idx) => (
            <FeatureCard key={idx} {...f} />
          ))}
        </div>
      </div>

      {/* Dont become another headline section */}
      <div className="container p-4 mx-auto">
        <div className="flex flex-col items-center md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
          <div className="w-full">
            <h1 className="text-4xl font-extrabold">
              Don’t Become Another Headline
            </h1>
            <div className="flex flex-col space-y-2 md:space-y-8 pt-4 md:pt-8">
              <p className="text-lg">
                Choking is the 4th leading cause of accidental death among
                seniors in the U.S.
              </p>
              <p className="text-lg">
                Every year, over 5,000 people die from choking.
              </p>
              <p className="text-lg">
                Dysphagia, dry mouth, weakened reflexes, dentures, or simply
                living alone are some of the most common causes of choking
                incidents in seniors.
              </p>
              <p className="text-lg">
                In just 4 minutes, choking can cause brain damage, leading to a
                lifetime of lost independence, while ambulance response times
                can take 7–14 minutes.
              </p>
            </div>
          </div>
          <div className="w-full">
            <h2>some stuff</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
