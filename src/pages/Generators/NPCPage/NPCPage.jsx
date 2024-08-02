import React, { useEffect, useState } from "react";
import "./NPCPage.css";
import Npc from "../../../services/generator/npc.service";
import NPC from "./NPC/NPC";
import Button from "../../../components/Button/Button";

function NPCPage() {
  const [npcs, setNpcs] = useState([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchNpcs();
    console.log(npcs);
  }, []);

  const fetchNpcs = async () => {
    try {
      setGenerating(true);
      let res = await Npc.generateNpcs();
      setNpcs(res.npcs);
      setGenerating(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="npc-page container">
      <div className="npc-page-header">
        <div className="npc-buttons">
          <Button onClick={fetchNpcs} disabled={generating}>
            {generating ? "Generating..." : "Roll New NPCs"}
          </Button>
        </div>
      </div>
      <div className="npc-container">
        {npcs.map((npc) => (
          <NPC key={npc.id} npc={npc} />
        ))}
      </div>
    </section>
  );
}

export default NPCPage;
