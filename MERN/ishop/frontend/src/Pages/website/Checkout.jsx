import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatToIndianCurrency } from '../../helper'
import axios from "axios";
import { MainContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { emtyCart } from "../../redux/reducers/Cartslice";
// Import the package
import {useRazorpay} from "react-razorpay";

const Checkout = () => {
  const { notify } = useContext(MainContext)
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user.data)
  const navigate = useNavigate()
  const dispatched = useDispatch()
  const {Razorpay} = useRazorpay();

  // console.log(user, "my user")
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [paymentMode, setPaymentMode] = useState(0);



  const handlePlaceOrder = () => {
    const address = user.shipping_address[selectedAddress]
    axios.post("http://localhost:5000/order/place-order", {
      user_id: user._id,
      address,
      paymentMode,
      order_total: cart.total

    }).then(
      (succes) => {
        notify(succes.data.msg, succes.data.status)
        if (succes.data.status == 1) {
          if (paymentMode == 0) {
            navigate("/thank-you/" + succes.data.order_id)
            dispatched(emtyCart())
          } else {
            handlePayment(succes.data.order_id, succes.data.razorpay_order_id)
          }
        }

      }
    ).catch(
      (error) => {
        console.log(error)

      }
    )

  };

  const handlePayment = async (order_id,razorpay_order_id) => {
    const options = {
      key: "rzp_test_Bv2Xs3JK92Wgsk", // Enter the Key ID generated from the Dashboard
      currency: "INR",
      name: "WsCube Tech",
      image: "https://deen3evddmddt.cloudfront.net/images/wscube-tech-logo-2.svg",
      order_id: razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        console.log(response)
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.contact,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      console.log(response)
    });

    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Section: Address and Payment Mode */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h1>

          {/* Address Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Address</h2>
            {user?.shipping_address?.map((address, index) => (
              <div
                key={index}
                onClick={() => setSelectedAddress(index)}
                className={`p-4 border rounded-lg mb-4 cursor-pointer ${selectedAddress === index ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
              >
                <p className="font-medium">{address.name}</p>
                <p>{address.contact}</p>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state}, {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
            ))}
            <div className="w-[100px] text-center p-2 bg-blue-500 border  rounded-md">+</div>
          </div>

          {/* Payment Mode Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Payment Mode</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMode(0)}
                className={`flex-1 py-3 text-center rounded-lg font-medium border ${paymentMode === 0
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-50 text-gray-700 border-gray-300"
                  }`}
              >
                Cash on Delivery (COD)
              </button>
              <button
                onClick={() => setPaymentMode(1)}
                className={`flex-1 py-3 text-center rounded-lg font-medium border ${paymentMode === 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-50 text-gray-700 border-gray-300"
                  }`}
              >
                Online Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full h-[400px] lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <div className="flex justify-between mb-2">
              <p>Total Amount:</p>
              <p className="font-medium">{formatToIndianCurrency(cart.original_price)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Discount:</p>
              <p className="text-green-600">{formatToIndianCurrency(cart.original_price - cart.total)}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Final Amount:</p>
              <p className="font-semibold text-lg">{formatToIndianCurrency(cart.total)}</p>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
