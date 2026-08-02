import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
			<h1 className="text-3xl font-semibold tracking-tight text-text">
				Gestão da Qualidade
			</h1>
			<p className="max-w-md text-text-secondary">Bem-vindo.</p>
		</div>
	);
}
