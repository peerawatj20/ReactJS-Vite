import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const product = useLoaderData();

  console.log(product);

  return <div>Product Detail Page</div>;
};

export default ProductDetailPage;
