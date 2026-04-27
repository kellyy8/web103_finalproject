const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getAllLoadouts() {
  const response = await fetch(`${BASE_URL}/api/loadouts`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch loadouts");
  }

  return data;
}

export async function createLoadout(loadoutData) {
  const response = await fetch(`${BASE_URL}/api/loadouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loadoutData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create loadout");
  }

  return data;
}

export async function getLoadoutById(loadoutId) {
  const response = await fetch(`${BASE_URL}/api/loadouts/${loadoutId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch loadout");
  }

  return data;
}

export async function addItemToLoadout(loadoutId, itemId) {
  const response = await fetch(`${BASE_URL}/api/loadouts/${loadoutId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item_id: itemId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to add item to loadout");
  }

  return data;
}