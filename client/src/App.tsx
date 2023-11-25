import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();

    const deck = await createDeck(title);
    setDecks([...decks, deck]);

    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            <button onClick={() => handleDeleteDeck(deck._id)}>x</button>
          </li>
        ))}
      </ul>
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
