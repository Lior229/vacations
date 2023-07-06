import React, { FC, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Product from '../../../models/Product';
import validation from './validation';
import styles from './EditProduct.module.scss';
import FormGroupWithError from '../../FormGroupWithError/FormGroupWithError';
import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import { updateProduct as updateProductAsync } from '../../../utils/fetch';
import { updateProduct } from '../productsSlice';
import { useAppDispatch } from '../../../hooks';

interface EditProductProps {
    onClose: () => void;
    product: Product;
}




const EditProduct: FC<EditProductProps> = ({ onClose, product }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState, setValue } = useForm<Product>();

    const submitProductHandler = (product: Product) => {

        updateProductAsync(product).then(response => {
            // onEditProduct(response);
            dispatch(updateProduct(product));
            onClose();
        }).catch(err => {
            console.log(err)
        })

    }

    console.log('product', product)

    useEffect(() => {
        setValue("id", product.id);
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("stock", product.stock);

    }, []);


    return (

        <Modal onClose={onClose}>
            <div className={`Box ${styles.EditProduct}`}>
                <h2>Edit Product </h2>
                <form onSubmit={handleSubmit(submitProductHandler)} >

                    <input type="hidden" {...register('id')} />

                    <FormGroupWithError error={formState.errors.name?.message} >
                        <label>Name:</label>
                        <input type="text" {...register('name', validation.name)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.price?.message}>
                        <label>Price::</label>
                        <input type="number" {...register('price', validation.price)} />
                    </FormGroupWithError>

                    <FormGroupWithError error={formState.errors.stock?.message}>
                        <label>Stock:</label>
                        <input type="number" {...register('stock', validation.stock)} />
                    </FormGroupWithError>

                    <FormGroupWithError>
                        <label>Image:</label>
                        <input type="file" accept='image/*' {...register('image')} />
                    </FormGroupWithError>



                    <Button>Edit</Button>

                </form>




            </div>
        </Modal>
    )
}



export default EditProduct;







