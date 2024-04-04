import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
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
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterQuestionCategory, setFilterQuestionCategory] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizCategory, setQuizCategory] = useState("");
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [availableQuestionsPage, setAvailableQuestionsPage] = useState(0);
  const [availableQuestionsRowsPerPage, setAvailableQuestionsRowsPerPage] =
    useState(3);
  const [selectedQuestionsPage, setSelectedQuestionsPage] = useState(0);
  const [selectedQuestionsRowsPerPage, setSelectedQuestionsRowsPerPage] =
    useState(3);

  useEffect(() => {
    fetchQuizzes();
    fetchFilteredQuestions(filterQuestionCategory);
  }, [searchTitle, filterCategory, filterQuestionCategory]);

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

  const fetchFilteredQuestions = async (category) => {
    try {
      const url =
        `https://logic-lakshan-2345.onrender.com/admin/questions` +
        (category ? `?category=${category}` : "");
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  };

  const handleSearchTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleAddQuestion = (questionId) => {
    const questionToAdd = questions.find((q) => q._id === questionId);
    if (questionToAdd) {
      setSelectedQuestions([...selectedQuestions, questionToAdd]);
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q._id !== questionId));
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setQuizTitle(quiz.title);
    setQuizCategory(quiz.category);
    const selectedQuestionDetails = quiz.questions
      .map((id) => questions.find((q) => q._id === id))
      .filter((q) => q);
    setSelectedQuestions(selectedQuestionDetails);
    setOpenModal(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await fetch(`${requrl}admin/quizzes/${quizId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSnackbarMessage(`Quiz deleted successfully!`);
        setSnackbarOpen(true);
        fetchQuizzes(); // Refresh the quiz list
      } else {
        const errorData = await response.json();
        console.error("Failed to delete quiz", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting quiz: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const createdBy = "66081fe574458c636cfd0b96";
    const quizData = {
      title: quizTitle,
      category: quizCategory,
      createdBy,
      questions: selectedQuestions.map((q) => q._id),
    };

    let url = `${requrl}admin/quizzes`;
    let method = "POST";

    if (editingQuiz) {
      url += `/${editingQuiz._id}`;
      method = "PATCH";
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const action = editingQuiz ? "updated" : "created";
        setSnackbarMessage(`Quiz ${action} successfully!`);
        setSnackbarOpen(true);
        handleCloseModal();
        fetchQuizzes();
      } else {
        const errorData = await response.json();
        console.error("Failed to process quiz", errorData.message);
      }
    } catch (error) {
      console.error("Error processing quiz: ", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingQuiz(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
                onClick={() => setOpenModal(true)}
              >
                Add Quiz
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
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
                            <IconButton
                              onClick={() => handleDeleteQuiz(quiz._id)}
                            >
                              {" "}
                              {/* Call handleDeleteQuiz */}
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Scrollbar>
            </Card>
          </Stack>
        </Container>
      </Box>
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
            maxWidth: 1000,
            width: "80%",
            borderRadius: 8,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5">
              {editingQuiz ? "Edit Quiz" : "Add Quiz"}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Stack sx={{ flexGrow: 1, mr: 2 }}>
                <Typography variant="h6">Available Questions</Typography>
                <Select
                  value={filterQuestionCategory}
                  onChange={(e) => setFilterQuestionCategory(e.target.value)}
                  displayEmpty
                  fullWidth
                  size="small"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <Scrollbar style={{ maxHeight: 300 }}>
                  {questions
                    .slice(
                      availableQuestionsPage * availableQuestionsRowsPerPage,
                      availableQuestionsPage * availableQuestionsRowsPerPage +
                        availableQuestionsRowsPerPage
                    )
                    .map((question) => (
                      <div key={question._id}>
                        <Typography>{question.questionText}</Typography>
                        <Button
                          variant="outlined"
                          onClick={() => handleAddQuestion(question._id)}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                </Scrollbar>
                <Stack direction="row" justifyContent="center">
                  <Button
                    onClick={() =>
                      setAvailableQuestionsPage((prevPage) =>
                        Math.max(prevPage - 1, 0)
                      )
                    }
                    disabled={availableQuestionsPage === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setAvailableQuestionsPage((prevPage) =>
                        Math.min(
                          prevPage + 1,
                          Math.ceil(
                            questions.length / availableQuestionsRowsPerPage
                          ) - 1
                        )
                      )
                    }
                    disabled={
                      availableQuestionsPage >=
                      Math.ceil(
                        questions.length / availableQuestionsRowsPerPage
                      ) -
                        1
                    }
                  >
                    Next
                  </Button>
                </Stack>
              </Stack>
              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Selected Questions</Typography>
                <Scrollbar style={{ maxHeight: 300 }}>
                  {selectedQuestions
                    .slice(
                      selectedQuestionsPage * selectedQuestionsRowsPerPage,
                      selectedQuestionsPage * selectedQuestionsRowsPerPage +
                        selectedQuestionsRowsPerPage
                    )
                    .map((question) => (
                      <div key={question._id}>
                        <Typography>{question.questionText}</Typography>
                        <Button
                          variant="outlined"
                          onClick={() => handleRemoveQuestion(question._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                </Scrollbar>
                <Stack direction="row" justifyContent="center">
                  <Button
                    onClick={() =>
                      setSelectedQuestionsPage((prevPage) =>
                        Math.max(prevPage - 1, 0)
                      )
                    }
                    disabled={selectedQuestionsPage === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setSelectedQuestionsPage((prevPage) =>
                        Math.min(
                          prevPage + 1,
                          Math.ceil(
                            selectedQuestions.length /
                              selectedQuestionsRowsPerPage
                          ) - 1
                        )
                      )
                    }
                    disabled={
                      selectedQuestionsPage >=
                      Math.ceil(
                        selectedQuestions.length / selectedQuestionsRowsPerPage
                      ) -
                        1
                    }
                  >
                    Next
                  </Button>
                </Stack>
              </Stack>
            </Box>
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
                sx={{ mt: 2 }}
              >
                {editingQuiz ? "Update Quiz" : "Create Quiz"}
              </Button>
            </form>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ "& .MuiSnackbarContent-root": { backgroundColor: "green" } }}
      />
    </>
  );
};

export default QuizzesPage;
