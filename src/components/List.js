import Item from "./Item";

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
      {/* {list.map(({ objectID, ...item }) => (
        <Item key={objectID} {...item} onRemoveItem={handleRemoveStory} />
      ))} */}
    </ul>
  );
};

export default List;
