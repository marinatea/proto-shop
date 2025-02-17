import { User } from 'lucide-react';
import { Logo } from '../icons';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex items-center">
        <User />
      </div>
    </header>
  );
}
