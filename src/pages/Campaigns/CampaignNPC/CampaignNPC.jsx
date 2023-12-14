import React from "react";
import { useParams } from "react-router-dom";

function CampaignNPC() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default CampaignNPC;
