"use client";

import { useState } from "react";
import CreateProductModal from "../[shopName]/modals/CreateProduct";
import { Modal } from "@/app/components/Modal/Modal";

export default function AdminProduct() {
  const [createProductModal, setCreateProductModal] = useState(false);
  const toggleCreateProductModal = () =>
    setCreateProductModal(!createProductModal);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-contrast">
        <button
          onClick={() => toggleCreateProductModal()}
          className="text-gray-200 border border-gray-200 py-2 px-4 cursor-pointer rounded-md"
        >
          Adicionar produto
        </button>
      </div>
      {createProductModal && (
        <Modal toggleModal={toggleCreateProductModal}>
          <CreateProductModal toggleModal={toggleCreateProductModal} />
        </Modal>
      )}
    </>
  );
}
