import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

interface HeaderProps {
  title: string; // Título da página.
  userName: string | null; // Nome do usuário.
}

export default function Header({ title, userName }: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Título */}
        <h1 className="text-2xl font-bold">{title}</h1>

        {/* Navegação */}
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link href="/settings" className="hover:text-gray-300">
            Settings
          </Link>
        </nav>

        {/* Usuário e Logout */}
        <div className="flex items-center space-x-4">
          <span>Olá, {userName || "Usuário"}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
