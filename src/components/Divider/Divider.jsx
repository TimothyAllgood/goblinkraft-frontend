import "./Divider.css";

function Divider({ color, orientation }) {
  return (
    <span
      className={`divider ${orientation}`}
      style={{ backgroundColor: color ? color : "var(--divider-color)" }}
    ></span>
  );
}

export default Divider;
