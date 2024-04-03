// import React, { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import { FormControl, Radio, RadioGroup, Button } from "@mui/material";
// import axios from "axios";

// const QuizStart = () => {
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [totalScore, setTotalScore] = useState(0);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const response = await axios.get("https://logic-lakshan-2345.onrender.com/admin/quizzes/6609954e74458c636cfd0bea");
//         setQuiz(response.data);
//         setQuestions(response.data.questions);
//         await fetchQuestion(response.data.questions[currentQuestionIndex]);
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//       }
//     };
//     fetchQuizData();
//   }, [currentQuestionIndex]); // Update useEffect dependency to currentQuestionIndex

//   const fetchQuestion = async (questionId) => {
//     try {
//       const response = await axios.get(`https://logic-lakshan-2345.onrender.com/admin/questions/${questionId}`);
//       setQuestions(prevQuestions => {
//         const updatedQuestions = [...prevQuestions];
//         updatedQuestions[currentQuestionIndex] = response.data;
//         return updatedQuestions;
//       });
//     } catch (error) {
//       console.error("Error fetching question data:", error);
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prevIndex => prevIndex - 1);
//     }
//   };

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleSubmit = () => {
//     let score = 0;
//     questions.forEach((question, index) => {
//       // Check if options are defined for the current question
//       if (question.options) {
//         const correctOption = question.options.find(option => option.isCorrect)?.text;
//         if (selectedOption === correctOption) {
//           score++;
//         }
//       }
//     });
//     setTotalScore(score);
//     setSubmitted(true);
//   };
  
  

//   if (!quiz || questions.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];
//   const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
//   const isNextDisabled = submitted || !selectedOption;
//   const isSubmitDisabled = submitted || (!isLastQuestion || !selectedOption);

//   return (
//     <div style={{ width: "80%", margin: "auto", backgroundColor: "red", height: "100%" }}>
//       <Card sx={{ width: "95%", margin: "auto", height: "100%" }}>
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {`Question ${currentQuestionIndex + 1}`}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: "2rem" }}>
//             {currentQuestion.questionText}
//           </Typography>
//         </CardContent>
//         <FormControl sx={{ width: "100%", height: "auto", margin: "auto" }}>
//           <RadioGroup
//             aria-label={`options-${currentQuestionIndex}`}
//             value={selectedOption}
//             onChange={handleOptionChange}
//             sx={{ width: "95%", margin: "auto" }}
//           >
//             <div>
//               <ul>
//                 {currentQuestion.options && currentQuestion.options.map((option, index) => (
//                   <li key={index} style={{ listStyleType: "none" }}>
//                     <Radio
//                       id={`option_${index}`}
//                       value={option.text}
//                       checked={selectedOption === option.text}
//                       onChange={handleOptionChange}
//                     />
//                     <label htmlFor={`option_${index}`}>{option.text}</label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </RadioGroup>
//         </FormControl>
//         <div>
//           <Button
//             disabled={currentQuestionIndex === 0 || submitted}
//             onClick={handlePrevious}
//           >
//             Previous
//           </Button>
//           {isLastQuestion && (
//             <Button disabled={isSubmitDisabled} onClick={handleSubmit}>
//               Submit
//             </Button>
//           )}
//           <Button
//             disabled={isNextDisabled}
//             onClick={handleNext}
//           >
//             Next
//           </Button>
//         </div>
//       </Card>
//       {submitted && (
//         <div>
//           <Typography variant="h6">Your score: {totalScore} / {quiz.questions.length}</Typography>
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
import { FormControl, Radio, RadioGroup, Button } from "@mui/material";
import axios from "axios";

const QuizStart = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
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
        await fetchQuestion(response.data.questions[currentQuestionIndex]);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, [currentQuestionIndex]); // Update useEffect dependency to currentQuestionIndex

  const fetchQuestion = async (questionId) => {
    try {
      const response = await axios.get(`https://logic-lakshan-2345.onrender.com/admin/questions/${questionId}`);
      setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[currentQuestionIndex] = response.data;
        return updatedQuestions;
      });
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
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    const userAnswersList = questions.map((question, index) => {
      if (question.options) {
        const correctOption = question.options.find(option => option.isCorrect)?.text;
        const userAnswer = selectedOption || "Not answered";
        const isCorrect = userAnswer === correctOption;
        if (isCorrect) {
          calculatedScore++;
        }
        return {
          questionNumber: index + 1,
          correctAnswer: correctOption,
          userAnswer,
          isCorrect
        };
      } else {
        return {
          questionNumber: index + 1,
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
  const isNextDisabled = submitted || !selectedOption;
  const isSubmitDisabled = submitted || (!isLastQuestion || !selectedOption);

  return (
    <div style={{ width: "80%", margin: "auto", backgroundColor: "red", height: "100%" }}>
      <Card sx={{ width: "95%", margin: "auto", height: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`Question ${currentQuestionIndex + 1}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "2rem" }}>
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
            <div>
              <ul>
                {currentQuestion.options && currentQuestion.options.map((option, index) => (
                  <li key={index} style={{ listStyleType: "none" }}>
                    <Radio
                      id={`option_${index}`}
                      value={option.text}
                      checked={selectedOption === option.text}
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
        </div>
      )}
    </div>
  );
};

export default QuizStart;
