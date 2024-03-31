import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Scrollbar } from "../../admin/components/scrollbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, [searchTitle, filterCategory]); // Refetch quizzes when searchTitle or filterCategory changes

  const fetchQuizzes = async () => {
    try {
      let url = "https://cyan-clumsy-haddock.cyclic.app/admin/quizzes?";
      if (searchTitle) url += `title=${searchTitle}&`;
      if (filterCategory) url += `category=${filterCategory.toLowerCase()}&`;

      const response = await fetch(url);
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes: ", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Quizzes | Your App Name</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Typography variant="h4">Quizzes</Typography>
              <Button color="primary" size="large" variant="contained">
                Add Quiz
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <input
                type="text"
                placeholder="Search by Title"
                value={searchTitle}
                onChange={handleSearchTitleChange}
              />
              <Select
                value={filterCategory}
                onChange={handleFilterCategoryChange}
                displayEmpty
                inputProps={{ "aria-label": "Select category" }}
              >
                <MenuItem value="" disabled>
                  Filter by Category
                </MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="MongoDB">MongoDB</MenuItem>
              </Select>
            </Stack>
            <div>
              <Card>
                <Scrollbar>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Number of Questions</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {quizzes
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((quiz) => (
                          <TableRow key={quiz._id}>
                            <TableCell>{quiz.title}</TableCell>
                            <TableCell>{quiz.category}</TableCell>
                            <TableCell>{quiz.questions.length}</TableCell>
                            <TableCell>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                              <IconButton>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Scrollbar>
                <Divider />
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={quizzes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default QuizzesPage;
