import { useState, useEffect } from "react";
import {
  changeOwner,
  createPayment,
  deleteOffert,
  getObraDetail,
} from "../api/ObraApi";
import { getOfferts } from "../api/ObraApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ObraDeArteDetalladaType, OfertariosType } from "../types";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import AddSubastamodal from "../components/modals/AddSubastamodal";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ObraAuctionDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerts, setOfferts] = useState<OfertariosType[]>([]); // Array de ofertas para la subasta
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [obra, setObra] = useState<ObraDeArteDetalladaType | null>(null);
  const { id } = useParams();
  const { user } = useGlobalContext();
  const hasUserOffer = offerts.some((offer) => offer.usuarioId === user.id);
  const [refresh, setRefresh] = useState(0);

  const handleDeleteOffer = async (id: number) => {
    try {
      await deleteOffert(id);
      setRefresh((prev) => prev + 1);
      toast.success("Oferta eliminada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al eliminar tu oferta :(");
    }
  };
  const handleAcceptOffer = async (offert: OfertariosType) => {
    const paymentData = {
      estado: "Comprado",
      fechaPago: new Date().toLocaleString(),
      monto: offert.monto,
      usuario: offert.usuarioId,
    };

    try {
      await Promise.all([
        createPayment(paymentData),
        changeOwner({ obraID: +id!, propietarioId: offert.usuarioId }),
      ]);
      toast.success("Oferta aceptada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al aceptar la oferta");
    }
  };
  useEffect(() => {
    const getObraData = async () => {
      try {
        if (!id) {
          toast.error("ID de obra no válido");
          return;
        }

        const result = await getObraDetail(id);
        if (result) {
          setObra(result);
        } else {
          toast.error("Obra no encontrada");
        }
      } catch (error) {
        console.error("Error al obtener la obra", error);
        toast.error("Hubo un error al cargar la obra.");
      }
    };
    const getOffertsFromApi = async () => {
      try {
        if (!id) {
          toast.error("ID de obra no válido");
          return;
        }

        const result = await getOfferts(+id);
        if (result) {
          setOfferts(result);
        } else {
          toast.error("Obra no encontrada");
        }
      } catch (error) {
        console.error("Error al obtener las ofertas de la obra", error);
        toast.error("Hubo un error al cargar las ofertas de la obra.");
      }
    };

    getObraData();
    getOffertsFromApi();
  }, [id, refresh]);

  if (!obra) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
        <p className="text-gray-700 text-lg">No se encontró la obra.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 p-6">
      {isModalOpen && (
        <AddSubastamodal
          closeModal={closeModal}
          precioSalida={obra.precioSalida}
          setRefresh={setRefresh}
        />
      )}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Imagen destacada de la obra */}
        <img
          src={obra.imagenUrl}
          alt={obra.titulo}
          className="w-full h-96 object-cover"
        />
        <article className="p-8">
          {/* Título y descripción */}
          <h1 className="text-4xl font-serif text-gray-800 mb-4">
            {obra.titulo}
          </h1>
          <p className="text-gray-600 mb-6">{obra.estilo}</p>
          {/* Datos adicionales */}
          <div className="flex flex-col sm:flex-row sm:justify-between text-gray-700 mb-6">
            <p>
              <span className="font-bold">Artista:</span> {obra.artistaNombre}
            </p>
            <p>
              <span className="font-bold">Fecha de Creación:</span>{" "}
              {new Date(obra.fechaCreacion).toLocaleDateString()}
            </p>
            <p>
              <span className="font-bold">Precio de Salida:</span> $
              {obra.precioSalida}
            </p>
          </div>
          {/* Sección de subasta */}
          <section className="border-t pt-6">
            {user.id !== obra.artistaId ? (
              hasUserOffer ? (
                <p className="text-green-600 font-semibold">
                  Ya hiciste una oferta en esta obra, pero si quieres cambiarla,
                  elimínala y haz una nueva.
                </p>
              ) : (
                <button
                  onClick={openModal}
                  className="bg-gray-600 flex gap-4 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Participar en Subasta <FaMoneyBillTrendUp size={20} />
                </button>
              )
            ) : (
              <p className="text-xl">Elige una de las propuestas a tu obra</p>
            )}

            {offerts.length > 0 ? (
              <>
                <h2 className="text-center text-2xl font-bold p-3">
                  Ofertas de la obra
                </h2>
                <table className="w-full mt-4 border-collapse shadow-md rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700 text-white text-left">
                      <th className="px-6 py-3">Nombre</th>
                      <th className="px-6 py-3">Monto</th>
                      <th className="px-6 py-3">Fecha de Oferta</th>
                      <th className="px-6 py-3">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {offerts.map((offert, index) => (
                      <tr
                        key={offert.usuarioNombre}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } hover:bg-gray-300 transition-colors`}
                      >
                        <td className="px-6 py-4">{offert.usuarioNombre}</td>
                        <td className="px-6 py-4 font-bold text-green-600">
                          ${offert.monto.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(offert.fechaOferta).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {user.id === obra.artistaId ? (
                            // El dueño de la obra puede aceptar propuestas
                            <button
                              onClick={() => handleAcceptOffer(offert)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Aceptar propuesta
                            </button>
                          ) : user.id === offert.usuarioId ? (
                            // Si el usuario hizo esta oferta, puede eliminarla
                            <button
                              onClick={() => handleDeleteOffer(offert.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Eliminar mi oferta
                            </button>
                          ) : (
                            <p>No hay acciones</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>No hay ofertas... aún</p>
            )}
          </section>
        </article>
      </div>
    </main>
  );
};

export default ObraAuctionDetail;
