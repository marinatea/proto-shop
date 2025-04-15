import { Home, LineChart, Settings, Store } from 'lucide-react';
import { NavItem } from './nav-item';

export default function Nav() {
  return (
    <aside className="sticky inset-y-0 left-0 z-10 bg-background border-r hidden sm:flex flex-col justify-between h-screen">
      <nav className="flex flex-col items-start gap-4 px-6 py-5">
        <NavItem href="/user/user" label="UserPanel">
          <Home className="h-6 w-6" />
        </NavItem>
        <NavItem href="/" label="Store">
          <Store className="h-6 w-6" />
        </NavItem>
        <NavItem href="/user/analytics" label="Analytics">
          <LineChart className="h-6 w-6" />
        </NavItem>
      </nav>

      <nav className="flex flex-col items-start gap-4 px-6 py-5">
        <NavItem href="/user/settings" label="Settings">
          <Settings className="h-6 w-6" aria-label="Settings" />
        </NavItem>
      </nav>
    </aside>
  );
}
