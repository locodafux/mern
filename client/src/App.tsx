import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
  }

  return (
    <div className="App">
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // TODO: save what they typed
            setTitle(e.target.value)
          }
          id="deck-title"
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
