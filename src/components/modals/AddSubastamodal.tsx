import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { toast } from "react-toastify";
import { makeAnOffert } from "../../api/ObraApi";

type AddSubastaModalProps = {
  precioSalida: number;
  closeModal: () => void;
};

export default function AddSubastaModal({
  closeModal,
  precioSalida,
}: AddSubastaModalProps) {
  const [monto, setMonto] = useState("");
  const { id: obra_id } = useParams();
  const { user } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const montoNumber = parseFloat(monto);

    if (isNaN(montoNumber) || montoNumber <= precioSalida) {
      toast.error("El monto debe ser un número mayor al precio de salida.");
      return;
    }

    const oferta = {
      monto: montoNumber,
      fechaOferta: new Date().toISOString().split("T")[0],
      obra: Number(obra_id),
      usuario: user.id,
    };

    try {
      const newOffert = await makeAnOffert(oferta);
      if (newOffert) {
        toast.success("La oferta se realizó correctamente.");
        closeModal();
        return;
      }
      toast.error("No se pudo realizar la oferta.");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al realizar la oferta.");
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Hacer una oferta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Monto de la oferta
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              min={precioSalida + 1}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Ofertar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
