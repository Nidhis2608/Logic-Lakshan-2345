import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import { requrl } from "../const/const";

const QuizStart = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(10).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${requrl}admin/quizzes/${quizId}`);
        setQuiz(response.data);
        await fetchQuestionsData(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [quizId]);

  const fetchQuestionsData = async (questionIds) => {
    const promises = questionIds.map((questionId) =>
      axios.get(`${requrl}admin/questions/${questionId}`)
    );
    try {
      const responses = await Promise.all(promises);
      setQuestions(responses.map((response) => response.data));
    } catch (error) {
      console.error("Error fetching questions data:", error);
    }
  };

  const handleOptionChange = (event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const userAnswersList = questions.map((question, index) => {
      const userAnswer = selectedOptions[index] || "Not answered";
      const correctOption = question.options.find(
        (option) => option.isCorrect
      )?.text;
      const isCorrect = userAnswer === correctOption;
      if (isCorrect) {
        setTotalScore((prevScore) => prevScore + 1);
      }
      return {
        questionText: question.questionText,
        userAnswer,
        correctAnswer: correctOption,
        isCorrect,
      };
    });
    setUserAnswers(userAnswersList);
    setSubmitted(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (submitted) {
    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <Typography variant="h6">
          Your score: {totalScore} / {questions.length}
        </Typography>
        {userAnswers.map((answer, index) => (
          <div key={index}>
            <Typography variant="body1">
              {`Question ${index + 1}: ${answer.questionText}`}
              <br />
              {`Your Answer: ${answer.userAnswer}, Correct Answer: ${answer.correctAnswer}`}
            </Typography>
          </div>
        ))}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`Question ${currentQuestionIndex + 1}: ${
              currentQuestion.questionText
            }`}
          </Typography>
          <FormControl>
            <RadioGroup
              aria-label="quiz-options"
              name={`options_${currentQuestionIndex}`}
              value={selectedOptions[currentQuestionIndex]}
              onChange={handleOptionChange}
            >
              {currentQuestion.options.map((option, index) => (
                <label key={index}>
                  <Radio value={option.text} />
                  {option.text}
                </label>
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button disabled={currentQuestionIndex <= 0} onClick={handlePrevious}>
            Previous
          </Button>
          {isLastQuestion ? (
            <Button
              disabled={!selectedOptions[currentQuestionIndex]}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              disabled={!selectedOptions[currentQuestionIndex]}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizStart;
