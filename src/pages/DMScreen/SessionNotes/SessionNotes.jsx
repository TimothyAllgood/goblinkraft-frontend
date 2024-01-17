import React, { useEffect, useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import Campaign from "../../../services/campaign.service";
import ReactQuill from "react-quill";
import "./SessionNotes.css";

function SessionNotes() {
  const id = useSelector((state) => state.user.id);

  const [campaigns, setCampaigns] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    campaignId: null,
    notes: "",
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    if (id) {
      try {
        const campaigns = await Campaign.getCampaigns(id);
        setCampaigns(campaigns);
        setAuthorized(true);
      } catch (error) {
        if (error.response?.status === 401) {
          setAuthorized(false);
          await dispatch(logout());
          await removeItem("token");
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="session-notes">
      {authorized && (
        <Autocomplete
          disablePortal
          id="campaign-autocomplete"
          options={campaigns}
          sx={{ width: 1 }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Campaign" />}
          onChange={(e, value) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              campaignId: value?.id || null,
            }));
          }}
        />
      )}

      <ReactQuill
        onChange={(value) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            notes: value,
          }))
        }
        id="notes"
        modules={{
          toolbar: [
            [{ header: [false, 1, 2, 3, 4, 5, 6] }],
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
        style={{
          height: id
            ? "calc((100vh + 7rem) - 35rem)"
            : "calc((100vh + 7rem) - 27rem)",
        }}
        theme="snow"
      />
      {authorized && (
        <Button
          sx={{ width: "10rem", mt: "1rem" }}
          disabled={!formData.campaignId || !formData.notes.length > 0}
          variant="contained"
        >
          Save
        </Button>
      )}
    </div>
  );
}

export default SessionNotes;
