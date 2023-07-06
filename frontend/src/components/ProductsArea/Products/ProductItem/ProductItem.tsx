import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { BASE_API_URL } from '../../../../config';
import Product from '../../../../models/Product';
import styles from './ProductItem.module.scss';

interface ProductItemProps {
    product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
    const { price, stock, name, id, imageName } = product;

    const imgSrc = `${BASE_API_URL}/products/images/${imageName}`;

    return (
        <li className={`Box ${styles.ProductItem}`}>
            <div className={styles.ProductItem__content}>
                <p>name:{name}</p>
                <p>stock:{stock}</p>
                <p>price:{price}</p>
            </div>
            <div className={styles.ProductItem__link}>
                <NavLink to={`/products/${id}`}>
                    <img src={imgSrc} alt={name} />
                </NavLink>
            </div>
        </li>
    )

}




export default ProductItem;
