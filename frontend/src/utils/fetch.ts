import axios from 'axios';
import Product from '../models/Product';
import { BASE_API_URL } from '../config';



export const getProducts = async (): Promise<Product[]> => {
    //ajax request
    const response = await axios.get<Product[]>(`${BASE_API_URL}/products`);

    //extract products

    const products = response.data;

    // return products;

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(products)
        }, 2000);


    });

}

export const getProduct = async (id: number): Promise<Product> => {

    //ajax req
    const response = await axios.get(`${BASE_API_URL}/products/${id}`);
    const product = response.data;

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(product)
        }, 1500);
    });

}

// REST API Methods

// GET -     Get data/resource from the server
// POST -    Add new data to the server
// PUT -     Update full data in the server 
// PATCH -   Update partial data in the server - update 1 / few properties
// DELETE -  Delete data from the server


export const addProduct = async (product: Product): Promise<Product> => {

    // AJAX request - sending a new product to the server / receiving  back the added product

    // const response = await axios.post(`${BASE_API_URL}/products/`,product); // sending object with binary (without files);

    const formData = new FormData(); // can contain string and / or files
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('image', product.image[0]);   //image = FileList image[0] = File  / Blob

    const response = await axios.post<Product>(`${BASE_API_URL}/products/`, formData);

    const addedProduct = response.data;



    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(addedProduct)
        }, 1500);
    });



}



export const updateProduct = async (product: Product): Promise<Product> => {

    const formData = new FormData(); // can contain string and / or files
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('image', product.image[0]);   //image = FileList image[0] = File  / Blob

    const response = await axios.put<Product>(`${BASE_API_URL}/products/${product.id}`, formData);

    const updatedProduct = response.data;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(updatedProduct)
        }, 1500);
    });

}

export const deleteProduct = async (id: number): Promise<boolean> => {

    await axios.delete(`${BASE_API_URL}/products/${id}`);


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1500);
    });

}