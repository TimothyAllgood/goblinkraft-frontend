import React, { useEffect, useState } from "react";
import "./NPCList.css";
import NPC from "./NPC/NPC";
import Npc from "../../../services/npc.service";

function NPCList() {
  const [npcs, setNpcs] = useState([]);

  useEffect(() => {
    fetchNpcs();
  }, []);

  const fetchNpcs = async () => {
    let res = await Npc.generateNpcs();
    setNpcs(res.npcs);
  };

  return (
    <section className="npc-list">
      {npcs.map((npc, i) => {
        return <NPC key={i} npc={npc} />;
      })}
    </section>
  );
}

export default NPCList;
