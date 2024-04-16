import jsonData from "../data/QuestionsData.json";

export const getHealthHistoryQuestions = () => {
    return jsonData.filter(
      (question) => question.health_history_question
    );
  }
  
  export const getLifeFunctionQuestions = () => {
    return jsonData.filter(
      (question) => question.life_functions_question
    );
  }
  
  export const getScreeningQuestions = () => {
    return jsonData.filter(
      (question) => question.Type === 'screening'
    );
  }
  