import { redirect } from "next/navigation";
import { getCurrentUser } from "@/store/auth-store";
import { getUsers } from "@/store/users-store";
import { UsersTable } from "@/components/usuarios/users-table";
import { UsersFilters } from "@/components/usuarios/users-filters";
import { CreateUserDialog } from "@/components/usuarios/create-user-dialog";
import { Pagination } from "@/components/ui/pagination";

type UsuariosPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UsuariosPage({
  searchParams,
}: UsuariosPageProps) {
  const currentUser = await getCurrentUser();

  if (currentUser.role !== "ADMIN") {
    redirect("/");
  }

  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const search = typeof params.search === "string" ? params.search : "";
  const role = params.role === "ADMIN" || params.role === "USER" ? params.role : undefined;
  const isActive =
    params.isActive === "true" ? true : params.isActive === "false" ? false : undefined;

  const { data: users, meta } = await getUsers({
    page,
    search,
    role,
    isActive,
  });

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

      <UsersFilters />

      <UsersTable users={users} currentUserId={currentUser.id} />

      <Pagination totalPages={meta.totalPages} />
    </div>
  );
}
