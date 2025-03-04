import { useState, useEffect } from "react";
import {
  changeOwner,
  createPayment,
  deleteOffert,
  getObraDetail,
} from "../api/ObraApi";
import { getOfferts } from "../api/ObraApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ObraDeArteDetalladaType, OfertariosType } from "../types";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import AddSubastamodal from "../components/modals/AddSubastamodal";
import { useGlobalContext } from "../hooks/useGlobalContext";

const DetallesVenta: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerts, setOfferts] = useState<OfertariosType[]>([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [obra, setObra] = useState<ObraDeArteDetalladaType | null>(null);
  const { id } = useParams();
  const { user } = useGlobalContext();
  const hasUserOffer = offerts.some((offer) => offer.usuarioId === user.id);
  const [refresh, setRefresh] = useState(0);

  // Agregar el estado para la validación del tiempo
  const [isAuctionClosed, setIsAuctionClosed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0); // Tiempo restante en milisegundos
  const navigate = useNavigate();

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
      navigate("/obras");
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
          // Calcular el tiempo de finalización de la subasta (2 minutos después de la fecha de creación)
          const fechaCreacion = new Date(result.fechaCreacion);
          const fechaLimite = new Date(fechaCreacion.getTime() + 2 * 60 * 1000); // 2 minutos después

          // Comparar el tiempo actual con la fecha límite
          if (new Date() > fechaLimite) {
            setIsAuctionClosed(true); // La subasta ya terminó
          } else {
            // Establecer el tiempo restante
            setTimeRemaining(fechaLimite.getTime() - new Date().getTime());
            // Iniciar un intervalo para actualizar el tiempo restante
            const interval = setInterval(() => {
              setTimeRemaining((prevTime) => {
                const newTime = prevTime - 1000;
                if (newTime <= 0) {
                  clearInterval(interval);
                  setIsAuctionClosed(true); // Finaliza la subasta cuando el tiempo se acaba
                }
                return newTime;
              });
            }, 1000); // Actualizar cada segundo
            return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
          }
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
        <img
          src={obra.imagenUrl}
          alt={obra.titulo}
          className="w-full h-96 object-cover"
        />
        <article className="p-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">
            {obra.titulo}
          </h1>
          <p className="text-gray-600 mb-6">{obra.estilo}</p>
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
        </article>
      </div>
    </main>
  );
};

export default DetallesVenta;
