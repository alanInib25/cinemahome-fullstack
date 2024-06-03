function SortByOptions({ item }) {
  return (
    <option key={item.id} value={item.value}>
      {item.name}
    </option>
  );
}

export default SortByOptions;
