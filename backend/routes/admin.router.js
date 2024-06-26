
const express= require("express");
const QuestionModel = require("../model/Ques.Model");
const QuizModel = require("../model/Quizes.Model");
const { UserModel } = require("../model/user.model");
const adminRoute= express.Router()

// POST request to create a new question
adminRoute.post('/questions', async (req, res) => {
  try {
    const { questionText, options, category } = req.body;

    const newQuestion = new QuestionModel({
      questionText,
      options,
      category
    });

    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/*
Get all Question demo with filter
http://localhost:3000/admin/questions?category=Java
*/
adminRoute.get('/questions', async (req, res) => {
  try {
    const { category } = req.query; 
    let query = {};

    if (category) {
      query.category = category;
    }

    const questions = await QuestionModel.find(query);

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

adminRoute.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL params
    const question = await QuestionModel.findById(id); // Find question by ID
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST request to add questions to a quiz
adminRoute.post('/quizzes/:quizId/questions', async (req, res) => {
  try {
    const { questionIds } = req.body; // Expecting an array of question ObjectIds in the request body
    const quizId = req.params.quizId;

    // Find the quiz by ID and update it by pushing new question IDs into the questions array
    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      quizId,
      { $push: { questions: { $each: questionIds } } }, // Use $each to add each question ID from the array
      { new: true } // Return the updated document
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



adminRoute.post('/quizzes', async (req, res) => {
  try {
    const { title, category, createdBy,questions } = req.body;
    
    // Validate createdBy (user ID) exists
    const userExists = await UserModel.findById(createdBy);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate each question ID exists
    for (let questionId of questions) {
      const questionExists = await QuestionModel.findById(questionId);
      if (!questionExists) {
        return res.status(404).json({ message: `Question with ID ${questionId} not found` });
      }
    }
    
    // All validations passed, proceed to create the quiz
    const newQuiz = new QuizModel({
      title,
      category,
      createdBy,
      questions
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/*
Get all Question demo with filter
http://localhost:3000/admin/quizzes?category=Java
*/



adminRoute.get('/quizzes', async (req, res) => {
  try {
    const filter = {};
    const paginationOptions = {
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.title) {
      filter.title = { $regex: new RegExp(req.query.title, 'i') }; // case-insensitive search
    }

    const quizzesPromise = QuizModel.find(filter)
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .exec();

    const totalItemsPromise = QuizModel.countDocuments(filter).exec();

    const [quizzes, totalItems] = await Promise.all([quizzesPromise, totalItemsPromise]);

    // Fetching all categories
    const categories = await QuizModel.distinct('category').exec();

    res.status(200).json({
      quizzes,
      totalItems,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



adminRoute.patch('/quizzes/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the quiz ID from the URL parameters
    const update = req.body; // Get the updates from the request body

    // Option for findByIdAndUpdate to return the updated document
    const options = { new: true };

    const updatedQuiz = await QuizModel.findByIdAndUpdate(id, update, options);

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


adminRoute.delete('/quizzes/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the quiz ID from the URL parameters
    
    const deletedQuiz = await QuizModel.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz successfully deleted', deletedQuizId: id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
adminRoute.get('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = adminRoute


