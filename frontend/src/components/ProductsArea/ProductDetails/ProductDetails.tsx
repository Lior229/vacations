import React, { FC, useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../../config';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Product from '../../../models/Product';
import { deleteProduct as deleteProductAsync, getProduct } from '../../../utils/fetch';
import Loader from '../../Loader/Loader';
import EditProduct from '../EditProduct/EditProduct';
import { deleteProduct, setProduct } from '../productsSlice';
import styles from './ProductDetails.module.scss';

interface ProductDetailsProps { }

const ProductDetails: FC<ProductDetailsProps> = () => {
    const dispatch = useAppDispatch();
    const [showEditProduct, setShowEditProduct] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const { productsState, authState } = useAppSelector((state) => state);
    const { product, products } = productsState;
    const { user } = authState;
    // const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);

    const modalToggleHandler = () => {
        setShowEditProduct((prevState) => !prevState);
    }

    // const editProductHandler = (product: Product) => {
    //     // setProduct((prevProduct) => {
    //     //     const updatedProduct = { ...product };
    //     //     return updatedProduct;
    //     // })
    // }



    const deleteProductHandler = async () => {
        if (params.prodId) {
            const productId = +params.prodId;
            setLoading(true);
            try {
                const success = await deleteProductAsync(productId);
                if (success) {
                    alert('the product was deleted')
                    dispatch(deleteProduct(productId));
                    navigate('/products');
                }
            } catch (err) {
                console.log('delete error', err)
                setLoading(false);

            }
        }
    }





    useEffect(() => {
        if (params.prodId) {
            const id = +params.prodId;
            const product = products.find((p) => p.id === id);

            if (product) {
                dispatch(setProduct(product));

            } else {

                setLoading(true);

                getProduct(+params.prodId).then((product) => {

                    dispatch(setProduct(product));

                    // setProduct(product);

                }).catch((err) => {
                    console.log(err);

                }).finally(() => {
                    setLoading(false);
                })
            }




        }
    }, []);

    const renderButtonsUponLogin = () => {
        if (user) {
            return (
                <>
                    <span> | </span>
                    <NavLink onClick={modalToggleHandler} to="#">Edit</NavLink>
                    <span> | </span>
                    <NavLink onClick={deleteProductHandler} to="#">Delete</NavLink>
                </>
            )
        }
        return null;
    }

    const renderProduct = () => {
        if (product) {
            const imgSrc = `${BASE_API_URL}/products/images/${product.imageName}`;

            return (
                <div className={styles.ProductDetails__product}>
                    <div className={styles.ProductDetails__imgContainer}>
                        <img src={imgSrc} />
                    </div>

                    <div className={styles.ProductDetails__content}>
                        <h3>Name:{product.name}</h3>
                        <h3>Price:{product.price}</h3>
                        <h3>Stock:{product.stock}</h3>
                        <NavLink to="/products">Back</NavLink>
                        {renderButtonsUponLogin()}
                    </div>

                </div>
            )



        }
    }


    if (loading) return <Loader />

    return (
        <div className={styles.ProductDetails}>
            <header className={styles.ProductDetails__header}>
                <h2>Product Details</h2>
            </header>

            <div className={styles.ProductDetails__body}>
                {renderProduct()}
            </div>
            {(showEditProduct && product) && <EditProduct onClose={modalToggleHandler} product={product} />}
        </div>
    )
}



export default ProductDetails;
