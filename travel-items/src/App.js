import { useState } from "react";
import "./App.css";

export default function App() {
  const [item, setItem] = useState([]);

  function HandleAdd(newItem) {
    setItem((item) => [...item, newItem]);
  }

  function HandleDelete(id) {
    setItem(item.filter((el) => el.id !== id));
  }

  function HandleToggle(id) {
    setItem(
      item.map((item) =>
        item.id === id ? { ...item, packaged: !item.packaged } : { ...item }
      )
    );
  }

  return (
    <div className="App">
      <Header />
      <Form HandleAdd={HandleAdd} item={item} />
      <PackingList
        item={item}
        HandleDelete={HandleDelete}
        HandleToggle={HandleToggle}
        setItem={setItem}
      />
      <Stats item={item} />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <img src="headerpic.png" alt="header" className="photos" />
      <h1>🌴 Pack items for your travel 💼</h1>
      <img src="on-beach.jpg" alt="second" className="photos" />
    </header>
  );
}

function Form({ HandleAdd, item }) {
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

function PackingList({ item, HandleDelete, HandleToggle, setItem }) {
  const [sort, setSort] = useState("input");
  let sorted;
  if (sort === "input") sorted = item;
  if (sort === "description")
    sorted = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sort === "packed")
    sorted = item
      .slice()
      .sort((a, b) => Number(a.packaged) - Number(b.packaged));

  function clearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all items"
    );
    if (confirmed) setItem([]);
  }

  return (
    <div>
      <div className="PackingList">
        {sorted.map((item) => (
          <Item
            item={item}
            HandleDelete={HandleDelete}
            HandleToggle={HandleToggle}
          />
        ))}
      </div>

      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, HandleDelete, HandleToggle }) {
  return (
    <div className="item">
      <input
        type="checkbox"
        className="checkbox"
        value={item.packaged}
        onChange={() => HandleToggle(item.id)}
      />
      <span style={item.packaged ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button className="remove-btn" onClick={() => HandleDelete(item.id)}>
        ❌
      </button>
    </div>
  );
}

function Stats({ item }) {
  const total = item.length;
  const packed = item.filter((curr) => curr.packaged).length;
  const percentage = Math.round((packed / total) * 100);

  if (!item.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    );

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ! Ready to go ✈"
          : `💼 You have packed ${packed} items on your list, and you already packed
        ${percentage} %`}
      </em>
    </footer>
  );
}
