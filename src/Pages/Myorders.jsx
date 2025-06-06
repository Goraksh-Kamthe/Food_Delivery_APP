import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const OrderSummary = ({ order, isExpanded, toggleExpand }) => {
  const { orderId, date, status } = order;
  const subTotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharges = 25;
  const taxes = Math.floor(subTotal * 0.05);
  const total = subTotal + deliveryCharges + taxes;

  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></p>
          <p className="text-sm text-gray-600">Date: {date?.date}</p>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span className={`font-semibold ${status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
              {status}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-orange-600">
            ₹{total} (Incl. Taxes & Delivery)
          </p>
          <button
            onClick={toggleExpand}
            className="text-orange-500 hover:text-orange-700 mt-1 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <FaChevronUp className="w-4 h-4" /> Hide Items
              </>
            ) : (
              <>
                <FaChevronDown className="w-4 h-4" /> View Items
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-2 border-t pt-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-700">
              <span>{item.qty} x {item.name}</span>
              <span>₹{item.qty * item.price}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex justify-end gap-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
          <MdOutlineCancel className="inline w-5 h-5 mr-1" /> Cancel Order
        </button>
        {status !== "Delivered" && (
          <button className="border border-orange-400 text-orange-600 px-4 py-2 rounded-md hover:bg-orange-100 transition">
            <FaMapMarkerAlt className="inline w-5 h-5 mr-1" /> Track Order
          </button>
        )}
      </div>
    </div>
  );
};

const MyOrders = () => {
  const [expandedOrder, setExpandedOrder] = useState(false);
  const cartItems = useSelector((state) => state.cart);

  const itemsWithOrderPlaced = cartItems.filter((item) => item.orderPlaced);
  const groupedOrder = {
    orderId: itemsWithOrderPlaced[0]?.orderId,
    date: itemsWithOrderPlaced[0]?.date,
    status: itemsWithOrderPlaced[0]?.status,
    items: itemsWithOrderPlaced,
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">Your Orders</h1>

        {itemsWithOrderPlaced.length === 0 ? (
          <p className="text-center text-gray-600">You haven’t placed any orders yet.</p>
        ) : (
          <OrderSummary
            order={groupedOrder}
            isExpanded={expandedOrder}
            toggleExpand={() => setExpandedOrder((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
