import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CampaignNav from "../CampaignNav/CampaignNav";
import { Outlet, useParams } from "react-router-dom";
import Campaign from "../../../../services/campaign.service";
import "./CampaignPage.css";

function CampaignPage() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    fetchCampaign();

    return () => {
      fetchCampaign();
    };
  }, []);

  const fetchCampaign = async () => {
    try {
      const _campaign = await Campaign.getCampaign(id);
      setCampaign(_campaign);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <ReactQuill
    //   value={editorValue}
    //   onChange={(value) => setEditorValue(value)}
    //   modules={{
    //     toolbar: [
    //       [{ header: [1, 2, false] }],
    //       ["bold", "italic", "underline"],
    //       ["image", "code-block"],
    //     ],
    //   }}
    //   theme="snow"
    // />
    <section className="campaign container">
      <CampaignNav campaign={campaign} />
      <Outlet className="campaign-outlet" />
    </section>
  );
}

export default CampaignPage;
