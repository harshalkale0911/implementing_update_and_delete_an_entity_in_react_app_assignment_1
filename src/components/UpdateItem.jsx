import { useEffect, useState } from "react";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = () => {
    const [item, setItem] = useState(null);
    const [updatedValue, setUpdatedValue] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`${API_URI}/1`)
            .then((response) => response.json())
            .then((data) => {
                setItem(data);
                setUpdatedValue(data.name || ""); 
            })
            .catch((error) => console.error("Error fetching item:", error));
    }, []);


    const handleChange = (event) => {
        setUpdatedValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URI}/1`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: updatedValue }),
            });

            if (!response.ok) {
                throw new Error("Failed to update item");
            }

            const data = await response.json();
            setItem(data);
            setMessage("Item updated successfully!");
        } catch (error) {
            console.error("Error updating item:", error);
            setMessage("Error updating item");
        }
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#333" }}>Update Item</h2>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>Current Item: {item.name}</p>
            <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
                <input
                    type="text"
                    value={updatedValue}
                    onChange={handleChange}
                    placeholder="Enter new value"
                    style={{
                        padding: "8px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none",
                        marginRight: "10px"
                    }}
                />
                <button 
                    type="submit" 
                    style={{
                        padding: "8px 12px",
                        fontSize: "14px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Update
                </button>
            </form>
            {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        </div>
    );
    
};

export default UpdateItem;