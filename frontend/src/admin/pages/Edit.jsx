import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  TextField,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../admin/components/scrollbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { requrl } from "../../admin/const/const";

const EditQuiz = () => {
  const { id } = useParams(); // Get the quiz ID from URL params
  console.log(id);

  const [quiz, setQuiz] = useState(null);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`${requrl}admin/quizzes/${id}`);
      console.log(response); // Log the response object
      const data = await response.json();
      console.log(data); // Log the data received from the server
      setQuiz(data);
      setTitle(data.title);
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching quiz: ", error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleQuestionDelete = (questionId) => {
    // Logic to delete the question from the quiz
    const updatedQuestions = questions.filter(
      (question) => question._id !== questionId
    );
    setQuestions(updatedQuestions);
  };

  const handleSave = async () => {
    try {
      // Logic to update quiz title and questions
      const response = await fetch(`${requrl}admin/quizzes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, questions }),
      });
      if (response.ok) {
        // Quiz updated successfully
        console.log("Quiz updated successfully");
      } else {
        console.error("Failed to update quiz");
      }
    } catch (error) {
      console.error("Error updating quiz: ", error);
    }
  };

  // Render loading indicator until quiz data is fetched
  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Edit Quiz | Your App Name</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Edit Quiz</Typography>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
            />
            <Card>
              <Scrollbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Question Text</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((question) => (
                      <TableRow key={question._id}>
                        <TableCell>{question.questionText}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleQuestionDelete(question._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Scrollbar>
            </Card>
            <Button color="primary" variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default EditQuiz;
