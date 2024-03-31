import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import {
  Button,
  Card,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OverviewLatestCustomers = (props) => {
  const { customers = [] } = props;
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://cyan-clumsy-haddock.cyclic.app/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const handleEdit = (userId) => {
    setEditUserId(userId);
    const userToEdit = users.find((user) => user._id === userId);
    setEditedUser(userToEdit);
  };

  const handleDelete = async (userId) => {
    setDeleteUserId(userId);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteUserId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(
        `https://cyan-clumsy-haddock.cyclic.app/users/${deleteUserId}`,
        {
          method: "DELETE",
        }
      );
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
    handleCloseDeleteConfirmation();
  };

  const handleSaveEdit = async () => {
    try {
      await fetch(
        `https://cyan-clumsy-haddock.cyclic.app/users/${editUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );
      fetchUsers(); // Refresh the user list after update
    } catch (error) {
      console.error("Error updating user: ", error);
    }
    setEditUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <Card>
      <CardHeader
        action={
          <Button color="inherit" component="a" href="#">
            View All
          </Button>
        }
        title="Latest Customers"
      />
      <Divider />
      <Scrollbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>S.no</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Dialog open={!!editUserId} onClose={() => setEditUserId(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={editedUser.username || ""}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            value={editedUser.email || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUserId(null)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

OverviewLatestCustomers.propTypes = {
  customers: PropTypes.array,
};

export default OverviewLatestCustomers;
