import { Template } from 'types/types';

const TemplateCard = ({
  name,
  description,
  image,
  author,
  demoLink
}: Template) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-500">Created by {author}</span>
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
