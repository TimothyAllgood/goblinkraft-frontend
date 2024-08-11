import "./Divider.css";

function Divider({ color, orientation, position = "relative" }) {
  return (
    <span
      className={`divider ${orientation}`}
      style={{
        backgroundColor: color ? color : "var(--divider-color)",
        position: position,
        right: position === "absolute" ? "-1rem" : "0",
      }}
    ></span>
  );
}

export default Divider;
