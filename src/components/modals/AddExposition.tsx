import { useState, ChangeEvent, FormEvent } from "react";
import { createExpo } from "../../api/UsersApi";
import { toast } from "react-toastify";
import { Exposition } from "../../types";

interface ExpositionFormData {
  titulo: string;
  descripcion: string;
  fechaInauguracion: string;
  fechaClausura: string;
}
type AddExpositionModalProps = {
  setExpositions: React.Dispatch<React.SetStateAction<Exposition[]>>;
};

export default function AddExposition({
  setExpositions,
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
    } catch (error) {
      console.error("Error al crear la exposición:", error);
      toast.error("Error al crear exposición");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Agregar Nueva Exposición</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la exposición</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Ej: Obras maestras del Renacimiento"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            placeholder="Descripción de la exposición"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Inauguración</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded"
            name="fechaInauguracion"
            value={formData.fechaInauguracion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Clausura</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded"
            name="fechaClausura"
            value={formData.fechaClausura}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
