import { useEffect, useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { TDeck } from "./api/getDecks";
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);

    setText("");
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);

    // setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  return (
    <div className="App">
      <h3 style={{ textAlign: "center" }}>{deck?.title}</h3>
      <ul className="decks">
        {cards.map((card, index) => (
          <li key={index}>
            {card}
            <button onClick={() => handleDeleteCard(index)}>x</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateCard}>
        <label htmlFor="card-text">Card Text</label>
        <input
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // TODO: save what they typed
            setText(e.target.value)
          }
          id="card-text"
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}
