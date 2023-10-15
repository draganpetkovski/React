import { useState } from "react";
import Item from "./Item";
export default function PackingList({
  item,
  HandleDelete,
  HandleToggle,
  setItem,
}) {
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
