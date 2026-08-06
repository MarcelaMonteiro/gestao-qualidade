import { getCurrentUser } from "@/store/auth-store";
import { Sidebar } from "@/components/layout/auth/sidebar";
import { Header } from "@/components/layout/auth/header";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen">
      <Sidebar isAdmin={user.role === "ADMIN"} />
      <div className="flex min-h-0 flex-1 flex-col">
        <Header user={user} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
