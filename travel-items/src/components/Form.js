import { useState } from "react";

export default function Form({ HandleAdd, item }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function HandleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    let newItem = { quantity, description, id: Date.now(), packaged: false };

    console.log(newItem);
    HandleAdd(newItem);
    console.log(item);
    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="form" onSubmit={HandleSubmit}>
      <span style={{ fontSize: "2rem" }}>
        What do you need for your trip ⛱ ?
      </span>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((curr) => (
          <option value={curr} key={curr}>
            {curr}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="... add new item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}
