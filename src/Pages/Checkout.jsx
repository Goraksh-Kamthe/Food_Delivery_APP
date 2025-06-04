import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SearchItemContext } from "../Contex/SearchContex";
import CartCard from "../Components/CartCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Checkout = () => {
  const { setcategory, setShowCart } = useContext(SearchItemContext);
  const items = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  const subTotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const deliveryCharges = 25;
  const taxes = Math.floor(subTotal * 0.05);
  const total = subTotal + deliveryCharges + taxes;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOrderPlace = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Select a payment method";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Your order has been placed successfully");
    setTimeout(() => navigate("/home"), 800);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Side */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Checkout</h2>

          {/* Delivery Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Delivery Information
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              {errors.mobile && (
                <span className="text-red-500 text-sm">{errors.mobile}</span>
              )}

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}

              <textarea
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md resize-none h-24 focus:ring-2 focus:ring-orange-400"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Payment Method
            </h3>
            <div className="space-y-3">
              {["cod", "card", "upi"].map((method) => (
                <div className="flex items-center" key={method}>
                  <input
                    type="radio"
                    id={method}
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor={method} className="text-gray-600 capitalize">
                    {method === "cod"
                      ? "Cash on Delivery"
                      : method === "card"
                      ? "Credit / Debit Card"
                      : "UPI / Wallet"}
                  </label>
                </div>
              ))}
              {errors.paymentMethod && (
                <span className="text-red-500 text-sm">
                  {errors.paymentMethod}
                </span>
              )}
            </div>

           {formData.paymentMethod === "card" && (
  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-600 font-medium">Select Card Type:</p>
    <div className="flex gap-4 items-center">
      <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-10 h-6 object-contain" /> <p>Visa</p>
      <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="w-10 h-6 object-contain" /> <p>Master Card</p>
      <img src="data:image/png;base64,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" alt="RuPay" className="w-12 h-6 object-contain bg-white border p-1 rounded" /> <p>Rupay</p>
    </div>
  </div>
)}

{formData.paymentMethod === "upi" && (
  <div className="mt-4 space-y-2">
    <p className="text-sm text-gray-600 font-medium">Select UPI App:</p>
    <div className="flex gap-4 items-center">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAzFBMVEX///9nO7f///3///tnOrn///n//f/j2vBgMrOAXcL///b8+v1VG6hlO7RpObvZzelYKK1hM6pxS7e3p9BtRbvNwuF0UbBoQq+SdcWtnMmyoNhnOcBbIrJHAKTy7/TCst2EY79lPK6PbcmKbbv///Ds6PLn4PDKu92okNZzTLDl3+nWyO2XgcJ9X7+jkMZjPqKlj8zKs+dDAJmRdr2fg8v88f+Ca7O3qNpeMqFiMcF7WbFSFK5/Y7BMEpu9s89UKqGKcrBIGY1NBraUgbZX+1BLAAAMkklEQVR4nO2cC3faOBOGZcm3+ipDuYONQ2xCA8QNpCQhbXbb//+fvhmZECB2drunH3bO0dsmYORSPZ6RNCPJJkRKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSuoDitL9bztMkiQ1jBReQvvlU5qf8SEEdaWMkDAxpv2r8awTcB50ZuOr/tRIQixmHweGMkYJ+9LKLlzH4dw0VZBpcu447kXW+mLnZ3wMgV1svz+OOVddRVFURXHhVVXxxeTxOGsBTtWV/Geh/0A17da8wU1PoCCE8vrqqp5pdtaAI5yxvu4GvmVh9fx52xzkJEVy1QGfzX00Dqtv49GQh4S9hhmUkrwomC2THKfqWpeIEWoxf8E99Kh3cLAFeQPz0adaXVFQGol44EG7UPc1x57sLQ7AKPfOV13Tqq5ykZgFF5np2S00e1fdE7huAC7lmkeGUvEIWo4y6tqXFM1Zde1PBQOHZq+2x96ldqJr1Dpwi9zOdSYJwNSNBZsyDVdD1zuqrdlILOyvjIXpFnib4g6fEmCpWZcGQ7qWdLl7AuOZWcjABe1eoCpvYeBkPkk0ptUMhpIwg5bhHXmTqrrOhmJl07FZ4GcxNDBzntRu7KR2L4Zx0jupcmzeG8KPNp+L2gzQqsEypDWL1PTpZ7OgurHCn+4scMJwNSgbeeKobmGnARFMUUXdwSATXjgtQVFUs2EQUqdOIMy4Ujg4QpcQRDAAETIvgkV5fBViD1I1Qy4YYSLHLeh58/FxMPMti7A70y08Bz50Io3UhoUms6IG8yLzG8SUFtk4XtkJ9zB21oNGI1rfeYdFUV3osDTLnj0UjpygYZ8Rq2oOIaqF92XtAVEgqOxMsX+OeMHAKeTdpzVpM7q1Gaon9XdFtCwECcHAbBsQItgrruZRtHtC5Q7Xml41Ry4WqG9gTgJLvk4Y0fxANC0sPDGRx+thGEJao/jUtTAROJTKezqj9nIoPle8U3eLR9OqKXaaPMTHna6rOG8VQRtPF7f5wXEiqirxw2PVFLlC0z1p/+rNV/9UUxjmmW3kB187R/DQsGKeVs2Bc0ss4qeDobkITzKul8BY/ILM5+JkXFJdHpGqpwQoJPGrN/2tubDfC7UotU9hcGStHoYx+/GPwKjtu4qDZwowaeO0Xv8JRukYVcMwSlvxW5h2aoMITtZS+0V32G4oEW/Hb2HiqOIsAAP3zdtY2HPX/c2mD5eaaSzq75QxjGnCaNPvX532f6g+qdoyjPTeZpCqx52hE08J0JD2dpjrVkdDGm0o4srbAFqdVxw4I8z8bfCoiinNxhQ7brIw8zjN4zrVAGaMwU9B9GyuKl7ngNrq84JUxhvsYJgGMPniDMAwi1BjYXqgAphu1Ys20GYnJXmZCjBgCvJpV64CDFrmk1mcByBMxaZ5D6YlVjkOYMBSzPhUcr45sSueP/ujMFUvQsP/vvpTMN2KYeg7MMrvwqyqhoE/y4KeCeU2WmI3wOIAhr4DM/hV8UwgXspeiWHQMr8Doy6rtgyYZhoXT/9B1yzyl0MYoCuFcZvVwzC/U7T0AjCdHOYCZzLhBC9Gr6SlMHGLVQyjUS1tu+rpSoaAiZsCJnK8GGF4RnaDZqFd3FmqVd5mNPKElimwjZnZGDna3e3AVQfmTSpSgkIYV3HVJ2JVvujEyNJUC6ZdXRg4UqwbS9bfHef2yRCbmUpg3IHZI1WvOmN3ZRROzuKcZpSfYvtf+9ch+hjgFMPEg+CaVLyAhikAJe3imWaXj9N8PwmmAuKqQ65WBKO6rnev12PBqb91ixcr+FVo4dgitpchUYllwEcfsqopctHEUUuWmngvIZg6o4NpTMM3RTDQ5G6rnwMUYmTFixdfVe/5yrDQ04Sb0XIY/q0mi01QQdzyV8zD25GR2NBB3xk/8jmAog5Adfw6tBcQtewJ0JQYxwzG66zX7K8Xz6WxmWqO9cuqMXJpjBhBSeiMPhSYpthuOiyBUT2P12brmQYje1a6wqeIxaUYDFcSNaue6mQa0+ux84zi3ph2wUzY/sJ7nqqqg1IYpWNYjNYDRvRWkVnmaMIqaB6EKUgB1IET6fXaCxQueamb7So9LIZxeRZWXftjUZZ0eXmrETDFllHNpy91sgoRUZX/GLxvGi7Wz05hzJlfi5jsUDqjrZmnFIc1O5j0Lgzt6wMYGGpNSK7r0SkfCndhfebF8wE7G3Svrq6yiwNeNeaQW9fNLrloK354x808DgMnHxyk2O5D0Kq60mWCdtMYlsOIdY2jxQwet6qe+S8V060v42F5XJOv0+wjUnX7aDC9fg0mFyUaTZbfH7y86iXmET/w9+F5mZD63qUhZE9vOMQv797YoMAJ/Cayq67rP4rRu+zZ9Abv7EAbeKr5PE/qtje7SJgRzD97QWnbUQNP+csgrCaR5TvCuSe44Gn2CXKYXeWPSCC5acwNcVL9DZPfhgk4vdUiNrmZrzy7mLYocBh/WvUMkq/41x8GBTA6dAVGlHUXDQWzTM7NQGksullkhB/rntN8QxauNNuJ4U9xS0a/34ymPk5tQLNn7KNYBYWhPtYYJ8rgUBcbaYjISXG2ieWkH0U09yTGDjJINFZ+5yytx0SslJSUlNTHEf0QceO/kAARi69V1+QPSIzzrOLtFX9MzLJYfZ9S8LvSDaN2d8H+e0Fkb6Du8ofIhH8Hrf9imtDIleqkwqcc9G5/jlC3N72EEWoHn1v/pcXsv+Z+E1YHE5mNX+ssm1+4ziSlBTDvOt2+sBkoy2yezb99vm0nbFd2dndtOhORbdmt8XYe7mB+vxJN80a86q32z2/iXRXtrrl9wnuXIF+cKjwVMJAiJyFOVFBoPXqSGqmdP1MHb1nUwwSPRMoGZWli4wFpDmNhCkpaJvex/WEhtKCzMoFlxNIdpcnFyCd20GilvdU8azFxJ0bS7D7OJj1D14hGes0w7c3X2VS3cAIgjFaPj93+F6Ru8lh8HdS9gbdpQWG3/XjR/HJWmhcYQsPVaAown9fjoPE8Ejdm0HTN4/W67Tyi7+mjuP/0POPb+w2FPitZPndW64bTxVtmX2Cg7jO+IVqS8XjV7dyuzrowuLcMS8eja2LHAzczvhjzbTuEy5s5j34YpmvnMaWaPVTilZ8amcnvoKtofh9j2cpZ2geW0e46w4jafSxMjAsoPB/Lq2XsPr9JwDJmz7awVzN9Qv1O7EM70JLVdmNb9nOQ2XCYtn+2KDHaHd8CDzOCtvEKQ0jffE5pOuv4YC9mfF+cc49Tk48NaKlG65c72tgA0fDF89navAl8txmQEaJNeTtl+ndA06lGJlu49tFoHmqMXIbfgiklPR6n+DX+L2W0JFo0ymx83pPd5ee8n7YZDL47o9F2u33ewGUXXTOODwiTdEdTneK8uDEzDaZvO4aYgu46EQnnztz3/Wvj+sJpwte4D39vxdd8B5Yw267xiTvGdff5xzlhuPv4BFpFCSEHEQDCpBPnGmf4AWYM/a3uHMEMh7ejWxjzh3yjI8xT/jW4/zG54KYICEZDJD2bNtvuvolq7A2MuPsfYBbcp6cw3R6oDz/w6cbs7L9Ss5KuKMQyLDybmttuiDsvca5Vo8cwyXoUgeuBcfxGkGr68AVmCzDZKNrXXgNv7RCN7vIhBm6Wb7fd/zoTjNPd7XfBIf0YhvYdbOTQLf3gF4n12ma2X6m2Ga0hpBRXQYPebG8ZnLtlEYRGUGiR824LeoURNTmGMdr3U7HgNHYiyuzDDoAZ7SASywD+jxAHzZtXE1DNaMcRwRn11vScW4PehdF7fNY00lb3Jz7w6xiGNp8bGxheNzdPKT2GeSlMjaaySM5pmdHkCIaredd8s20Si4VL02kvYmeCC5f6zyCHuRhF+Jij5j2ffWrwdgsjACd4hYHR0u4FTuNxV3g2TZ/64WstmP1tZUCtLLL8CzJO3C/fnzzNW6KPIN/mKe5tJstxS6w/Gb3JeNXEuxzIdLIi+6QM9wvbRn8ynk+T85Gge9u2dvCcGGqHGOgz2365ori8hCtNkA3YNibUDP4JbioFHvjA1rBpnH4NTo1QW8v/wRlhjv83pll5f2pdWnm5ZlmahdcaujV4i53V5SUGZVBEtZdkEkrJ6RNaoJSddyctVPJyf0n3ee7Lw6PobnYCSfKlMu1l1U8MTHBsiQ8osy5PLKOJ3elnTZ3p4ZQfvhF1Y8JP4I2uizsA8jrlTwGAaiKCOJ+y/E4ZKvzw6Hvxbmj6D1MI/2/tn/ZxsIK5H/no6/G+9Ow1lJKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpL6k/ofgGrzUc99HQIAAAAASUVORK5CYII=" alt="PhonePe" className="w-10 h-10 object-contain rounded" /> <p>PhonePe</p>
      <img src="data:image/jpeg;base64,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" alt="Google Pay" className="w-10 h-10 object-contain" /> <p>Google pay</p>
      <img src="data:image/png;base64,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" alt="Paytm" className="w-14 h-10 object-contain" /><p>Paytm</p>
    </div>
  </div>
)}

{formData.paymentMethod === "cod" && (
  <div className="mt-4">
    <img
      src="data:image/jpeg;base64,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"
      alt="Cash on Delivery"
      className="w-16 h-16 object-contain"
    />
    <p>Cash On Delivery</p>
  </div>
)}

          </div>

          <button
            onClick={handleOrderPlace}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Place Order
          </button>
        </div>

        {/* Cart Summary */}
        <div>
          {items.length > 0 &&
            items.map((item) => (
              <CartCard key={item.id} item={item} isFromCheckout={true} />
            ))}

          {items.length > 0 && (
            <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
