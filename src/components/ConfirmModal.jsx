import { createPortal } from "react-dom";

export default function ConfirmModal({ onConfirm, onCancel, message }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="font-semibold text-lg">Confirmação</h1>
        <p className="mt-2">{message}</p>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-2xl w-full hover:bg-red-700"
          >
            Deletar
          </button>

          <button
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded-2xl w-full hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal"),
  );
}
