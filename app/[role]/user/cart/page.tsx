'use client';

import { clearCart, removeFromCart } from 'app/store/cartSlice';
import { RootState } from 'app/store/store';
import { useSelector, useDispatch } from 'react-redux';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Koszyk</h1>
      {cartItems.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <img src={item.image} alt="img" />
                <p className="font-semibold">{item.title}</p>
                <p>Ilość: {item.quantity}</p>
              </div>
              <div>
                <p>{item.price} zł</p>
                <button
                  onClick={() => dispatch(removeFromCart(String(item.id)))}
                  className="text-red-500 text-sm"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-bold">Suma: {total.toFixed(2)} zł</p>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
            >
              Wyczyść koszyk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
