import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Campaign from "../../../services/campaign.service";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import "./CampaignList.css";
import { DeleteRounded } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { logout } from "../../../state/userSlice";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
};

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

function CampaignList() {
  const id = useSelector((state) => state.user.id);
  const { removeItem } = useLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    userId: id,
    name: "",
    img: {},
  });
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
    setFormData({ userId: id, name: "", img: {} });
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    if (id) {
      try {
        const campaigns = await Campaign.getCampaigns(id);
        setCampaigns(campaigns);
      } catch (error) {
        if (error.response?.status === 401) {
          setAuthorized(false);
          await dispatch(logout());
          await removeItem("token");
          navigate("/login");
        } else {
          console.log(error);
        }
      }
    } else {
      navigate("/login");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      img: e.target.files[0],
    }));
  };

  const handleDelete = async (id) => {
    try {
      await Campaign.deleteCampaign(id);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    } catch (error) {
      console.log(err.response.data.message);
    }
  };

  const handleFileUpdate = async (e, campaign) => {
    setUpdating(true);
    const fd = new FormData();
    fd.set("campaignId", campaign.id);
    fd.set("img", e.target.files[0]);
    try {
      let data = await Campaign.updateImage(fd);
      if (data) {
        const old = [...campaigns];
        const found = old.find((c) => c.id === campaign.id);
        found.backgroundImage = data.backgroundImage;
        setCampaigns(old);
        setUpdating(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const fd = new FormData();
      fd.set("userId", id);
      fd.set("name", formData.name);
      fd.set("img", formData.img);

      let data = await Campaign.create(fd);
      if (data) {
        setCampaigns([...campaigns, data]);
        toggleOpen();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ m: 2 }} className="list-container container">
      {updating && (
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "10000",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Modal
        open={open}
        onClose={toggleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb="1rem"
          >
            Add Campaign
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <TextField
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Campaign Name"
                fullWidth={true}
              />
            </div>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
            </Button>
            <Button variant="contained" type="submit">
              Create Campaign
            </Button>
          </form>
        </Box>
      </Modal>
      <Button variant="contained" onClick={toggleOpen} sx={{ mb: 2 }}>
        Create Campaign
      </Button>
      {/* <Button variant="contained" onClick={toggleOpen} sx={{ mb: 2 }}>
        Join Campaign
      </Button> */}
      <Grid container rowSpacing={1} columnSpacing={12}>
        {campaigns.map((campaign) => {
          if (campaign.backgroundImage) {
            campaign.backgroundImage.url =
              campaign.backgroundImage?.url.replace(
                "/upload",
                "/upload/f_webp,fl_awebp,q_auto"
              );
          }

          return (
            <Grid key={campaign.id} item xs={12} md={6} lg={6} xl={4}>
              <Box
                height={1}
                width={1}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  aspectRatio: 1,
                  backgroundColor: "primary.main",
                  backgroundImage: `url(
                    ${
                      campaign.backgroundImage
                        ? campaign.backgroundImage.url
                        : ""
                    }
                  )`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
                  <Fab size="small" color="primary" component="label">
                    <EditIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => handleFileUpdate(e, campaign)}
                    />
                  </Fab>
                </Box>
                <Box
                  sx={{
                    color: "#fff",
                    width: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: "1rem",
                    backgroundColor: "text.secondary",
                  }}
                >
                  <Typography>{campaign.name}</Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        color: "var(--bg) !important",
                      }}
                      href={`/campaign/${campaign.id}`}
                    >
                      View Campaign
                    </Button>
                    <IconButton
                      sx={{ color: "white" }}
                      onClick={() => handleDelete(campaign.id)}
                    >
                      <DeleteRounded />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CampaignList;
