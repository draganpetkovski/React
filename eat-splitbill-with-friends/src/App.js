import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [items, setItems] = useState(initialFriends);
  const [open, setOpen] = useState(null);
  const [selection, setSelection] = useState(11);

  function whoPays(value) {
    setSelection(value);
    console.log(selection);
  }

  function HandleBalance(id, value) {
    if (selection === 11) {
      setItems((items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, balance: item.balance + value }
            : { ...item }
        )
      );
    } else {
      setItems((items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, balance: item.balance - value }
            : { ...item }
        )
      );
    }
  }

  function HandleSelect(item) {
    setOpen(item);
    console.log(open);
  }

  function HandleAdd(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="main-cont">
      <ItemsList
        items={items}
        HandleSelect={HandleSelect}
        HandleAdd={HandleAdd}
      />
      {open && (
        <Bill
          item={open}
          HandleBalance={HandleBalance}
          whoPays={whoPays}
          selection={selection}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

function ItemsList({ items, HandleSelect, HandleAdd }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <Item item={item} key={item.id} HandleSelect={HandleSelect} />
      ))}
      <AddForm HandleAdd={HandleAdd} />
    </ul>
  );
}

function Item({ item, HandleSelect }) {
  return (
    <li className="item-continer" key={item.id}>
      <div className="avatar">
        <img src={item.image} alt={item.id} />
      </div>
      <div className="content">
        <span>{item.name}</span>
        {item.balance === 0 && <span>You and {item.name} are even</span>}
        {item.balance < 0 && (
          <span style={{ color: "red" }}>
            You owe {item.name} {Math.abs(item.balance)}$
          </span>
        )}
        {item.balance > 0 && (
          <span style={{ color: "green" }}>
            {item.name} owes you {Math.abs(item.balance)}$
          </span>
        )}
      </div>

      <button className="select-btn" onClick={() => HandleSelect(item)}>
        Select
      </button>
    </li>
  );
}

function Bill({ item, HandleBalance, whoPays, selection, setOpen }) {
  const [billValue, setBillValue] = useState("");
  const [you, setYou] = useState("");
  let friend = Math.abs(you - billValue);

  function HandleSubmit(e) {
    e.preventDefault();
    HandleBalance(item.id, friend);
    setOpen(null);
  }

  return (
    <div className="bill">
      <form onSubmit={HandleSubmit}>
        <h3>Split a bill with {item.name}</h3>
        <div className="bill-item">
          <label htmlFor="1">💰 Bill value</label>
          <input
            type="text"
            id="1"
            value={billValue}
            onChange={(e) => setBillValue(Number(e.target.value))}
          />
        </div>
        <div className="bill-item">
          <label htmlFor="2">🧍‍♀️ Your expense</label>
          <input
            type="text"
            id="2"
            value={you}
            onChange={(e) => setYou(Number(e.target.value))}
          />
        </div>
        <div className="bill-item">
          <label htmlFor="3">👫 {item.name}'s expense</label>
          <input type="text" id="3" value={friend === 0 ? " " : friend} />
        </div>
        <div className="bill-item">
          <label htmlFor="4">🤑 Who is paying the bill</label>
          <select
            id="4"
            value={selection}
            onChange={(e) => whoPays(e.target.value)}
          >
            <option value={11}>You</option>
            <option value={item.id}>{item.name}</option>
          </select>
        </div>
        <div className="buttons-2">
          <button className="close" onClick={HandleSubmit}>
            Split
          </button>
          <button className="close" onClick={() => setOpen(null)}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

function AddForm({ HandleAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [openBtn, setOpenBtn] = useState(1);

  function HandleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const user = { name, image, id: Date.now(), balance: 0 };
    HandleAdd(user);
    console.log(user);
    setName("");
  }

  return (
    <div>
      {openBtn === 2 && (
        <div>
          <form onSubmit={HandleSubmit}>
            <div className="form">
              <div className="form-item">
                <label htmlFor="friend-name">👫 Friend name</label>
                <input
                  type="text"
                  id="friend-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="prof-avatar">🌄 Image URL</label>
                <input
                  type="text"
                  id="prof-avatar"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>
            <button className="add" onClick={() => setOpenBtn(2)}>
              Add
            </button>
            <button className="close" onClick={() => setOpenBtn(1)}>
              Close
            </button>
          </form>
        </div>
      )}
      {openBtn === 1 && (
        <div>
          <button
            className="item-continer select-btn add-btn"
            onClick={() => setOpenBtn(2)}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
