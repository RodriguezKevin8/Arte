export default function AddExposition() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Agregar Nueva Exposición</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la exposición</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Ej: Obras maestras del Renacimiento"
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
