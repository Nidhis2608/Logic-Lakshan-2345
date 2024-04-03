import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FormControl, Radio, RadioGroup, Button } from "@mui/material";
import axios from "axios";

const QuizStart = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(10).fill('')); // Assuming there are 10 questions, adjust the array size accordingly
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("https://logic-lakshan-2345.onrender.com/admin/quizzes/6609954e74458c636cfd0bea");
        setQuiz(response.data);
        setQuestions(response.data.questions);
        await fetchQuestionsData(response.data.questions);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const fetchQuestionsData = async (questions) => {
    const promises = questions.map(question => axios.get(`https://logic-lakshan-2345.onrender.com/admin/questions/${question}`));
    try {
      const responses = await Promise.all(promises);
      const updatedQuestions = responses.map(response => response.data);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleOptionChange = (event) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = event.target.value;
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    const userAnswersList = questions.map((question, index) => {
      if (question.options) {
        const correctOption = question.options.find(option => option.isCorrect)?.text;
        const userAnswer = selectedOptions[index] || "Not answered";
        const isCorrect = userAnswer === correctOption;
        if (isCorrect) {
          calculatedScore++;
        }
        return {
          questionText: question.questionText,
          correctAnswer: correctOption,
          userAnswer,
          isCorrect
        };
      } else {
        return {
          questionText: question.questionText,
          correctAnswer: "Not available",
          userAnswer: "Not answered",
          isCorrect: false
        };
      }
    });
    setTotalScore(calculatedScore);
    setSubmitted(true);
    setUserAnswers(userAnswersList);
  };

  if (!quiz || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isNextDisabled = submitted;
  const isSubmitDisabled = submitted || (!isLastQuestion || !selectedOptions[currentQuestionIndex]);

  return (
    <div style={{ width: "80%", margin: "auto", backgroundColor: "red", height: "100%" }}>
      <Card sx={{ width: "95%", margin: "auto", height: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`Question ${currentQuestionIndex + 1}: ${currentQuestion.questionText}`}
          </Typography>
        </CardContent>
        <FormControl sx={{ width: "100%", height: "auto", margin: "auto" }}>
          <RadioGroup
            aria-label={`options-${currentQuestionIndex}`}
            value={selectedOptions[currentQuestionIndex]}
            onChange={handleOptionChange}
            sx={{ width: "95%", margin: "auto" }}
          >
            <div>
              <ul>
                {currentQuestion.options && currentQuestion.options.map((option, index) => (
                  <li key={index} style={{ listStyleType: "none" }}>
                    <Radio
                      id={`option_${index}`}
                      value={option.text}
                      checked={selectedOptions[currentQuestionIndex] === option.text}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={`option_${index}`}>{option.text}</label>
                  </li>
                ))}
              </ul>
            </div>
          </RadioGroup>
        </FormControl>
        <div>
          <Button
            disabled={currentQuestionIndex === 0 || submitted}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          {isLastQuestion && (
            <Button disabled={isSubmitDisabled} onClick={handleSubmit}>
              Submit
            </Button>
          )}
          <Button
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </Card>
      {submitted && (
        <div>
          <Typography variant="h6">Your score: {totalScore} / {quiz.questions.length}</Typography>
          {userAnswers.map((answer, index) => (
            <div key={index}>
              <Typography variant="body1">
                {`Question ${index + 1}: Your Answer - ${answer.userAnswer}, Correct Answer - ${answer.correctAnswer}`}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizStart;
