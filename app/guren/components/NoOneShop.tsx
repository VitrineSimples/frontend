import Link from "next/link";

export default function NoOneShop() {
  return (
    <div className="min-h-screen bg-brand-100/15 flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-brand-200">Nenhuma loja</h1>
      <p className="text-lg mb-6 text-brand-200">
        Não conseguimos encontrar nenhuma loja disponível em nosso sistema.
      </p>
      <Link
        href="/guren/me"
        className="bg-white text-brand-200 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Ver meu perfil e adicionar uma loja
      </Link>
    </div>
  );
}
