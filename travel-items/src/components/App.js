import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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
