export default function Stats({ item }) {
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
