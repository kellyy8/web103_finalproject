import { useEffect, useState } from "react";
import { getAllItems } from "../services/itemAPI";
import { addItemToLoadout } from "../services/loadoutAPI";
import "../css/AddItemModal.css";

function AddItemToLoadoutModal({ isOpen, onClose, loadout }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
        setError("");
      } catch (err) {
        setError(err.message);
      }
    };

    fetchItems();
  }, [isOpen]);

  if (!isOpen || !loadout) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addItemToLoadout(loadout.loadout_id, selectedItem);
      setSelectedItem("");
      setError("");
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Item to {loadout.name}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            required
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.item_id} value={item.item_id}>
                {item.name} - {item.type}
              </option>
            ))}
          </select>
          <div className="modal-buttons">
            <button type="submit">Add Item</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemToLoadoutModal;