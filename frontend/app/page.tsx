import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-text">
        Gestão da Qualidade
      </h1>
      <p className="max-w-md text-text-secondary">
        Bem-vindo. Acesse sua conta para continuar.
      </p>
      <Link
        href="/login"
        className="rounded-md bg-primary px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Entrar
      </Link>
    </div>
  );
}
