import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createWhatsAppMessage = (username: string, orderId: string) => {
  return encodeURIComponent(
    `
🛒 *Novo Pedido Recebido!*

Olá, me chamo *${username}* e acabei de finalizar meu pedido na sua loja. Seguem os dados:

🧾 *ID do Pedido:* ${orderId}

Aguardo o retorno. Obrigado! 😊
  `.trim()
  );
};
