// app/(public)/layout.tsx
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>Header for Public</header>
      {children}  {/* Strona główna zostanie tutaj wyrenderowana */}
      <footer>Footer for Public</footer>
    </div>
  );
}
