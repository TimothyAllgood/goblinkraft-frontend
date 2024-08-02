import React from "react";
import "./NPC.css";
import {
  stringToColor,
  stringToGradient,
} from "../../../../util/stringToColor";
import Stat from "../../../../util/stat.util";
import Tooltip from "../../../../components/Tooltip/Tooltip";

function NPC({ npc }) {
  console.log({ npc });
  return (
    <div className="npc">
      <div className="npc-header">
        <div className="npc-name">
          <h2>{npc.name}</h2>
        </div>
        <div className="npc-race">
          <h3>
            {npc.race} {npc.job}
          </h3>
        </div>
      </div>
      <div
        className="npc-image"
        style={{ background: stringToGradient(npc.name + npc.job) }}
      ></div>
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
      <div className="npc-info">
        <div className="description detail">
          <p>{npc.description}</p>
        </div>
        <div className="trait activity">
          <h3 className="bold">Current Activity: </h3>
          <div className="trait-info">
            <p> {npc.activity.name} </p>
            <Tooltip text={npc.activity.info} />
          </div>
        </div>
        <div className="trait quirk">
          <h3>Quirk: </h3>
          <div className="trait-info">
            <p> {npc.attribute.name} </p>
            <Tooltip text={npc.attribute.info} />
          </div>
          {/* <Tooltip content={npc.quirk.info} /> */}
          {/* <Tooltip
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
          </Tooltip> */}
        </div>
        <div className="trait plot-hook">
          <h3>Plot Hook: </h3>
          <p> {npc.hook.description} </p>
        </div>
      </div>
    </div>
  );
}

export default NPC;
