import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  const API_URL = "http://localhost:3000/api/items";

  // Items vom Server holen
  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Neues Item erstellen
  const createItem = async () => {
    if (!newItemName) return;
    try {
      await axios.post(API_URL, { name: newItemName });
      setNewItemName("");
      fetchItems();
    } catch (error) {
      console.error("Fehler beim Erstellen:", error);
    }
  };

  // Item löschen
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Items</h1>

      <input
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Neues Item"
      />
      <button onClick={createItem}>Hinzufügen</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteItem(item.id)}
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
