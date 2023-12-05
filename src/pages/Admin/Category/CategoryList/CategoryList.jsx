import React, { useEffect, useState } from "react";
import Category from "../../../../services/category.service";
import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Modal,
  Stack,
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
  bgcolor: "var(--bg)",
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
      let isAdmin = await User.getAdmin();
      console.log(isAdmin);
      setAuthorized(true);
      let categories = await Category.getCategories();
      console.log(categories);
      setCategories(categories);
    } catch (error) {
      setAuthorized(false);
      console.log(error);
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
    <section className="list-container container">
      <Modal
        open={open}
        onClose={toggleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category Name"
              />
            </div>
            <button type="submit">Add Category</button>
          </form>
        </Box>
      </Modal>
      <Button variant="contained" onClick={toggleOpen} sx={{ m: 2 }}>
        Add Category
      </Button>
      <Grid container rowSpacing={4} sx={{ m: 2 }}>
        {categories.map((category) => {
          return (
            <Grid key={category.id} item xs={4}>
              <Stack direction="row" alignItems="center" gap={2}>
                {category.name}
                <DeleteIcon onClick={() => handleDelete(category.id)} />
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
}

export default CategoryList;
