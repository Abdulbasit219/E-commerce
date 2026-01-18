import Card from "./Card";

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <Card
        key={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
        onAddToCart={() => console.log(`${product.name} added to cart`)}
      />
    ))}
  </div>
);

export default ProductGrid;
