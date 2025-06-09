"use client";

import { useState } from "react";
import CreateProductModal from "../[shopName]/modals/Product/CreateProduct";
import { Modal } from "@/app/components/Modal/Modal";
import CreateSeasonalCampaignModal from "../[shopName]/modals/SeasonalCampaign/CreateSeasonalCampaign";

export default function AdminProduct() {
  const [createProductModal, setCreateProductModal] = useState(false);
  const [createCampaignModal, setCreateCampaignModal] = useState(false);

  const toggleCreateProductModal = () =>
    setCreateProductModal(!createProductModal);
  const toggleCreateCampaignModal = () =>
    setCreateCampaignModal(!createCampaignModal);

  return (
    <>
      <div className="flex items-center justify-center p-4 bg-contrast gap-2">
        <button
          onClick={() => toggleCreateProductModal()}
          className="text-gray-200 border border-gray-200 py-2 px-4 cursor-pointer rounded-md"
        >
          Adicionar produto
        </button>
        <button
          onClick={() => toggleCreateCampaignModal()}
          className="text-gray-200 border border-gray-200 py-2 px-4 cursor-pointer rounded-md"
        >
          Adicionar campanha sazonal
        </button>
      </div>
      {createCampaignModal && (
        <Modal toggleModal={toggleCreateCampaignModal}>
          <CreateSeasonalCampaignModal
            toggleModal={toggleCreateCampaignModal}
          />
        </Modal>
      )}
      {createProductModal && (
        <Modal toggleModal={toggleCreateProductModal}>
          <CreateProductModal toggleModal={toggleCreateProductModal} />
        </Modal>
      )}
    </>
  );
}
