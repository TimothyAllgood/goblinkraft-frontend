import "./Divider.css";

function Divider({ color }) {
  return (
    <span
      className="divider"
      style={{ backgroundColor: color ? color : "var(--divider-color)" }}
    ></span>
  );
}

export default Divider;
