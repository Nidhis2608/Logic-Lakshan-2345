const OverviewLatestCustomers = (props) => {
  const { customers = [] } = props;
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${requrl}users`);
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
      await fetch(`${requrl}users/${deleteUserId}`, {
        method: "DELETE",
      });
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
    handleCloseDeleteConfirmation();
  };

  const handleSaveEdit = async () => {
    try {
      await fetch(`${requrl}users/${editUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });
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

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    // Reset new user data when dialog closes
    setNewUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleAddUser = async () => {
    try {
      await fetch(`${requrl}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });
      fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error("Error adding user: ", error);
    }
    handleAddDialogClose();
  };

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <Card>
      <CardHeader title="All Users" />
      <Divider />
      <Stack direction="row" alignItems="center" p={2} spacing={2}>
        <Button variant="contained" onClick={handleAddDialogOpen}>
          Add User
        </Button>
      </Stack>
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
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={newUserData.username}
            onChange={handleNewUserInputChange}
          />
          <TextField
            label="Email"
            name="email"
            value={newUserData.email}
            onChange={handleNewUserInputChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={newUserData.password}
            onChange={handleNewUserInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddUser}>Add</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

OverviewLatestCustomers.propTypes = {
  customers: PropTypes.array,
};

export default OverviewLatestCustomers;
