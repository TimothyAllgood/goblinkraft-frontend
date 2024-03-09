import React, { useEffect, useState } from "react";
import Campaign from "../../../services/campaign.service";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import "./CampaignSettlementEdit.css";
import ReactQuill from "react-quill";
import { DeleteRounded } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

function CampaignSettlementEdit() {
  const { id, settlementId } = useParams();
  const navigate = useNavigate();

  const [settlement, setSettlement] = useState(null);
  const [npcs, setNpcs] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettlement();
  }, []);

  const fetchSettlement = async () => {
    try {
      setLoading(true);
      if (settlementId !== "new") {
        const _settlement = await Campaign.getSettlement(settlementId);
        setSettlement(_settlement);
      }

      if (settlementId === "new") {
        setSettlement({ campaignId: id });
      }
      const _npcs = await Campaign.getNPCs(id);
      setLoading(false);
      setNpcs(_npcs);
    } catch (error) {
      console.error("Error fetching settlement data", error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettlement((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLeaderChange = (e, value) => {
    setSettlement((prevFormData) => ({
      ...prevFormData,
      leader: value,
    }));
  };

  const handleNotableNpcChange = (e, value) => {
    console.log(value);
    setSettlement((prevFormData) => ({
      ...prevFormData,
      notableNpcs: [
        ...prevFormData.notableNpcs.filter((npcId) => npcId !== value), // Remove potential duplicates
        value,
      ],
    }));
  };

  const removeNotableNpc = (npc) => {
    setSettlement((prevSettlement) => ({
      ...prevSettlement,
      notableNpcs: prevSettlement.notableNpcs.filter(
        (notableNpc) => notableNpc.id !== npc.id
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (settlementId !== "new") {
        let res = await Campaign.upsertSettlement(settlementId, settlement);
        setSettlement(res);
        setSuccess(true);
      }
      if (settlementId === "new") {
        let res = await Campaign.upsertSettlement(null, settlement);
        setSettlement(res);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSettlementSize = (population) => {
    switch (true) {
      case population > 50000:
        return "a metropolis";
      case population > 15000:
        return "a city";
      case population > 1000:
        return "a town";
      case population > 50:
        return "a village";
      default:
        return "a hamlet";
    }
  };

  const navBack = () => {
    navigate(-1);
  };

  if (loading) return <>Loading</>;

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setSuccess(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="settlement-form-page campaign-container">
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={navBack}
      >
        Back
      </Button>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="settlement-inputs">
          <div className="form-group">
            <TextField
              id="name"
              name="name"
              label="Settlement Name"
              defaultValue={settlement?.name}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <TextField
              id="population"
              name="population"
              label="Settlement Population"
              defaultValue={settlement?.population}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
              type="number"
              helperText={`Typically ${getSettlementSize(
                settlement?.population
              )}`}
            />
          </div>
        </div>
        <div className="rich-editor">
          <label>Description</label>
          <ReactQuill
            defaultValue={settlement?.description}
            onChange={(value) =>
              setSettlement((prevFormData) => ({
                ...prevFormData,
                description: value,
              }))
            }
            id="description"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["image", "code-block"],
              ],
            }}
            theme="snow"
            placeholder="Descrive the history, culture, and atmosphere of your settlement. Are there any specific landmarks or traditions that define it? Is it a bustling trade hub, a peaceful farming community, or something else entirely? What sights, sounds, and smells would greet a visitor? What makes it unique and memorable? What values and beliefs shape its citizens' lives? What challenges do they face?"
          />
        </div>
        <div className="settlement-inputs">
          <div className="form-group">
            <Autocomplete
              disablePortal
              id="settlement-npc-autocomplete"
              options={npcs}
              sx={{ width: 1 }}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option.id}
              onChange={handleLeaderChange}
              value={settlement?.leader && settlement.leader}
              renderInput={(params) => <TextField {...params} label="Leader" />}
            />
          </div>
          <div className="form-group">
            <TextField
              id="leaderTitle"
              name="leaderTitle"
              label="Leader Title"
              defaultValue={settlement?.leaderTitle}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
              helperText="e.g. Mayor"
            />
          </div>
        </div>
        <div className="form-group">
          <Autocomplete
            disablePortal
            id="settlement-npc-notable-autocomplete"
            options={npcs?.filter(
              (npc) =>
                !settlement.notableNpcs.some(
                  (notableNpc) => notableNpc.id === npc.id
                )
            )}
            sx={{ width: 0.495 }}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            onChange={handleNotableNpcChange}
            renderInput={(params) => (
              <TextField {...params} label="Notable Characters" />
            )}
          />
        </div>
        <div className="notable-npcs">
          {settlement?.notableNpcs?.map((npc) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip
                  className="info-tooltip"
                  title={
                    <>
                      <Typography>
                        {npc.race || "Unknown race"} {npc.job || "and job"}
                      </Typography>
                    </>
                  }
                  arrow
                  enterTouchDelay={100}
                >
                  <p
                    style={{ cursor: "pointer" }}
                    className="notable-npc"
                    onClick={() => {
                      navigate(`/campaign/${id}/characters/${npc.id}`);
                    }}
                  >
                    {npc.name}
                  </p>
                </Tooltip>

                <IconButton
                  sx={{ color: "var(--main)" }}
                  onClick={() => removeNotableNpc(npc)}
                >
                  <DeleteRounded />
                </IconButton>
              </Box>
            );
          })}
        </div>
        <div className="rich-editor">
          <label>Economy</label>
          <ReactQuill
            defaultValue={settlement?.economy}
            onChange={(value) =>
              setSettlement((prevFormData) => ({
                ...prevFormData,
                economy: value,
              }))
            }
            id="economy"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
            theme="snow"
            placeholder="Describe the main industries and trades that drive the settlement's economy. Are there any notable exports or unique resources? How do people make a living?Is the economy thriving, struggling, or somewhere in between? Explain the factors influencing its prosperity (or lack thereof). Who controls the wealth and resources? Are there any monopolies or guilds holding sway? How are social classes defined by economic factors?"
          />
        </div>
        <div className="rich-editor">
          <label>Law & Order</label>
          <ReactQuill
            defaultValue={settlement?.lawAndOrder}
            placeholder="Outline the system of law and order within the settlement. Who upholds the law? Are there any specific regulations or codes of conduct? Is the atmosphere safe and secure, or are there threats from within or without the settlement? Describe the level of crime and how it's handled. How does justice function? Are there formal courts or trials, or is there a more informal system of conflict resolution?"
            onChange={(value) =>
              setSettlement((prevFormData) => ({
                ...prevFormData,
                lawAndOrder: value,
              }))
            }
            id="lawAndOrder"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
            theme="snow"
          />
        </div>
        <Button variant="contained" sx={{ width: "fit-content" }} type="submit">
          {settlementId === "new" ? "Create" : "Update"} Settlement
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          message="Settlement Saved!"
          action={action}
        />
      </form>
    </div>
  );
}

export default CampaignSettlementEdit;
