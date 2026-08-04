import type { User } from "@/types/user";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteUserDialog } from "./delete-user-dialog";
import { StatusBadge } from "./status-badge";
import { StatusToggleButton } from "./status-toggle-button";

export function UsersTable({
	users,
	currentUserId,
}: {
	users: User[];
	currentUserId: string;
}) {
	return (
		<div className="overflow-x-auto rounded-md border border-border bg-surface">
			<table className="w-full text-left text-sm">
				<thead>
					<tr className="border-b border-border bg-surface-muted text-text-secondary">
						<th className="px-4 py-3 font-medium">Nome</th>
						<th className="px-4 py-3 font-medium">E-mail</th>
						<th className="px-4 py-3 font-medium">Perfil</th>
						<th className="px-4 py-3 font-medium">Status</th>
						<th className="px-4 py-3 font-medium">Ações</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => {
						const isSelf = user.id === currentUserId;
						return (
							<tr key={user.id} className="border-b border-border last:border-0">
								<td className="px-4 py-3 text-text">{user.name}</td>
								<td className="px-4 py-3 text-text-secondary">{user.email}</td>
								<td className="px-4 py-3 text-text-secondary">{user.role}</td>
								<td className="px-4 py-3">
									<StatusBadge isActive={user.isActive} />
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center gap-2">
										<EditUserDialog
											userId={user.id}
											name={user.name}
											email={user.email}
											role={user.role}
											isSelf={isSelf}
										/>
										<StatusToggleButton
											userId={user.id}
											isActive={user.isActive}
											disabled={isSelf}
										/>
										<DeleteUserDialog
											userId={user.id}
											userName={user.name}
											disabled={isSelf}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
