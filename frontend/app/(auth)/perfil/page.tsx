import { getCurrentUser } from "@/store/auth-store";
import { ProfileForm } from "@/components/perfil/profile-form";
import { ChangePasswordForm } from "@/components/perfil/change-password-form";

export default async function PerfilPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
      <h1 className="text-xl font-semibold text-text">Meu perfil</h1>
      <ProfileForm name={currentUser.name} email={currentUser.email} />
      <ChangePasswordForm />
    </div>
  );
}
