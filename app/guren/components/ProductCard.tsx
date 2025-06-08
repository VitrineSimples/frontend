import { Modal } from "@/app/components/Modal/Modal";
import { iProduct } from "@/context/Product/type";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EditProductModal from "../[shopName]/modals/EditProduct";
import DeleteProductModal from "../[shopName]/modals/DeleteProduct";
import Link from "next/link";
import { useCart } from "@/context/Cart/CartContext";
import { useOrder } from "@/context/Order/OrderContext";

export default function ProductCard({
  product,
  isOwner,
  shopName,
}: {
  product: iProduct;
  isOwner: boolean;
  shopName: string;
}) {
  const [editProductModal, setEditProductModal] = useState(false);
  const toggleEditProductModal = () => setEditProductModal(!editProductModal);

  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const toggleDeleteProductModal = () =>
    setDeleteProductModal(!deleteProductModal);

  const { addToCart } = useCart();
  const { createOrderFromCart } = useOrder();
  const addToCartAndFinishOrder = async () => {
    await addToCart({ productId: product.id, quantity: 1 }, product.shopId);
    await createOrderFromCart();
  };

  return (
    <>
      <div
        key={product.id}
        className="bg-gray-100 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center gap-4 w-full sm:max-w-sm md:max-w-md"
      >
        <div className="relative w-full">
          <Image
            src={product.imageURL}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-56 object-cover rounded-xl"
          />
          {isOwner && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => toggleEditProductModal()}
                title="Editar"
                className="cursor-pointer bg-gray-100/80 backdrop-blur-md p-2 rounded-full shadow hover:bg-red-100 transition"
              >
                <Edit className="w-5 h-5 text-contrast" />
              </button>
              <button
                onClick={() => toggleDeleteProductModal()}
                title="Remover"
                className="cursor-pointer bg-gray-100/80 backdrop-blur-md p-2 rounded-full shadow hover:bg-red-100 transition"
              >
                <Trash className="w-5 h-5 text-contrast" />
              </button>
            </div>
          )}
        </div>
        <div className="text-center px-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{product.name}</p>
        </div>
        <div className="flex items-center justify-between w-full px-1">
          <span className="text-contrast font-bold text-lg sm:text-xl">
            R$ {product.price.toFixed(2)}
          </span>
          {!isOwner && (
            <button
              title="Adicionar ao carrinho"
              onClick={() =>
                addToCart(
                  { productId: product.id, quantity: 1 },
                  product.shopId
                )
              }
              className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-2 rounded-full transition"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 " />
            </button>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
          <Link
            href={`${shopName}/${product.id}`}
            className="flex-1 text-center cursor-pointer bg-gray-200 text-brand-200 py-2 rounded-xl hover:bg-gray-300 hover:text-brand-100 transition font-medium text-sm sm:text-base"
          >
            Detalhes
          </Link>
          {!isOwner && (
            <button
              onClick={() => addToCartAndFinishOrder()}
              className="flex-1 cursor-pointer bg-contrast/95 text-gray-100 py-2 rounded-xl hover:bg-contrast transition font-medium text-sm sm:text-base"
            >
              Comprar
            </button>
          )}
        </div>
      </div>
      {editProductModal && (
        <Modal toggleModal={toggleEditProductModal}>
          <EditProductModal
            toggleModal={toggleEditProductModal}
            product={product}
          />
        </Modal>
      )}
      {deleteProductModal && (
        <Modal toggleModal={toggleDeleteProductModal}>
          <DeleteProductModal
            productId={product.id}
            toggleModal={toggleDeleteProductModal}
          />
        </Modal>
      )}
    </>
  );
}
