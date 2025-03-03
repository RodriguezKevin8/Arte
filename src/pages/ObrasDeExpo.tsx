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
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

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
    <div className="w-full px-[100px] py-6 relative bg-gray-200 min-h-[92vh]">
      {/* Modal para Agregar Obra */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transform scale-95 animate-scaleIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Agregar Obra</h2>
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
                  Título
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Estilo
                </label>
                <input
                  type="text"
                  name="estilo"
                  value={formData.estilo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Precio de salida
                </label>
                <input
                  type="number"
                  name="precioSalida"
                  value={formData.precioSalida}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Imagen de la obra
                </label>
                <input
                  type="file"
                  name="imagen"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 text-lg font-medium shadow-md"
                >
                  <AiOutlineCheck className="mr-2 text-xl" /> Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="py-12">
        <header className="flex w-full items-center">
          {user.id !== 0 && (
            <div className="w-auto flex justify-center py-2">
              <button
                onClick={openModal}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-md"
              >
                Agregar tu obra de arte
              </button>
            </div>
          )}
          <h2 className="w-[75%] text-3xl font-serif text-gray-800 text-center mb-8">
            Obras de la Exposición
          </h2>
        </header>

        <div className="grid grid-cols-3 gap-[60px] mt-5">
          {obras.length > 0 ? (
            obras.map((obra, i) => (
              <div
                key={obra.id}
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col"
              >
                <img
                  src={
                    obra.imagenUrl ||
                    `https://picsum.photos/536/354?random=${i}`
                  }
                  alt="imagen de obra"
                />
                <div className="p-2 flex flex-col flex-grow">
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
                      className="mt-auto bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 w-full"
                    >
                      Eliminar obra
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-10 p-8 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700">
                No hay obras disponibles
              </h3>
              <p className="text-gray-600 text-center mt-2">
                Actualmente no hay obras disponibles. ¡Vuelve más tarde para
                descubrir nuevas obras!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
