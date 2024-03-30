import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '.css';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast'

const layout = ({ children, title, description, keywords, author }) => {
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

      <Header></Header>
      <main>
        <div className='layout h-auto'>
          <Toaster />
          {children}
        </div>
      </main>
      <Footer></Footer>
    </>
  )
}

layout.defaultProps = {
  title: 'Ecommerce app',
  description: 'Ecommerce app Mern',
  keywords: 'Ecommerce app, mern, react, node, mongo-db',
  author: 'Abdul Basit'
}

export default layout