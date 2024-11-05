import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const MainContext = createContext()

export default function Context(props) {
    const [category, Setcategory] = useState([]);
    const [color, Setcolor] = useState([]);
    const API_BASE_URL = "http://localhost:5000";
    const CATEGORY_URL = "/category";
    const COLOR_URL = "/color";
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
                console.log(error)
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
                console.log(error)
            }
        )


    }




    return (
        <MainContext.Provider value={{ notify, API_BASE_URL, CATEGORY_URL, fetchCategory, category, COLOR_URL, fetchColor,color }}>
            {props.children}
            <ToastContainer />
        </MainContext.Provider>
    )
}


export { MainContext }  //named type