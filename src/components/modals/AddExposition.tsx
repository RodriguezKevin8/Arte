import { useState, ChangeEvent, FormEvent } from "react";
import { createExpo } from "../../api/UsersApi";
import { toast } from "react-toastify";
import { Exposition } from "../../types";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface ExpositionFormData {
  titulo: string;
  descripcion: string;
  fechaInauguracion: string;
  fechaClausura: string;
}
type AddExpositionModalProps = {
  setExpositions: React.Dispatch<React.SetStateAction<Exposition[]>>;
  closeModal: () => void;
};

export default function AddExposition({
  setExpositions,
  closeModal,
}: AddExpositionModalProps) {
  const [formData, setFormData] = useState<ExpositionFormData>({
    titulo: "",
    descripcion: "",
    fechaInauguracion: "",
    fechaClausura: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fechaInauguracion, fechaClausura } = formData;
    if (new Date(fechaInauguracion) > new Date(fechaClausura)) {
      toast.error(
        "La fecha de inauguración no puede ser posterior a la fecha de clausura."
      );
      return;
    }

    const newExposition = { ...formData };

    try {
      await createExpo(newExposition);
      setExpositions([]); // Limpia la lista (solo para mostrar)
      toast.success("Exposición creada correctamente");
      closeModal();
    } catch (error) {
      console.error("Error al crear la exposición:", error);
      toast.error("Error al crear exposición");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform scale-95 animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Agregar Nueva Exposición
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-red-500 transition duration-300 text-2xl"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nombre de la exposición
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all"
              placeholder="Ej: Obras maestras del Renacimiento"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Descripción
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none resize-none transition-all"
              placeholder="Descripción de la exposición"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Fecha de Inauguración
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all"
                name="fechaInauguracion"
                value={formData.fechaInauguracion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Fecha de Clausura
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all"
                name="fechaClausura"
                value={formData.fechaClausura}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 text-lg font-medium shadow-md"
          >
            <AiOutlineCheck className="mr-2 text-xl" /> Guardar Exposición
          </button>
        </form>
      </div>
    </div>
  );
}
