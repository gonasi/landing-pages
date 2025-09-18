import { TopBanner } from "~/components/banners/TopBanner";
import { CustomerRating1 } from "~/components/customer-ratings/CustomerRating1";
import { FeatureList } from "~/components/lists/FeatureList";
import { motion } from "framer-motion";
import { TestimonialCard } from "~/components/cards/TestimonialCard";
import TitleWithDivider from "~/components/titles/TitleWithDivider";
import { FeatureCard } from "~/components/cards/FeatureCard";
import { NumberListWithImageBg } from "~/components/lists/NumberListWithImageBg";
import { TimeLineCard } from "./components/TimeLineCard";
import { AmbulanceTimeline } from "./components/AmbulanceTimeline";
import { ChokeTimeline } from "./components/ChokeTimeline";

export function meta() {
  return [
    { title: "Senior-Friendly Choking Protection | VitalVac" },
    {
      name: "description",
      content:
        "VitalVac is an FDA-cleared choking rescue device designed for seniors and families. Safe, effective, and easy-to-use during choking emergencies.",
    },
  ];
}

// Core feature highlights
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

// Feature guarantees/icons
const featureOptions = [
  {
    src: "https://img.funnelish.com/14613/758053/1758041315-free-shipping-icon-opt.webp",
    alt: "Free shipping badge",
    title: "Free Shipping",
  },
  {
    src: "https://img.funnelish.com/14613/758053/1758041330-90-days-opt.webp",
    alt: "90-day money back guarantee",
    title: "90 Day Money Back Guarantee",
  },
  {
    src: "https://img.funnelish.com/14613/758053/1758041343-prescription-icon-opt.webp",
    alt: "No prescription required",
    title: "No Prescription Needed",
  },
  {
    src: "https://img.funnelish.com/14613/758053/1758041664-FDA-logo-opt.webp",
    alt: "FDA cleared logo",
    title: "FDA-Cleared",
  },
];

const images = [
  "https://firstaiddevices.com/cdn/shop/files/VitalVac_UGC1531079913419.jpg?v=1732839156",
  "https://firstaiddevices.com/cdn/shop/files/VitalVac_UGCimages_4.jpg?v=1732839149",
  "https://firstaiddevices.com/cdn/shop/files/2.png?v=1723941407",
  "https://firstaiddevices.com/cdn/shop/files/4.png?v=1723941407",
];

