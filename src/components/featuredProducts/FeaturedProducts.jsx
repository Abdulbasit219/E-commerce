import ProductGrid from "./ProductGrid";
import SectionTitle from "./SectionTitle";

const FeaturedProducts = ({ products }) => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <SectionTitle text="Featured Products" />
      <ProductGrid products={products} />
    </section>
  );
};

export default FeaturedProducts;
