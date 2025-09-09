export default function Stepper() {
  return (
    <section className="p-4">
      <section className="border border-gray-300 flex flex-row md:flex-col rounded-lg">
        <div className="flex items-center space-x-2">
          <img
            src="https://img.funnelish.com/14613/761700/1742724704-logo-sign-icon-symbol-ambulance-car-art-mini-bus-design-graphic-vector-template-isolated-red_621257-117.jpg"
            alt="ambulance"
            className="h-30 w-30 object-contain p-2"
          />
          <div>
            <h2 className="text-2xl font-bold">Ambulance</h2>
            <p className="text-gray-500">
              According to the NHTSA, the U.S. has an ambulance response time
              target of 8-12 minutes.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
