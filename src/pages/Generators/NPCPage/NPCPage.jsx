import React, { useEffect, useState } from "react";
import "./NPCPage.css";
import Npc from "../../../services/generator/npc.service";
import NPC from "./NPC/NPC";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Markdown from "../../../components/Markdown/Markdown";

function NPCPage() {
  const [npcs, setNpcs] = useState([]);
  const [generating, setGenerating] = useState(true);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [otherNpcsGenerating, setOtherNpcsGenerating] = useState(false);
  useEffect(() => {
    fetchNpcs();
  }, []);

  useEffect(() => {
    if (selectedQuest) {
      setQuestModalOpen(true);
    }
  }, [selectedQuest]);

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
          <Button onClick={fetchNpcs} variant="dark" disabled={generating}>
            {generating ? "Generating..." : "Roll New NPCs"}
          </Button>
        </div>
      </div>
      <div className="npc-container">
        {npcs.map((npc) => (
          <NPC
            key={npc.seed}
            npc={npc}
            setSelectedQuest={setSelectedQuest}
            otherNpcsGenerating={otherNpcsGenerating}
            setOtherNpcsGenerating={setOtherNpcsGenerating}
          />
        ))}
      </div>
      <Modal
        isOpen={questModalOpen}
        onClose={() => {
          setQuestModalOpen(false);
          setSelectedQuest(null);
        }}
      >
        <Markdown content={selectedQuest} />
      </Modal>
    </section>
  );
}

export default NPCPage;
