import React from "react";

function Actions({ actions }) {
  return (
    <div className="action-container">
      {typeof actions !== "string" ? (
        actions.map((action, i) => {
          return (
            <div key={i}>
              <p>
                <span className="bold">{action.bold}</span> {action.regular}
              </p>
            </div>
          );
        })
      ) : (
        <div>
          {" "}
          <p>{actions}</p>
        </div>
      )}
    </div>
  );
}

export default Actions;
