import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer';

function DrinksDetails() {
  const { id } = useParams();
  const title = 'DrinksDetails';
  console.log(id);
  return (
    <div>
      <h1>{title}</h1>
      <p>{id}</p>
      <Footer />
    </div>
  );
}

export default DrinksDetails;
