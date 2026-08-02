import { ThemeToggle } from "@/components/theme/theme-toggle";
import { UserMenu } from "./user-menu";

type HeaderUser = {
	name: string;
	email: string;
};

export function Header({ user }: { user: HeaderUser }) {
	return (
		<header className="flex h-16 items-center justify-end gap-3 border-b border-border bg-surface px-6">
			<ThemeToggle />
			<UserMenu user={user} />
		</header>
	);
}
