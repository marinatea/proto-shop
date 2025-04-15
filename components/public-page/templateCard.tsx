'use client';
import Link from 'next/link';
import { Template } from 'types/types';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Pencil } from 'lucide-react';

const TemplateCard = ({
  id,
  name,
  description,
  image,
  author,
  demoLink
}: Template) => {
  const { data: session } = useSession();

  const productLink = session?.user
    ? `/user/user/products/${id}`
    : `/products/${id}`;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
      <div className="relative">
        {session?.user?.name === author && (
          <Link
            href={`/user/${session.user.name}/products/${id}/edit`}
            className="absolute top-2 right-2 text-gray-500 hover:text-black z-10"
          >
            <Pencil className="w-5 h-5" />
          </Link>
        )}

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
      </div>

      <Link href={productLink} passHref>
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
