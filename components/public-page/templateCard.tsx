'use client';
import Link from 'next/link';
import { Template } from 'types/types';
import Image from 'next/image';

const TemplateCard = ({
  id,
  name,
  description,
  image,
  author,
  demoLink
}: Template) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <Link href={`/template/${id}`} passHref>
        <div className="cursor-pointer">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-sm text-gray-400">{description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">Created by {author}</span>
            </div>
          </div>
        </div>
      </Link>

      {demoLink && (
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500 mt-4 block"
        >
          Demo
        </a>
      )}
    </div>
  );
};

export default TemplateCard;
