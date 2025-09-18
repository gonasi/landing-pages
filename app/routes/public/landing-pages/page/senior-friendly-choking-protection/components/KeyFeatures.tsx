const features = [
  {
    id: "easy-to-use",
    title: "Easy to Use for Seniors & Caregivers",
    description:
      "VitalVac is so easy to use that almost anyone can operate it. Just follow 3 simple steps: Place, press, pull. It’s that easy.",
    image: "https://firstaiddevices.com/cdn/shop/files/4.png?v=1723941407",
  },
  {
    id: "works-for-all",
    title: "Works for Both Adults and Children",
    description:
      "VitalVac works on children, adults, and the elderly. It comes with different size masks to fit any person.",
    image: "https://firstaiddevices.com/cdn/shop/files/2.png?v=1723941407",
  },
  {
    id: "self-use",
    title: "Can Be Used on Yourself",
    description:
      "If you’re choking and no one is around, you can even use VitalVac on yourself.",
    image:
      "https://firstaiddevices.com/cdn/shop/files/VitalVac_UGC.jpg?v=1732838982",
  },
  {
    id: "compact-portable",
    title: "Compact & Portable",
    description:
      "The VitalVac device is small, lightweight, and portable, so you can keep it at home, in your car, at work, or even in a diaper bag for babies.",
    image:
      "https://firstaiddevices.com/cdn/shop/files/VitalVac_4.png?v=1752286237&width=720",
  },
  {
    id: "free-replacement",
    title: "Free Replacement",
    description:
      "If you use VitalVac in a choking emergency, we’ll send you a free replacement. With this amazing policy, you’re not just saving lives—you’re saving money too.",
    image:
      "https://firstaiddevices.com/cdn/shop/files/13.png?v=1750624815&width=1346",
  },
  {
    id: "fda-cleared",
    title: "FDA-Cleared",
    description:
      "VitalVac is FDA-cleared, giving you peace of mind knowing it meets safety standards.",
    image:
      "https://firstaiddevices.com/cdn/shop/files/14.png?v=1750625127&width=1346",
  },
];

export function KeyFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 text-center"
        >
          {feature.image ? (
            <img
              src={feature.image}
              alt={feature.title}
              className="mb-4 rounded-lg h-40 object-contain"
            />
          ) : (
            <div className="w-24 h-24 mb-4 rounded-lg bg-gray-200" />
          )}
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
