const Searchbar = (props) => {
  return (
    <div className="search">
      <h2>{props.heading}</h2>
      <input
        type="search"
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Searchbar;
