import React, { useEffect, useState } from "react";
import Category from "../../../../services/category.service";
import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import User from "../../../../services/user.service";

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

function CategoryList() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [authorized, setAuthorized] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
    setFormData({ name: "" });
  };

  useEffect(() => {
    fetchCategories();

    return () => {
      fetchCategories();
    };
  }, []);

  const fetchCategories = async () => {
    try {
      let categories = await Category.getCategories();
      setAuthorized(true);
      setCategories(categories);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        setAuthorized(false);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = await Category.create(formData);
      if (data) {
        setCategories([...categories, data]);
        toggleOpen();
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Category.deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.log(err.response.data.message);
    }
  };

  if (!authorized) return <div>Not Authorized</div>;

  return (
    <Box sx={{ m: 2 }} className="list-container container">
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
            Add Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category Name"
                fullWidth={true}
              />
            </div>
            <Button variant="contained" type="submit">
              Add Category
            </Button>
          </form>
        </Box>
      </Modal>
      <Button variant="contained" onClick={toggleOpen} sx={{ mb: 2 }}>
        Add Category
      </Button>
      <Grid container rowSpacing={1} columnSpacing={12}>
        {categories.map((category) => {
          return (
            <Grid key={category.id} item xs={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                {category.name}
                <IconButton
                  color="primary"
                  onClick={() => handleDelete(category.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CategoryList;
