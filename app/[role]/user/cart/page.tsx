'use client';

import {
  clearCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity
} from 'app/store/cartSlice';
import { RootState } from 'app/store/store';
import { useSelector, useDispatch } from 'react-redux';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handlePayment = () => {
    // Tu możesz dodać logikę przejścia do płatności
    alert('Przejście do płatności - do zaimplementowania');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your orders</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">You don't have orders.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity(String(item.id)))
                      }
                      className="w-6 h-6 bg-gray-700 rounded hover:bg-gray-600 flex items-center justify-center font-bold select-none"
                      aria-label="Zmniejsz ilość"
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity(String(item.id)))
                      }
                      className="w-6 h-6 bg-gray-700 rounded hover:bg-gray-600 flex items-center justify-center font-bold select-none"
                      aria-label="Zwiększ ilość"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="text-lg font-medium">{item.price} zł</p>
                <button
                  onClick={() => dispatch(removeFromCart(String(item.id)))}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 border-t pt-4 flex justify-between items-center">
            <p className="text-2xl font-bold">Total: {total.toFixed(2)} zł</p>
            <div className="space-x-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Delete all
              </button>
              <button
                onClick={handlePayment}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Go to payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
