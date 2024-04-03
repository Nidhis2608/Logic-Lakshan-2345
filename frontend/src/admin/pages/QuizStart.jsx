// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
// import axios from 'axios';

// const QuizStart = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(null));
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);

//   useEffect(() => {
//     axios.get("https://better-boot-tick.cyclic.app/admin/questions")
//       .then(res => {
//         setQuestions(res.data);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }, []);

//   const handleNext = () => {
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//   };

//   const handlePrevious = () => {
//     setCurrentQuestionIndex(prevIndex => prevIndex - 1);
//   };

//   const handleOptionChange = (event) => {
//     const updatedSelectedOptions = [...selectedOptions];
//     updatedSelectedOptions[currentQuestionIndex] = event.target.value;
//     setSelectedOptions(updatedSelectedOptions);
//   };

//   const handleSubmit = () => {
//     let calculatedScore = 0;
//     const userAnswersList = questions.map((question, index) => {
//       const correctOption = question.options.find(option => option.isCorrect).text;
//       const userAnswer = selectedOptions[index] || "Not answered";
//       const isCorrect = userAnswer === correctOption;
//       if (isCorrect) {
//         calculatedScore++;
//       }
//       return {
//         questionNumber: index + 1,
//         correctAnswer: correctOption,
//         userAnswer,
//         isCorrect
//       };
//     });
//     setScore(calculatedScore);
//     setSubmitted(true);
//     setUserAnswers(userAnswersList);
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div style={{width:"80%", margin:"auto", backgroundColor:"red", height:"100%"}}>
//       {currentQuestion && (
//         <Card sx={{ width:"95%", margin:"auto",height:"100%"}}>
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {`Question ${currentQuestionIndex + 1}`}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{fontSize: "2rem"}}>
//               {currentQuestion.questionText}
//             </Typography>
//           </CardContent>
//           <FormControl sx={{width:"100%",height:"auto", margin:"auto"}}>
//             <RadioGroup
//               aria-label={`options-${currentQuestionIndex}`}
//               value={selectedOptions[currentQuestionIndex] || ""}
//               onChange={handleOptionChange}
//               sx={{ width:"95%", margin:"auto"}}
//             >
//               {currentQuestion.options.map((option, optionIndex) => (
//                 <FormControlLabel
//                   key={optionIndex}
//                   value={option.text}
//                   control={<Radio />}
//                   label={option.text}
//                   sx={{fontSize: "2rem", fontWeight: "bold"}}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//           <div>
//             <Button
//               disabled={currentQuestionIndex === 0 || submitted}
//               onClick={handlePrevious}
//             >
//               Previous
//             </Button>
//             {currentQuestionIndex === questions.length - 1 && !submitted && (
//               <Button
//                 disabled={!selectedOptions[currentQuestionIndex]}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </Button>
//             )}
//             <Button
//               disabled={currentQuestionIndex === questions.length - 1 || submitted}
//               onClick={handleNext}
//             >
//               Next
//             </Button>
//           </div>
//         </Card>
//       )}
//       {submitted && (
//         <div>
//           <Typography variant="h6">
//             Your score: {score} / {questions.length}
//           </Typography>
//           <Typography variant="h6">
//             Answers:
//           </Typography>
//           {userAnswers.map((answer, index) => (
//             <div key={index}>
//               <Typography variant="body1">
//                 Question {answer.questionNumber}:
//               </Typography>
//               <Typography variant="body2">
//                 Your Answer: {answer.userAnswer}
//               </Typography>
//               <Typography variant="body2">
//                 Correct Answer: {answer.correctAnswer}
//               </Typography>
//               <Typography variant="body2">
//                 {answer.isCorrect ? "Correct!" : "Incorrect!"}
//               </Typography>
//               <br />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizStart;

import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import axios from "axios";

const QuizStart = () => {
  const [quiz, setQuiz] = useState(null);
  const [que, setQues] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://logic-lakshan-2345.onrender.com/admin/quizzes/6609954e74458c636cfd0be9"
      ) // Replace :id with the actual quiz id
      .then((res) => {
        setQuiz(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const fetchQuestion = async (questionId) => {
    try {
      const response = await axios.get(
        `https://logic-lakshan-2345.onrender.com/admin/questions/${questionId}`
      );
      console.log(response.data);
      setQues(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching question:", error);
      return null;
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption(""); // Clear selected option for the next question
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedOption(""); // Clear selected option for the previous question
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    // Logic to calculate score and user answers goes here
    // For now, just console log the selected option
    console.log("Selected option:", selectedOption);
    // You can implement the score calculation and user answers logic here
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestionId = quiz.questions[currentQuestionIndex];
  const currentQuestion = fetchQuestion(currentQuestionId);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        backgroundColor: "red",
        height: "100%",
      }}
    >
      {currentQuestion && (
        <Card sx={{ width: "95%", margin: "auto", height: "100%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Question ${currentQuestionIndex + 1}`}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "2rem" }}
            >
              {currentQuestion.questionText}
            </Typography>
          </CardContent>
          <FormControl sx={{ width: "100%", height: "auto", margin: "auto" }}>
            <RadioGroup
              aria-label={`options-${currentQuestionIndex}`}
              value={selectedOption}
              onChange={handleOptionChange}
              sx={{ width: "95%", margin: "auto" }}
            >
              {/* <pre>{JSON.stringify({ que }, null, 2)}</pre> */}

              <div>
                <h2>{que.questionText}</h2>
                <ul>
                  {que.options?.map((option, index) => (
                    <li key={index} style={{ listStyleType: "none" }}>
                      <input
                        type="radio"
                        id={`option_${index}`}
                        name="quizOption"
                        value={option.text}
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
            {currentQuestionIndex === quiz.questions.length - 1 &&
              !submitted && (
                <Button disabled={!selectedOption} onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            <Button
              disabled={
                currentQuestionIndex === quiz.questions.length - 1 || submitted
              }
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
export default QuizStart;
