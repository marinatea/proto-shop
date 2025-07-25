'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Template } from 'types/types';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import Spinner from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from 'app/store/cartSlice';

export default function ProductPage() {
  const { id } = useParams();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const { data: session } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchTemplate = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch template');
        }
        const data: Template = await response.json();
        setTemplate(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching template:', error);
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: template?.name,
          text: template?.description,
          url: window.location.href
        });
      } catch (error) {
        console.error('Błąd podczas udostępniania:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(
          'Link skopiowany do schowka! Możesz wkleić go w wybraną aplikację.'
        );
      } catch (error) {
        console.error('Błąd kopiowania linku:', error);
      }
    }
  };

  if (loading) return <Spinner />;

  if (!template)
    return (
      <div className="text-center py-10 text-white">Template not found.</div>
    );

  return (
    <div className="container p-12 bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full">
          <img
            src={
              template.image instanceof File
                ? URL.createObjectURL(template.image)
                : template.image
            }
            alt={template.name}
            width={500}
            height={300}
            className="rounded-lg shadow-lg w-full h-auto "
          />
        </div>

        <div className=" flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{template.name}</h1>
            <div className="text-gray-500">
              <div className="flex flex-col space-y-2">
                <p className="text-gray-100">{template.description}</p>
                <p>Autor: {template.author}</p>
              </div>
              <button
                className="text-blue-400 hover:text-blue-500 mb-6"
                onClick={() => setShowDetails(!showDetails)}
              >
                See more...
              </button>
              {showDetails && (
                <div className="mt-2 p-4 bg-gray-800 rounded-lg shadow-lg">
                  <p>Framework: {template.framework}</p>
                  <p>CSS: {template.css}</p>
                  <p>Database: {template.database}</p>
                  <p>CMS: {template.cms}</p>
                  <p>Authentication: {template.authentication}</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <span className="text-xl font-semibold text-white-400">
                {template.price} PLN
              </span>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setLikes(likes + 1)}
              >
                <FaHeart className="text-red-400" />
                {likes}
              </button>
              <button
                className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={handleShare}
              >
                <FaShareAlt /> Share
              </button>
            </div>

            <a
              href={template.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-blue-400 hover:text-blue-500"
            >
              See Demo →
            </a>

            <div className="mt-6">
              {session?.user?.name === template.author && (
                <Link href={`/user/${session.user.name}/products/${id}/edit`}>
                  <Button variant="secondary">Edit Product</Button>
                </Link>
              )}
            </div>
          </div>
          {session?.user && (
            <Button
              className="text-xl w-full mt-4"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: template.id,
                    title: template.name,
                    price: template.price,
                    quantity: 1,
                    image:
                      typeof template.image === 'string' ? template.image : ''
                  })
                );
              }}
            >
              Add to 🛒
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
