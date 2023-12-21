import { Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import "./NPC.css";
import Stat from "../../../../util/stat.util";
// import Tooltip from "../../../../components/Tooltip/Tooltip";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

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
              <p className="stat-name">{Stat.getStatAbbreviation(stat.name)}</p>
              <div className="value-modifier">
                <p className="value">{stat.val}</p>
                <p className="modifier">
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
        <div className="description detail">{npc.description}</div>
        <div className="trait activity">
          <p className="bold">Current Activity: </p>
          <p> {npc.activity.name} </p>
          <Tooltip
            className="info-tooltip"
            title={
              <>
                <Typography>{npc.activity.info}</Typography>
              </>
            }
            arrow
            enterTouchDelay={100}
          >
            <InfoRoundedIcon color="primary" />
          </Tooltip>
        </div>
        <div className="trait quirk">
          <p className="bold">Quirk: </p>
          <p> {npc.quirk.name} </p>
          {/* <Tooltip content={npc.quirk.info} /> */}
          <Tooltip
            className="info-tooltip"
            title={
              <>
                <Typography>{npc.quirk.info}</Typography>
              </>
            }
            arrow
            enterTouchDelay={100}
          >
            <InfoRoundedIcon color="primary" />
          </Tooltip>
        </div>
        <div className="trait quirk">
          <p className="bold">Plot Hook: </p>
          <p> {npc.hook.description} </p>
        </div>
        {/* <div className="ideal trait">
          <p className="bold">Ideal: </p>
          <p> {npc.ideal}</p>
        </div>
        <div className="flaw trait">
          <p className="bold">Flaw: </p>
          <p> {npc.flaw}</p>
        </div>
        <div className="bond trait">
          <p className="bold">Hook: </p>
          <p> {npc.bond}</p>
        </div> */}
      </div>
    </div>
  );
}

export default NPC;
