import React from "react";
import { useParams } from "react-router-dom";

function CampaignFaction() {
  const { id } = useParams();

  return <div>{id}</div>;
}

export default CampaignFaction;
