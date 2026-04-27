import { useEffect, useState } from "react";
import { getAllLoadouts } from "../services/loadoutAPI";
import AddLoadoutModal from "../components/AddLoadoutModal";
import AddItemToLoadoutModal from "../components/AddItemToLoadoutModal";

function UniversalLoadouts() {
  const [loadouts, setLoadouts] = useState([]);
  const [selectedLoadout, setSelectedLoadout] = useState(null);
  const [showLoadoutModal, setShowLoadoutModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLoadouts = async () => {
    try {
      setLoading(true);
      const data = await getAllLoadouts();
      setLoadouts(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoadouts();
  }, []);

  return (
    <main className="page">
      <div className="page-header">
        <h1>Universal Loadouts</h1>
        <button onClick={() => setShowLoadoutModal(true)}>Add Loadout</button>
      </div>

      {loading && <p>Loading loadouts...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && loadouts.length === 0 && (
        <p>No loadouts yet. Create your first one.</p>
      )}

      <div className="loadout-grid">
        {loadouts.map((loadout) => (
          <div key={loadout.loadout_id} className="loadout-card">
            <h2>{loadout.name}</h2>
            <p>{loadout.description}</p>
            <button
              onClick={() => {
                setSelectedLoadout(loadout);
                setShowAddItemModal(true);
              }}
            >
              Add Item
            </button>
          </div>
        ))}
      </div>

      <AddLoadoutModal
        isOpen={showLoadoutModal}
        onClose={() => setShowLoadoutModal(false)}
        onLoadoutCreated={fetchLoadouts}
      />

      <AddItemToLoadoutModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        loadout={selectedLoadout}
      />
    </main>
  );
}

export default UniversalLoadouts;