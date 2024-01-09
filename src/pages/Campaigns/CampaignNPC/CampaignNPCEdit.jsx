import React, { useEffect, useState } from "react";
import Campaign from "../../../services/campaign.service";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./CampaignNPCEdit.css";
import ReactQuill from "react-quill";
import { Label } from "@mui/icons-material";

function CampaignNPCEdit() {
  const { id, npcId } = useParams();
  const navigate = useNavigate();

  const [npc, setNpc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNpc();
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const fetchNpc = async () => {
    try {
      setLoading(true);
      if (npcId !== "new") {
        const _npc = await Campaign.getNPC(npcId);
        console.log(_npc);
        setNpc(_npc);
      }

      if (npcId === "new") {
        setNpc({ campaignId: id });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };
  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setNpc((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileUpdate = async (e) => {
    // setUpdating(true);
    const fd = new FormData();
    fd.set("npcId", npc.id);
    fd.set("img", e.target.files[0]);
    try {
      let data = await Campaign.updateNPCImage(fd);
      if (data) {
        setNpc(data);
        // setUpdating(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (npcId !== "new") {
        let res = await Campaign.upsertNPC(npcId, npc);
        console.log(res);
        setNpc(res);
      }
      if (npcId === "new") {
        console.log(npc);
        let res = await Campaign.upsertNPC(null, npc);
        setNpc(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navBack = () => {
    navigate(-1);
  };

  if (loading) return <>Loading</>;

  return (
    <div className="npc-form-page campaign-container">
      <Button
        variant="contained"
        sx={{ width: "fit-content" }}
        onClick={navBack}
      >
        Back
      </Button>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="npc-inputs">
          <div className="form-group">
            <TextField
              id="name"
              name="name"
              label="NPC Name"
              defaultValue={npc?.name}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <TextField
              id="job"
              name="job"
              label="Job"
              defaultValue={npc?.job}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
          <FormControl className="form-group">
            <InputLabel id="alignment-label">Alignment</InputLabel>
            <Select
              labelId="alignment-label"
              id="alignment"
              name="alignment"
              defaultValue={npc?.alignment || "Lawful Good"}
              label="Alignment"
              onChange={handleChange}
            >
              <MenuItem value={"Lawful Good"}>Lawful Good</MenuItem>
              <MenuItem value={"Neutral Good"}>Neutral Good</MenuItem>
              <MenuItem value={"Chaotic Good"}>Chaotic Good</MenuItem>
              <MenuItem value={"Lawful Neutral"}>Lawful Neutral</MenuItem>
              <MenuItem value={"Neutral"}>Neutral</MenuItem>
              <MenuItem value={"Chaotic Neutral"}>Chaotic Neutral</MenuItem>
              <MenuItem value={"Lawful Evil"}>Lawful Evil</MenuItem>
              <MenuItem value={"Neutral Evil"}>Neutral Evil</MenuItem>
              <MenuItem value={"Chaotic Evil"}>Chaotic Evil</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="npc-inputs">
          <div className="form-group">
            <TextField
              id="honorific"
              name="honorific"
              label="Honorific"
              helperText="e.g. King of the World"
              defaultValue={npc?.honorific}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <TextField
              id="title"
              name="title"
              label="Nickname"
              helperText="e.g. The Bastard"
              defaultValue={npc?.title}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
          <FormControl className="form-group">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              defaultValue={npc?.type || "Ally"}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={"Ally"}>Ally</MenuItem>
              <MenuItem value={"Enemy"}>Enemy</MenuItem>
              <MenuItem value={"Generic"}>Generic</MenuItem>
              <MenuItem value={"Neutral"}>Neutral</MenuItem>
              <MenuItem value={"Protagonist"}>Protagonist</MenuItem>
              <MenuItem value={"Diety"}>Diety</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="rich-editor">
          <label>Bio</label>
          <ReactQuill
            defaultValue={npc?.bio}
            onChange={(value) =>
              setNpc((prevFormData) => ({
                ...prevFormData,
                bio: value,
              }))
            }
            id="bio"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["image", "code-block"],
              ],
            }}
            theme="snow"
          />
        </div>
        <div className="rich-editor">
          <label>Secrets</label>
          <ReactQuill
            defaultValue={npc?.secrets}
            onChange={(value) =>
              setNpc((prevFormData) => ({
                ...prevFormData,
                secrets: value,
              }))
            }
            id="secrets"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["image", "code-block"],
              ],
            }}
            theme="snow"
          />
        </div>
        {npc && npc.id >= 0 && (
          <Button
            component="label"
            variant="contained"
            sx={{ width: "fit-content" }}
            startIcon={<CloudUploadIcon />}
          >
            Upload NPC Image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleFileUpdate(e)}
            />
          </Button>
        )}

        {npc && npc.image && (
          <Box
            height={1}
            width={0.25}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              aspectRatio: 1,
              backgroundColor: "primary.main",
              backgroundImage: `url(
                    ${
                      npc.image
                        ? npc.image.url.replace(
                            "/upload",
                            "/upload/f_webp,fl_awebp,q_auto"
                          )
                        : ""
                    }
                  )`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          ></Box>
        )}

        <Button variant="contained" sx={{ width: "fit-content" }} type="submit">
          {npcId === "new" ? "Create" : "Update"} NPC
        </Button>
      </form>
    </div>
  );
}

export default CampaignNPCEdit;
