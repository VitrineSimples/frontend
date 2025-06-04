"use client";

import Image from "next/image";
import userImage from "@/public/userStockImage.jpg";
import { IconUserEdit, IconUserX } from "@tabler/icons-react";
import { useState } from "react";
import { Modal } from "@/app/components/Modal/Modal";
import { useAuth } from "@/context/Auth/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

export default function User() {
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  const toggleEditUserModal = () => setEditUserModal(!editUserModal);
  const toggleDeleteUserModal = () => setDeleteUserModal(!deleteUserModal);

  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    toast.warning("Não encontrado usuário!");
    router.push("/login");
  }

  return (
    <>
      <div>
        <div className="w-full h-38 bg-brand-100" />
        <div className="container mx-auto px-2 flex md:flex-row flex-col md:justify-between md:-translate-y-0 -translate-y-16">
          <div className="flex items-center md:items-start md:flex-row flex-col">
            <Image
              src={userImage}
              alt="user"
              className="border-2 border-brand-100 rounded-full w-32 h-32 md:w-40 md:h-40 xl:w-48 xl:h-48 object-cover md:-translate-y-16"
            />
            <div className="flex flex-col gap-1 m-4">
              <h1 className="text-2xl text-gray-600 text-center md:text-start">
                {user!.name}
              </h1>
              <h6 className="text-sm text-gray-400 text-center md:text-start">
                {user!.email}
              </h6>
              <h6 className="text-sm text-gray-400 text-center md:text-start">
                {user!.cpf}
              </h6>
            </div>
          </div>
          <div className="m-4 flex md:flex-row flex-col gap-2">
            <button
              onClick={() => setEditUserModal(true)}
              className="h-fit w-fit mx-auto md:mx-0 justify-center md:justify-baseline uppercase flex items-center gap-2 text-brand-200 hover:text-white hover:bg-brand-200 border border-brand-200 p-2 rounded-md cursor-pointer transition-all duration-300"
            >
              <IconUserEdit />
              Editar
            </button>
            <button
              onClick={() => setDeleteUserModal(true)}
              className="h-fit w-fit mx-auto md:mx-0 justify-center md:justify-baseline uppercase flex items-center gap-2 text-brand-200 hover:text-white hover:bg-brand-200 border border-brand-200 p-2 rounded-md cursor-pointer transition-all duration-300"
            >
              <IconUserX />
              Deletar
            </button>
          </div>
        </div>
        <div className="h-1 bg-brand-100/50 container mx-auto rounded-lg"></div>
        {/* <div className="container mx-auto">
        ga
      </div> */}
      </div>
      {editUserModal && (
        <Modal toggleModal={toggleEditUserModal}>
          <EditUserModal toggleModal={toggleEditUserModal} />
        </Modal>
      )}
      {deleteUserModal && (
        <Modal toggleModal={toggleDeleteUserModal}>
          <DeleteUserModal />
        </Modal>
      )}
    </>
  );
}
