export default function ThisAntiChokingDevice() {
  return (
    <section>
      <div className="h-140 w-full absolute bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"></div>
      {/* Content wrapper */}
      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Logo / header image */}
        <div className="w-full flex items-center justify-center pb-8">
          <img
            src="https://images.pagedeck-cdn.com/upload/c_limit,q_80,w_1920,f_auto/v1756141362/xrekzf8hswac59k09fmw.webp"
            alt="first aid devices"
            className="h-8"
          />
        </div>

        {/* Headline & meta */}
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-4">
            “This Anti-Choking Device Could Have Prevented My Son&apos;s Death”
            —
            <span className="block md:inline">
              {" "}
              E.R. Nurse Shares Heart-Wrenching Story
            </span>
          </h2>
          <div className="text-sm opacity-90">
            <p>By Alex Taylor</p>
            <p>Published on 06/17/2024 at 10:09 PM</p>
          </div>
        </div>

        {/* Main image */}
        <div className="mt-10 flex justify-center">
          <img
            src="https://prod-assets.gu-plat.com/imager-x/uploads/LifeVac/447322/ADV1_59e542b2f0e9b9727cab423ebede99ee.webp"
            alt="users"
            className="rounded-xl shadow-lg max-h-96 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