export default function SeniorFriendlyChokingProtection() {
  return (
    <main>
      {/* ======= Top Banner ======= */}
      <header>
        <TopBanner className="py-2 bg-gray-900">
          <div className="flex w-full items-center justify-center text-gray-100 font-bold">
            VitalVac
          </div>
        </TopBanner>
      </header>

      {/* ======= Hero Section ======= */}
      <section className="container p-4 mx-auto">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
          {/* Left content: rating, headline, features, CTA, testimonial */}
          <div className="w-full">
            <CustomerRating1 className="pt-2 md:pt-8" />

            <h1 className="text-3xl md:text-5xl font-extrabold mt-4">
              Senior-Friendly Choking Protection
            </h1>

            <p className="py-4 text-lg">
              VitalVac is an easy-to-use choking rescue device that can save
              your life or a loved one’s life in a choking emergency.
            </p>

            <FeatureList
              features={features}
              className="max-w-lg py-4"
              checkStyles="text-red-700"
            />

            {/* Call-to-action button */}
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
                  Ships within 1–2 days • 90 Day Money-Back Guarantee
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <TestimonialCard
              image="https://img.funnelish.com/14613/758053/1758040438-verified-buyer-opt.webp"
              alt="Betty verified buyer"
              quote="I’m so thankful this device is affordable. Living alone with a health condition that occasionally causes me to choke, it’s become a household necessity..."
              name="Betty W."
            />
          </div>

          {/* Right content: hero image */}
          <div className="w-full">
            <img
              src="/assets/images/vital-vac-doctor.png"
              alt="Doctor presenting VitalVac device"
            />
          </div>
        </div>
      </section>

      {/* ======= VitalVac Promise Section ======= */}
      <section className="py-8 bg-gray-50">
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

        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-6">
          {featureOptions.map((f, idx) => (
            <FeatureCard key={idx} {...f} />
          ))}
        </div>
      </section>

      {/* ======= Don’t Become Another Headline Section ======= */}
      <section className="container p-4 mx-auto pt-8">
        <div className="flex flex-col items-center md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
          {/* Left content: facts and stats */}
          <div className="w-full">
            <h2 className="text-4xl font-extrabold">
              Don’t Become Another Headline
            </h2>

            <div className="flex flex-col space-y-2 md:space-y-8 pt-4 md:pt-8 text-lg">
              <p>
                Choking is the 4th leading cause of accidental death among
                seniors in the U.S.
              </p>
              <p>Every year, over 5,000 people die from choking.</p>
              <p>
                Dysphagia, dry mouth, weakened reflexes, dentures, or simply
                living alone are some of the most common causes of choking
                incidents in seniors.
              </p>
              <p>
                In just 4 minutes, choking can cause brain damage, while
                ambulance response times average 7–14 minutes.
              </p>
            </div>
          </div>

          {/* Right content: number list with images */}
          <div className="w-full">
            <NumberListWithImageBg
              content={[
                {
                  number: (
                    <div>
                      <span>#</span>
                      <span className="text-3xl font-bold">12</span>
                    </div>
                  ),
                  body: "12 elderly people choke to death every day.",
                  image:
                    "https://media.gettyimages.com/id/1806220126/photo/nursing-home-heart-attack-and-senior-man-with-homecare-worker-in-a-living-room-with-chest.jpg?s=612x612&w=0&k=20&c=QcyV6KrBxaEeJc5ZeNxxrgE4-ceaDwUV1pMyVFulhEA=",
                },
                {
                  number: (
                    <div>
                      <span>#</span>
                      <span className="text-3xl font-bold">4</span>
                    </div>
                  ),
                  body: "Choking is the 4th leading cause of unintentional death.",
                  image:
                    "https://media.gettyimages.com/id/200174733-011/photo/waiter-with-arms-around-choking-mans-stomach-in-restaurant.jpg?s=612x612&w=0&k=20&c=UaMN6aLlPdAFSU38iPfg2VYV4Z0YWD6aMUsSeWJJenE=",
                },
                {
                  number: (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">5</span>
                      <span className="text-xs font-bold">DAYS</span>
                    </div>
                  ),
                  body: "A child dies from choking every 5 days.",
                  image:
                    "https://media.gettyimages.com/id/2213261065/photo/elderly-woman-in-pain-at-home.jpg?s=612x612&w=0&k=20&c=nlOWeShUvph7crWwulMhxpY7Lmm7Qfirh03d_YwS_c4=",
                },
                {
                  number: (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">100</span>
                      <span className="text-xs font-bold">Million</span>
                    </div>
                  ),
                  body: "Over 100 million Americans have no defense against choking due to pregnancy, disability, obesity, or being alone.",
                  image:
                    "https://media.gettyimages.com/id/2160582527/photo/elderly-man-feeling-pain-at-home.jpg?s=612x612&w=0&k=20&c=sZxSwR8hpz5GBd9DojT0Y5baTOyOHRJVORVA0QRrUIo=",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ======= Don’t Become Another Headline Section ======= */}
      <section className="container px-4 mx-auto pt-8">
        <div className="py-10 flex flex-col items-center justify-center space-y-2">
          <h1 className="text-3xl font-extrabold text-center">
            Every Second Counts!
          </h1>
          <h2 className="text-3xl font-extrabold text-center text-orange-500">
            Only 10 minutes to save a life
          </h2>
        </div>
      </section>
      <section className="container px-4 mx-auto py-8">
        <div className="flex flex-col space-y-4 md:space-y-8">
          <TimeLineCard
            image={
              "https://img.funnelish.com/14613/761700/1742724704-logo-sign-icon-symbol-ambulance-car-art-mini-bus-design-graphic-vector-template-isolated-red_621257-117.jpg"
            }
            title={"Ambulance"}
            description={
              "According to the NHTSA, the U.S. has an ambulance response time target of 8-12 minutes. "
            }
            component={<AmbulanceTimeline />}
          />
          <TimeLineCard
            image={
              "https://firstaiddevices.com/cdn/shop/files/VitalVac_4.png?v=1752286237&width=720"
            }
            title={"VitalVac"}
            description={
              "Choking can kill in less than 10 minutes Time is of the essence when somebody begins to choke. "
            }
            component={<ChokeTimeline />}
          />
        </div>
      </section>

      <section className="max-w-5xl px-4 mx-auto py-16">
        <div className="flex flex-col items-center justify-center md:flex-row space-x-0 md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex-1">
            <img
              src="https://firstaiddevices.com/cdn/shop/files/deviceinaction-ezgif.com-speed-min.gif?v=1725182528"
              alt="man choking"
            />
          </div>
          <div className="flex-1">
            <div className="space-y-10 text-gray-800 leading-relaxed">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Introducing the VitalVac Anti-Choking Device
              </h2>

              <p>
                Choking emergencies happen fast and without warning.
                <span className="font-semibold">
                  VitalVac gives you the power to act quickly when every second
                  counts.
                </span>
              </p>

              <p>
                This simple, effective device is designed for anyone to use,
                from seniors to caregivers, even when physical strength is
                limited.
              </p>

              <p>
                VitalVac is lightweight, easy to keep at home, and ready
                whenever you need it most.
                <span className="font-semibold">
                  Owning one is not just smart, it is life-saving.
                </span>
              </p>

              <p>
                Accidents can happen to anyone at any time, but with VitalVac,
                you can be prepared to protect yourself and your loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl px-4 mx-auto py-16">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="space-y-10 text-gray-800 leading-relaxed">
              <h2 className="text-2xl font-extrabold text-gray-900">
                It’s So Easy to Use
              </h2>

              <p>
                The best part about the{" "}
                <span className="font-semibold">
                  VitalVac Anti-Choking Device
                </span>
                is how simple it is. Almost anyone—from children to seniors—can
                use it to save a life.
              </p>

              <p>To use it, just follow these three steps:</p>

              <ul className="list-decimal list-inside space-y-1 font-medium">
                <li>Place it over the mouth and nose</li>
                <li>Press to create a good seal</li>
                <li>Pull back the handle</li>
              </ul>

              <p>
                VitalVac forms a secure seal that creates a strong vacuum to
                clear the airway. In most cases, the object is removed on the
                first pull. If not, you can repeat the process until the airway
                is clear.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://firstaiddevices.com/cdn/shop/files/hottogif-ezgif_com-speed_1440x1440_webp.gif?v=1750626161&width=1346"
              alt="using vitalvac"
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl px-4 mx-auto py-16">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex-1">
            <img
              src="https://firstaiddevices.com/cdn/shop/files/vitalVac_Photos-9.png?v=1750626161&width=1346"
              alt="vitalvac"
            />
          </div>
          <div className="flex-1">
            <div className="space-y-8 text-gray-800 leading-relaxed">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Professionally Designed & Recommended
              </h2>

              <p>
                <span className="font-semibold">
                  VitalVac is trusted by doctors, caregivers, geriatric
                  specialists, and emergency responders
                </span>
                who understand the unique needs of seniors.
              </p>

              <p>
                More and more families, seniors, and caregivers are choosing
                VitalVac as a simple and reliable way to stay safe during
                choking emergencies.
              </p>

              <p>
                It feels like having an extra layer of protection in your
                home—one that gives you confidence and peace of mind without
                depending on anyone else.
              </p>
            </div>
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
                className="px-6 py-4 bg-red-700 text-white font-semibold rounded-2xl shadow-md hover:bg-red-800 transition-colors duration-200"
              >
                🚨 Get 52% Off VitalVac – Today Only!
              </motion.a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl px-4 mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full text-center text-3xl md:text-4xl font-extrabold mb-10"
          >
            Meet Some Of The Lives Saved With SaveLix
          </motion.h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-2xl shadow-md bg-white"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={src}
                  alt="life saved"
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
