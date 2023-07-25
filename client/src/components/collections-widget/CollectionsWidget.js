import React, { useEffect } from "react";
import "./CollectionsWidget.css";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  addCollection,
  getCollectionTitles,
} from "../../modules/collection/collectionRepository";
import { getCurrentUserId } from "../../modules/user/userRepository";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#E9E7E5"),
  backgroundColor: "#f0ebe6",
  "&:hover": {
    backgroundColor: "#f0ebe6",
  },
}));

export default function CollectionsWidget() {
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [collection, setCollection] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCollection = async () => {
      const userId = await getCurrentUserId();
      const collections = await getCollectionTitles(userId);
      setItems(collections);
    };

    getCollection();
  }, [collection]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addItem = async () => {
    const userId = await getCurrentUserId();
    if (userId) {
      if (!newItem) {
        alert("Enter a collection name");
        return;
      }
      const newCollection = await addCollection(newItem, userId);
      if (newCollection.statusCode === 404) {
        alert("This collection already exists");
      } else {
        setCollection(true);
      }
      setNewItem("");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="collections-container">
      <h5>Your Collections</h5>
      <div className="container-list">
        <ul className="list">
          {items.map((item) => {
            return (
              <Link to={`/my-books/${item.id}`}>
                <li key={item.id} className="list-item">
                  {item.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <ColorButton onClick={handleClickOpen}>Add a collection</ColorButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of your new collection! It can be anything from
            romance to 1800's thrillers to manga comics, be as creative as you
            wish!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Collection name"
            type="email"
            fullWidth
            variant="standard"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addItem}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
