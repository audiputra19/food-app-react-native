import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, Review } from '../interfaces/products';

interface FirebaseData {
  product: Product[];
  review: Review[];
}

const useApi = (itemId?: number) => {
  const [data, setData] = useState<Product[] | Product | null>(null);
  const [review, setReview] = useState<Review[] | Review | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FirebaseData>(
          'https://firebasestorage.googleapis.com/v0/b/shopping-app-74a94.appspot.com/o/dbshopfood.json?alt=media&token=cd98a441-1ca6-4eed-89a2-cc9227b0b76d'
        );
        const dataList = response.data;
        //console.log(dataList); // Log the data to check the structure

        if (itemId !== undefined) {
          // Find the product by ID
          const item = dataList.product.find(item => item.id === itemId);
          if (item) {
            setData(item);
          } else {
            setError('Item not found');
          }

          const review = dataList.review.filter(item => item.id_product === itemId);
          if (review) {
            setReview(review);
          } else {
            setError('Item not found');
          }
        } else {
          // Return all products
          setData(dataList.product);
        }
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  return { data, loading, error, review };
};

export default useApi;
