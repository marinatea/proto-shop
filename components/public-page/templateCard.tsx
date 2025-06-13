'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Check, CirclePlus, Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { Template } from 'types/types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from 'app/store/cartSlice';
import { useState } from 'react';

const TemplateCard = ({
  id,
  name,
  description,
  image,
  author,
  price,
  demoLink
}: Template) => {
  const { data: session } = useSession();

  const productLink = session?.user
    ? `/user/user/products/${id}`
    : `/products/${id}`;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const isInCart = cartItems.some((item: any) => item.id === id);
  const isOwner = session?.user?.name === author;
  const [showCheck, setShowCheck] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title: name,
        price,
        quantity: 1,
        image: typeof image === 'string' ? image : ''
      })
    );

    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      <div className="relative">
        {!isOwner && session?.user && (
          <div className="absolute top-2 right-2 z-10 flex items-center justify-center transition-all duration-900 ease-in-out">
            <button
              onClick={handleAddToCart}
              className={`transition-all duration-700 ease-in-out transform ${
                showCheck
                  ? 'opacity-0 scale-95 pointer-events-none'
                  : 'opacity-100 scale-100 pointer-events-auto'
              } text-gray-500 hover:text-black`}
            >
              <CirclePlus className="w-10 h-10" />
            </button>

            <div
              className={`absolute transition-all duration-700 ease-in-out transform ${
                showCheck
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              } text-green-500`}
            >
              <Check className="w-10 h-10" />
            </div>
          </div>
        )}

        {isOwner && (
          <Link
            href={`/user/user/products/${id}/edit`}
            className="absolute top-2 right-2 text-gray-500 hover:text-black z-10"
          >
            <Pencil className="w-10 h-10" />
          </Link>
        )}
      </div>

      <Link href={productLink} passHref>
        {image ? (
          <Image
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            alt={name}
            width={300}
            height={300}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-300 flex justify-center items-center">
            <span>No Image</span>
          </div>
        )}
        <div className="cursor-pointer flex-grow">
          <div className="p-4 flex flex-col flex-grow gap-4">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-sm text-gray-400 flex-grow">{description}</p>
            <span className="text-xs text-gray-500 mt-auto">
              Created by {author}
            </span>
          </div>
        </div>
      </Link>

      {demoLink && (
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500 p-4 text-right block mt-auto"
        >
          Demo
        </a>
      )}
    </div>
  );
};

export default TemplateCard;
