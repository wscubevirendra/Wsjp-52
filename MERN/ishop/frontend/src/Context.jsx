import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const MainContext = createContext()

export default function Context(props) {
    const [category, Setcategory] = useState([]);
    const [color, Setcolor] = useState([]);
    const [product, Setproduct] = useState([]);
    const API_BASE_URL = "http://localhost:5000";
    const CATEGORY_URL = "/category";
    const COLOR_URL = "/color";
    const PRODUCT_URL = "/product";
    const notify = (msg, flag) => toast(msg, { type: flag == true ? 'success' : 'error' });

    const fetchCategory = (category_id = null) => {
        let API = API_BASE_URL + CATEGORY_URL
        if (category_id != null) {
            API += `/${category_id}`
        }


        axios.get(API).then(
            (succes) => {
                Setcategory(succes.data.category)
            }
        ).catch(
            (error) => {
                Setcategory([]);
            }
        )


    }

    const fetchColor = (color_id = null) => {
        let API = API_BASE_URL + COLOR_URL
        if (color_id != null) {
            API += `/${color_id}`
        }


        axios.get(API).then(
            (succes) => {
                Setcolor(succes.data.color)
            }
        ).catch(
            (error) => {
                Setcolor([]);

            }
        )


    }

    const fetchProduct = (product_id = null, limit = 0, category_slug = null, product_color = null) => {
        let API = API_BASE_URL + PRODUCT_URL
        if (product_id != null) {
            API += `/${product_id}`
        }
        const query = new URLSearchParams()
        query.append("limit", limit)
        query.append("category_slug", category_slug)
        query.append("product_color", product_color)

        axios.get(API + "?" + query).then(
            (succes) => {
                Setproduct(succes.data.Product)
            }
        ).catch(
            (error) => {
                Setproduct([]);
            }
        )


    }





    return (
        <MainContext.Provider value={{ notify, API_BASE_URL, CATEGORY_URL, fetchCategory, category, COLOR_URL, fetchColor, color, PRODUCT_URL, product, fetchProduct }}>
            {props.children}
            <ToastContainer />
        </MainContext.Provider>
    )
}


export { MainContext }  //named type