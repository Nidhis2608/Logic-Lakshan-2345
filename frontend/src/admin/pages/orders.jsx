import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../admin/components/scrollbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { requrl } from "../../admin/const/const";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizCategory, setQuizCategory] = useState("");
  const [editingQuiz, setEditingQuiz] = useState(null); // State to hold the quiz being edited

  useEffect(() => {
    fetchQuizzes();
  }, [searchTitle, filterCategory]);

  const fetchQuizzes = async () => {
    try {
      let url = `${requrl}admin/quizzes?`;
      if (searchTitle) url += `title=${searchTitle}&`;
      if (filterCategory) url += `category=${filterCategory}&`;
      const response = await fetch(url);
      const data = await response.json();
      setQuizzes(data.quizzes);
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching quizzes: ", error);
    }
  };

  const handleSearchTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleAddQuestion = (questionId) => {
    setSelectedQuestions([...selectedQuestions, questionId]);
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
  };

  const handleOpenModal = () => {
    fetchQuestions();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingQuiz(null); // Clear editing state when modal closes
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://logic-lakshan-2345.onrender.com/admin/questions"
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  };

  const handleEditQuiz = (quiz) => {
    // Set the quiz being edited
    setEditingQuiz(quiz);
    // Populate modal fields with quiz data
    setQuizTitle(quiz.title);
    setQuizCategory(quiz.category);
    setSelectedQuestions(quiz.questions);
    // Open modal
    setOpenModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create new quiz object
    const newQuiz = {
      title: quizTitle,
      category: quizCategory,
      createdBy: "66081fe574458c636cfd0b95", // Hardcoded ObjectId
      questions: selectedQuestions,
    };

    try {
      let url = `${requrl}admin/quizzes`;
      let method = "POST"; // Default to POST for creating new quiz

      // If editingQuiz is not null, then we are editing an existing quiz
      if (editingQuiz) {
        url += `/${editingQuiz._id}`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuiz),
      });

      if (response.ok) {
        console.log(`Quiz ${editingQuiz ? "edited" : "created"} successfully!`);
        // Optionally, you can close the modal here
        handleCloseModal();
        // Reset form fields
        setQuizTitle("");
        setQuizCategory("");
        setSelectedQuestions([]);
        // Refresh quizzes after adding a new one
        fetchQuizzes();
      } else {
        console.error("Failed to create or edit quiz");
      }
    } catch (error) {
      console.error("Error creating or editing quiz: ", error);
    }
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
              <Button
                color="primary"
                size="large"
                variant="contained"
                onClick={handleOpenModal}
              >
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
                <MenuItem value="">Filter by Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
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
                              <IconButton onClick={() => handleEditQuiz(quiz)}>
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
                  onPageChange={(event, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(event) =>
                    setRowsPerPage(parseInt(event.target.value, 10))
                  }
                />
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
      {/* Modal for adding/editing quiz */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 800,
            width: "80%",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5">
              {editingQuiz ? "Edit Quiz" : "Add Quiz"}
            </Typography>
            <Stack direction="row" spacing={2}>
              {/* Left side - Display questions */}
              <Stack flexGrow={1}>
                <Typography variant="h6">Select Questions</Typography>
                <Scrollbar>
                  {questions.map((question) => (
                    <div key={question._id}>
                      <Typography>{question.questionText}</Typography>
                      {selectedQuestions.includes(question._id) ? (
                        <Button
                          variant="outlined"
                          onClick={() => handleRemoveQuestion(question._id)}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => handleAddQuestion(question._id)}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
                </Scrollbar>
              </Stack>
              {/* Right side - Quiz creation form */}
              <Stack flexGrow={1}>
                <Typography variant="h6">Quiz Details</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    required
                  />
                  <TextField
                    select
                    label="Category"
                    variant="outlined"
                    fullWidth
                    value={quizCategory}
                    onChange={(e) => setQuizCategory(e.target.value)}
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!quizTitle || !quizCategory}
                  >
                    {editingQuiz ? "Update Quiz" : "Create Quiz"}
                  </Button>
                </form>
              </Stack>
            </Stack>
            <Button onClick={handleCloseModal}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default QuizzesPage;
