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

    const newExposition = {
      ...formData,
    };

    try {
      await createExpo(newExposition);
      //Esto no creo que sea optimo asi que no lo hagan en otros lados, acá porque solo es para mostra
      setExpositions([]);
      toast.success("Exposición creada correctamente");
      closeModal();
    } catch (error) {
      console.error("Error al crear la exposición:", error);
      toast.error("Error al crear exposición");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/80">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl relative w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Agregar Nueva Exposición
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-red-500 text-2xl transition"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Nombre de la exposición
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Obras maestras del Renacimiento"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Descripción
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Descripción de la exposición"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Fecha de Inauguración
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="fechaInauguracion"
              value={formData.fechaInauguracion}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Fecha de Clausura
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="fechaClausura"
              value={formData.fechaClausura}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-lg font-medium"
          >
            <AiOutlineCheck className="mr-2 text-xl" /> Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
