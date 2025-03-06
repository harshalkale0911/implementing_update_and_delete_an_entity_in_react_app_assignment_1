import { useEffect, useState } from "react";
import UpdateItem from "./components/UpdateItem";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);

  // Fetch the existing item when App mounts
  useEffect(() => {
    fetch(`${API_URI}/1`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("Error fetching item:", error));
  }, []);

  return <UpdateItem item={item} />;
}

export default App;