import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getObrasByExposicion,
  createObra,
  deleteObra,
} from "../api/ExpositionsApi";
import { ObraDTO } from "../types";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { toast } from "react-toastify";

interface FormDataType {
  titulo: string;
  estilo: string;
  precioSalida: string;
  imagen: File | null;
  exposicion: string;
  propietario: string;
  artista: string;
}

export default function ObrasDeExpo() {
  const { user } = useGlobalContext();
  const { id } = useParams<{ id: string }>();
  const [obras, setObras] = useState<ObraDTO[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    titulo: "",
    estilo: "",
    precioSalida: "",
    exposicion: String(id),
    propietario: String(user.id),
    artista: String(user.id),
    imagen: null,
  });

  console.log("datos a revisar", user.id);

  useEffect(() => {
    fetchObras();
  }, [id]);

  const fetchObras = async () => {
    try {
      const expositionData = await getObrasByExposicion(Number(id));
      if (expositionData) {
        setObras(expositionData);
      }
    } catch (error) {
      console.error("Error al obtener las obras", error);
    }
  };
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        imagen: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("estilo", formData.estilo);
    data.append("precioSalida", formData.precioSalida);
    data.append("exposicion", formData.exposicion);
    data.append("propietario", formData.propietario);
    data.append("artista", formData.artista);
    if (formData.imagen) {
      data.append("imagen", formData.imagen);
    }

    try {
      await createObra(data);
      toast.success("Obra creada correctamente");
      closeModal();
      fetchObras();
    } catch (error) {
      toast.error("Error al crear la obra");
    }
  };

  const handleDelete = async (obraId: number) => {
    try {
      await deleteObra(obraId);
      toast.success("Obra eliminada correctamente");
      fetchObras();
    } catch (error) {
      toast.error("Error al eliminar la obra");
    }
  };

  return (
    <div className="w-full px-[100px] py-6 relative  bg-gray-200 min-h-[92vh]">
      <div className="absolute top-6 right-6">
        <button
          onClick={openModal}
          className="bg-blue-950 text-white px-4 py-2 rounded-md text-lg hover:bg-green-600 transition duration-300"
        >
          Agregar tu obra de arte
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl">
            <h3 className="text-2xl mb-4 text-center text-gray-800">
              Agregar Obra
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="titulo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="estilo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estilo
                </label>
                <input
                  type="text"
                  id="estilo"
                  name="estilo"
                  value={formData.estilo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="precioSalida"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio de salida
                </label>
                <input
                  type="number"
                  id="precioSalida"
                  name="precioSalida"
                  value={formData.precioSalida}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imagen"
                  className="block text-sm font-medium text-gray-700"
                >
                  Imagen de la obra
                </label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-serif text-gray-800 text-center mb-8">
        Obras de la Exposición
      </h2>

      <div className="grid grid-cols-3 gap-[60px] mt-5">
        {obras.map((obra, i) => (
          <div
            key={obra.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={
                obra.imagenUrl || `https://picsum.photos/536/354?random=${i}`
              }
              alt="imagen"
            />
            <div className="p-4">
              <h3 className="font-serif text-xl text-gray-800 mb-2">
                {obra.titulo}
              </h3>
              <p className="text-gray-700 text-sm">Estilo: {obra.estilo}</p>
              <p className="text-gray-700 text-sm">
                Precio de salida: ${obra.precioSalida}
              </p>
              {obra.propietario === user.id && (
                <button
                  onClick={() => handleDelete(obra.id)}
                  className="mt-2 bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 w-full"
                >
                  Eliminar obra
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
