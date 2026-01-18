import React from "react";
import Layout from "../../components/Layout/Layout";
import Hero from "../../components/heroSection/Hero";
import ShopByCat from "../../components/shopByCat/ShopByCat";
import Contactus from "../../components/contact/Contactus";
import Trust from "../../components/whyshopwithus/trust";
import FeaturedProducts from "../../components/featuredProducts/FeaturedProducts";
import earbuds from "../../assets/earbuds.jpg";
import watch from "../../assets/featurewatch.jpg";
import sofa from "../../assets/sofa.jpg";
import shirts from "../../assets/featureShirt.jpg";

const Home = () => {

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: "$49",
      image: earbuds,
    },
    { id: 2, name: "Smart Watch", price: "$129", image: watch },
    { id: 3, name: "shirts", price: "$12", image: shirts },
    { id: 4, name: "sofa", price: "$150", image: sofa },
  ];

  return (
    <Layout title={"Home"}>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <ShopByCat />
      <Trust />
      <Contactus />
    </Layout>
  );
};

export default Home;
