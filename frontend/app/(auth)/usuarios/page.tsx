import { redirect } from "next/navigation";
import { getCurrentUser } from "@/store/auth-store";
import { getUsers } from "@/store/users-store";
import { UsersTable } from "@/components/usuarios/users-table";
import { CreateUserDialog } from "@/components/usuarios/create-user-dialog";

export default async function UsuariosPage() {
  const currentUser = await getCurrentUser();

  if (currentUser.role !== "ADMIN") {
    redirect("/");
  }

  const users = await getUsers();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text">Usuários</h1>
          <p className="text-sm text-text-secondary">
            Gerencie os usuários com acesso ao sistema.
          </p>
        </div>
        <CreateUserDialog />
      </div>

      <UsersTable users={users} currentUserId={currentUser.id} />
    </div>
  );
}
