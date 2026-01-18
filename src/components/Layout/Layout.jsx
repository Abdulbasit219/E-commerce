import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ".css";
import { Helmet } from "react-helmet";

const layout = ({
  children,
  title = "Ecommerce app",
  description = "Ecommerce app Mern",
  keywords = "Ecommerce app, mern, react, node, mongo-db",
  author = "Abdul Basit",
}) => {
  return (
    <>
      {/* For seo  */}
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main>
        <div className="layout">{children}</div>
      </main>
      <Footer />
    </>
  );
};


export default layout;
