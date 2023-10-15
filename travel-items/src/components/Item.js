export default function Item({ item, HandleDelete, HandleToggle }) {
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
