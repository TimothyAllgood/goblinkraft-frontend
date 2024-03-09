import React, { useEffect, useState } from "react";
import Campaign from "../../../services/campaign.service";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import "./CampaignNPCEdit.css";
import ReactQuill from "react-quill";
import CloseIcon from "@mui/icons-material/Close";

function CampaignNPCEdit() {
  const { id, npcId } = useParams();
  const navigate = useNavigate();

  const [npc, setNpc] = useState(null);
  const [success, setSuccess] = useState(false);
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
        setNpc(res);
        setSuccess(true);
      }
      if (npcId === "new") {
        let res = await Campaign.upsertNPC(null, npc);
        setNpc(res);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
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
              label="Character Name"
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
              <MenuItem value={"Adversary"}>Adversary</MenuItem>
              <MenuItem value={"Neutral"}>Neutral</MenuItem>
              <MenuItem value={"Protagonist"}>Protagonist</MenuItem>
              <MenuItem value={"Generic"}>Generic</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="npc-inputs">
          <div className="form-group">
            <TextField
              id="race"
              name="race"
              label="Character Race"
              defaultValue={npc?.race}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <TextField
              id="age"
              name="age"
              label="Character Age"
              defaultValue={npc?.age}
              variant="outlined"
              sx={{ width: 1 }}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="rich-editor">
          <label>Description</label>
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
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
            theme="snow"
            placeholder="Who is this character? Where did they come from? What drives them? What are their motivations and goals? Describe this character's physical appearance, mannerisms, and quirks. How do they dress? What do they sound like? What are their most noticeable features? What are they afraid of? What regrets do they carry? What makes them feel alive?"
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
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
            theme="snow"
            placeholder="What hidden truths does this character possess? Are they working for a hidden agenda? Do they have a dark past they desperately want to conceal? Are they secretly a villain in disguise? Do they hold knowledge that could rewrite the story?"
          />
        </div>
        {npc && npc.id >= 0 && (
          <Button
            component="label"
            variant="contained"
            sx={{ width: "fit-content" }}
            startIcon={<CloudUploadIcon />}
          >
            Upload Character Image
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
          {npcId === "new" ? "Create" : "Update"} Character
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          message="Character Saved!"
          action={action}
        />
      </form>
    </div>
  );
}

export default CampaignNPCEdit;
