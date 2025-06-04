import { Input } from "@/app/components/Input";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { RegisterFormData, registerSchema } from "@/app/register/schema";
import { useAuth } from "@/context/Auth/AuthContext";
import { iUser } from "@/context/Auth/types";
import { useLoading } from "@/context/Loading/LoadingContext";
import { useUser } from "@/context/User/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditUserModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { isLoading } = useLoading();
  const { user, refreshUser } = useAuth();
  const { updateUser } = useUser();

  const handleSetData = useCallback(
    (user: iUser) => {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("cpf", user.cpf);
    },
    [setValue]
  );

  useEffect(() => {
    if (user) handleSetData(user);
  }, [user]);

  setValue("name", user!.name);

  const onSubmit = async (data: RegisterFormData) => {
    await updateUser(user!.id, data);
    await refreshUser();
    toggleModal();
  };

  return (
    <section className="flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <Input
            label="Nome"
            id="name"
            type="text"
            placeholder="Digite seu nome"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Input
            maxLength={11}
            label="CPF"
            id="cpf"
            type="number"
            placeholder="Digite seu nome"
            {...register("cpf")}
          />
          {errors.cpf && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.cpf.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Senha"
            id="password"
            type="password"
            placeholder="Crie uma senha"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Confirmar Senha"
            id="confirmPassword"
            type="password"
            placeholder="Repita sua senha"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-contrast text-sm mt-1 px-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            type="submit"
            className="mt-4 w-full border hover:border-white border-brand-200 hover:bg-brand-200 hover:text-white py-2 rounded-lg bg-white text-brand-200 transition-colors cursor-pointer duration-300"
          >
            Salvar
          </button>
        )}
      </form>
    </section>
  );
}
