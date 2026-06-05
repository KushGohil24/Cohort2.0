import React, { useContext } from 'react'
import Title from '../../Shared/Components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../../../context/shopContext'
import { cartApi } from '../service/cart.api'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const { navigate } = useContext(ShopContext);

  const inputClass = 'vyra-input rounded-none w-full';

  const handlePlaceOrder = async () => {
      try {
          const response = await cartApi.createOrder();
          if (response.data?.success) {
              const { order, keyId } = response.data;
              
              const options = {
                  key: keyId,
                  amount: order.amount,
                  currency: order.currency,
                  name: "VYRA",
                  description: "Order Payment",
                  order_id: order.id,
                  handler: async (paymentResponse) => {
                      try {
                          const verifyRes = await cartApi.verifyOrder({
                              razorpay_order_id: paymentResponse.razorpay_order_id,
                              razorpay_payment_id: paymentResponse.razorpay_payment_id,
                              razorpay_signature: paymentResponse.razorpay_signature
                          });
                          if (verifyRes.data?.success) {
                              toast.success("Payment successful!");
                              navigate('/orders');
                          }
                      } catch (error) {
                          toast.error("Payment verification failed");
                          console.error("Payment verification failed", error);
                      }
                  },
                  theme: {
                      color: "#c9a96e"
                  }
              };
              
              const rzp = new window.Razorpay(options);
              rzp.open();
          }
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to create order");
          console.error("Failed to create order", error);
      }
  };


  return (
    <div className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t border-[#e0d6c8]'>
      {/* Delivery Form */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className={inputClass} type="text" placeholder='First name' />
          <input className={inputClass} type="text" placeholder='Last name' />
        </div>
        <input className={inputClass} type="email" placeholder='Email address' />
        <input className={inputClass} type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className={inputClass} type="text" placeholder='City' />
          <input className={inputClass} type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input className={inputClass} type="number" placeholder='Zipcode' />
          <input className={inputClass} type="text" placeholder='Country' />
        </div>
        <input className={inputClass} type="number" placeholder='Phone' />
      </div>

      {/* Order Summary + Payment */}
      <div className='w-full sm:min-w-[300px] sm:max-w-[380px]'>
        <CartTotal />

        <div className='mt-8'>
          <button
            onClick={handlePlaceOrder}
            className='w-full py-4 bg-[#c9a96e] hover:bg-[#a8893e] text-[#0a0a0a] text-xs font-bold tracking-[3px] uppercase transition-colors duration-300 active:scale-[0.98]'
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
