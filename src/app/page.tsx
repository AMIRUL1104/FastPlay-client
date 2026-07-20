// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[90vh] bg-navy px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center text-white">
          {/* এখানে আপনার হিরো কনটেন্ট আসবে */}
          <h1 className="text-4xl font-bold">Welcome to FastPlay</h1>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* ক্যাটাগরি কনটেন্ট */}
      </section>

      {/* Featured Products Section */}
      <section className="bg-mist px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* প্রোডাক্টস গ্রিড */}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* বৈশিষ্টা সমূহ */}
      </section>

      {/* Statistics Section */}
      <section className="bg-navy px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* স্ট্যাটিস্টিক্স ডাটা */}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* এফএকিউ অ্যাকোর্ডিয়ান */}
      </section>

      {/* AI Assistant Banner */}
      <section className="bg-peach px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* এআই অ্যাসিস্ট্যান্ট ব্যানার */}
        </div>
      </section>
    </div>
  );
}