import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Product from '../../models/Product';
import { getProducts } from '../../utils/fetch';
import Loader from '../Loader/Loader';
import Products from './Products/Products';
import { setProducts } from './productsSlice';
import styles from './ProductsArea.module.scss';

interface ProductsAreaProps { }

const ProductsArea: FC<ProductsAreaProps> = () => {
    // const [products, setProducts] = useState<Product[]>([]);
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.productsState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log('hiiii')

        setIsLoading(true);

        getProducts().then((products) => {
            // setProducts(products) -- no longer relevant 

            dispatch(setProducts(products));

        }).catch((err) => {

            console.log(err.message)
        }).finally(() => {
            setIsLoading(false);
        });


    }, []);


    // const addProductHandler = (product: Product) => {

    //     // setProducts((prevProducts) => {
    //     //     const productsToUpdate = [...prevProducts];
    //     //     productsToUpdate.push(product);

    //     //     return productsToUpdate;
    //     // });



    // }




    if (isLoading) {
        return (
            <div className={styles.ProductsArea__loaderContainer}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={styles.ProductsArea}>
            <Products products={products} />
        </div>
    )
}




export default ProductsArea;
