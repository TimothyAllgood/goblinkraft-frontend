import { Divider } from "@mui/material";
import React from "react";
import "./NPC.css";
import Stat from "../../../../util/stat.util";

function NPC({ npc }) {
  return (
    <div className="npc-card">
      <div className="npc-header">
        <div className="name">
          <h3>{npc.name}</h3>
        </div>
        <div className="details">
          {npc.gender} {npc.race} {npc.job}
        </div>
      </div>
      <Divider />
      <div className="stats">
        {npc.stats.map((stat, i) => {
          return (
            <div className="stat" key={i}>
              <p>{Stat.getStatAbbreviation(stat.name)}</p>
              <div className="modifier">
                <p>{stat.val}</p>
                <p>
                  {Stat.getModifier(stat.val) >= 0 && <>+</>}
                  {Stat.getModifier(stat.val)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="npc-info">
        <div className="ideal detail">
          <p className="bold">Ideal:</p>
          <p>{npc.ideal}</p>
        </div>
        <div className="flaw detail">
          <p className="bold">Flaw:</p>
          <p>{npc.flaw}</p>
        </div>
        <div className="ib detail">
          <p className="bold">Bond:</p>
          <p>{npc.bond}</p>
        </div>
      </div>
    </div>
  );
}

export default NPC;
