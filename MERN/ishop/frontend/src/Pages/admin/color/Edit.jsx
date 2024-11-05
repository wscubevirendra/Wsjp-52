import React, { useContext, useEffect } from 'react'
import { MainContext } from '../../../Context';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';


export default function Edit() {

    const { color_id } = useParams();
    console.log(color_id, "color")
    const navigate = useNavigate();
    const { notify, API_BASE_URL, CATEGORY_URL, fetchCategory, COLOR_URL, fetchColor, color } = useContext(MainContext)

    useEffect(
        () => {
            fetchColor(color_id)
        },
        [color_id]

    )


    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            name: e.target.name.value,
            colorCode: e.target.colorCode.value,
        }

        axios.put(API_BASE_URL + COLOR_URL + "/edit/" + color_id, data).then(
            (succes) => {
                notify(succes.data.msg, succes.data.status)
                if (succes.data.status == 1) {
                    navigate("/admin/color")
                    e.target.reset()
                }

            }


        ).catch(
            (error) => {
                notify("Internal Server Error", 0)

            }
        )

    }



    return (
        <div className='px-4 mx-5 mt-5 pt-6 w-md shadow-lg bg-white'>
            <section >
                <nav className="flex ml-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <a
                                href="#"
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
                            >
                                <svg
                                    className="w-3 h-3 me-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Admin
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <a
                                    href="#"
                                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
                                >
                                    Color
                                </a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg
                                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                    Edit
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="py-4 px-2 mx-auto max-w-4xl lg:py-10">

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className='col-span-2' >
                                <label
                                    htmlFor="Name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Color Name
                                </label>
                                <input
                                    defaultValue={color?.name}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type Color name"

                                />
                            </div>
                            <div className="w-full col-span-2">
                                <label
                                    htmlFor="colorCode"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Color-Code
                                </label>
                                <input
                                    defaultValue={color?.colorCode}
                                    type="color"
                                    name="colorCode"
                                    id="colorCode"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Color colorCode"

                                />
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="px-6 mt-10 py-2 text-md font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto">
                            Save
                        </button>
                    </form>
                </div>
            </section>

        </div>
    )
}
