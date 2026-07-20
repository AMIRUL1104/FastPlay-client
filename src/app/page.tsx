import CategoriesSection from "../components/home/CategoriesSection";
import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import StatisticsSection from "../components/home/StatisticsSection";
import FAQSection from "../components/home/FAQSection";
import AIAssistantBanner from "../components/home/AIAssistantBanner";
import { getFeaturedProducts } from "../services/server/api";


export default async function HomePage() {
  const products = (await getFeaturedProducts())?.data ?? [];

  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts products={products ?? []} />
      <WhyChooseUs />
      <StatisticsSection />
      <FAQSection />
      <AIAssistantBanner />
    </div>
  );
}
