export function getStorageAnswers(quizId) {
  if (typeof window === "undefined") {
    return null;
  }
  const answer = JSON.parse(localStorage.getItem(quizId));
  return answer;
}

export function getStorageAnswer(quizId, questionId) {
  if (typeof window === "undefined") {
    return null;
  }
  const answer = JSON.parse(localStorage.getItem(quizId));
  return answer?.[questionId];
}

export function setStorageAnswer(quizId, questionId, answer) {
  if (typeof window === "undefined") {
    return null;
  }
  const newAnswer = JSON.parse(localStorage.getItem(quizId)) || [];
  newAnswer[questionId] = answer;
  localStorage.setItem(quizId, JSON.stringify(newAnswer));
}

export function clearStorageAnswers(quizId) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(quizId);
  }
}
