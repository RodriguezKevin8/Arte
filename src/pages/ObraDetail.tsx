import { useState, useEffect } from "react";
import { getObraDetail } from "../api/ObraApi";
import { getOfferts } from "../api/ObraApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ObraDeArteDetalladaType, OfertaType } from "../types";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import AddSubastamodal from "../components/modals/AddSubastamodal";

const ObraAuctionDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerts, setOfferts] = useState<OfertaType[]>([]); // Array de ofertas para la subasta
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [obra, setObra] = useState<ObraDeArteDetalladaType | null>(null);
  const { id } = useParams();

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
  }, [id]);

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
            <button
              onClick={openModal}
              className="bg-gray-600 flex gap-4  text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Participar en Subasta <FaMoneyBillTrendUp size={20} />
            </button>
            {offerts.length > 0 ? (
              <>
                <h2 className="text-center text-2xl font-bold p-3">
                  Ofertas de la obra
                </h2>
                <table className=" border-2">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Monto</th>
                      <th>Fecha en que se hizo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offerts.map((offert) => (
                      <tr key={offert.usuario}>
                        <td>{offert.usuario}</td>
                        <td>{offert.monto}</td>
                        <td>{offert.fechaOferta}</td>
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
