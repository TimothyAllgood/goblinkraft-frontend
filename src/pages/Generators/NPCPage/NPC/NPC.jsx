import React from "react";
import "./NPC.css";

import Stat from "../../../../util/stat.util";
import Tooltip from "../../../../components/Tooltip/Tooltip";

function NPC({ npc, disableActivity = false, hideImage = false }) {
  // const [generating, setGenerating] = useState(false);
  // const [art, setArt] = useState();
  // const [quest, setQuest] = useState();
  // const [generatingQuest, setGeneratingQuest] = useState(false);

  // const fetchArt = async () => {
  //   try {
  //     setGenerating(true);
  //     setOtherNpcsGenerating(true);
  //     let res = await Npc.generateArt(npc);
  //     setArt(res.art);
  //     setGenerating(false);
  //     setOtherNpcsGenerating(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchQuest = async () => {
  //   try {
  //     setGeneratingQuest(true);
  //     setOtherNpcsGenerating(true);
  //     let res = await Npc.generateQuest(npc);
  //     setQuest(res.adventure);
  //     setSelectedQuest(res.adventure);
  //     setGeneratingQuest(false);
  //     setOtherNpcsGenerating(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="single-npc-container">
      <div className="npc">
        <div className="npc-header">
          <div className="npc-name-job">
            <div className="npc-name">
              <h2>{npc.name}</h2>
            </div>
            <div className="npc-race">
              <h3>
                {npc.race} {npc.job}
              </h3>
            </div>
          </div>
          {/* {!hideImage && (
            <div
              className="npc-image"
              style={{ background: "var(--card-header-background)" }}
            >
              {generating ? (
                <div className="generating"></div>
              ) : (
                art && <img src={art} alt="" />
              )}
            </div>
          )} */}
        </div>

        <div className={`npc-details card-bg ${hideImage ? "no-image" : ""}`}>
          <div className="stats ">
            {npc.stats.map((stat, i) => {
              return (
                <div className="stat" key={i}>
                  <p className="stat-name">
                    {Stat.getStatAbbreviation(stat.name)}
                  </p>
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
          <div className="vertical-divider"></div>
          <div className="npc-info">
            <div className="npc-description detail">
              <p className="large-p">{npc.description}</p>
            </div>

            {!disableActivity && (
              <div className="trait activity">
                <h3 className="bold">Current Activity: </h3>
                <div className="trait-info">
                  <p> {npc.activity.name} </p>
                  <Tooltip text={npc.activity.info} />
                </div>
              </div>
            )}
            <div className="trait quirk">
              <h3>Quirk: </h3>
              <div className="trait-info">
                <p> {npc.attribute.name} </p>
                <Tooltip text={npc.attribute.info} />
              </div>
            </div>
            <div className="trait plot-hook">
              <h3>Plot Hook: </h3>
              <p> {npc.hook.description} </p>
            </div>
          </div>
        </div>
      </div>
      {/* {!hideButtons && (
        <div className="npc-buttons">
          <Button
            variant="dark"
            onClick={fetchArt}
            disabled={generating || otherNpcsGenerating}
          >
            {generating ? "Generating..." : "Generate Art"}
          </Button>
          <Button
            variant="dark"
            onClick={fetchQuest}
            disabled={generatingQuest || otherNpcsGenerating}
          >
            {generatingQuest ? "Generating..." : "Generate Quest"}
          </Button>
          {quest && (
            <Button variant="dark" onClick={() => setSelectedQuest(quest)}>
              View Quest
            </Button>
          )}
        </div>
      )} */}
    </div>
  );
}

export default NPC;
