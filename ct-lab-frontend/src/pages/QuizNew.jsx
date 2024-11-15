import React, { useState } from 'react';
import styles from './Quiz.module.css';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(0);

  const updateAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const updateProgress = () => {
    const totalQuestions = 5;
    let answeredQuestions = 0;

    if (answers.q1) answeredQuestions++;
    if (answers.q2 && answers.q2.length === 3) answeredQuestions++;
    if (answers.q3) answeredQuestions++;
    if (answers.q4 && answers.q4.length === 4) answeredQuestions++;
    if (answers.q5 && Object.values(answers.q5).every(Boolean)) answeredQuestions++;

    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    setProgress(progressPercentage);
  };

  const checkAnswers = () => {
    let score = 0;

    if (answers.q1 === 'b') score++;
    if (answers.q2?.includes('a') && answers.q2?.includes('b') && answers.q2?.includes('d')) score++;
    if (answers.q3 === 'true') score++;
    if (JSON.stringify(answers.q4) === JSON.stringify(['3', '4', '1', '2'])) score++;
    if (answers.q5?.q5_1 === 'c' && answers.q5?.q5_2 === 'b' && answers.q5?.q5_3 === 'a' && answers.q5?.q5_4 === 'd') score++;

    const percentage = (score / 5) * 100;
    setFeedback({
      score,
      percentage,
      passed: percentage >= 60
    });
  };

  return (
    <div className={styles.testContainer}>
      <div className={styles.testHeader}>
        <h2>Computational Thinking Assessment</h2>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.question}>
        <h3>What is the primary purpose of decomposition in computational thinking?</h3>
        <div className={styles.optionsGrid}>
          <label>
            <input 
              type="radio" 
              name="q1" 
              value="a" 
              checked={answers.q1 === 'a'} 
              onChange={() => updateAnswer('q1', 'a')}
            />
            To recognize patterns
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="b"
              checked={answers.q1 === 'b'}
              onChange={() => updateAnswer('q1', 'b')}
            />
            To breakdown complex problems into smaller parts
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="c"
              checked={answers.q1 === 'c'}
              onChange={() => updateAnswer('q1', 'c')}
            />
            To write algorithms
          </label>
          <label>
            <input
              type="radio"
              name="q1"
              value="d"
              checked={answers.q1 === 'd'}
              onChange={() => updateAnswer('q1', 'd')}
            />  
            To ignore irrelevant details
          </label>
        </div>
      </div>

      <div className={styles.question}>
        <h3>Choose 3 of the following that are key concepts of computational thinking:</h3>
        <div className={styles.optionsGrid}>
          <label>
            <input
              type="checkbox"
              name="q2"
              value="a"
              checked={answers.q2?.includes('a')}
              onChange={(e) => {
                const answer = e.target.value;
                const isChecked = e.target.checked;
                setAnswers(prev => ({
                  ...prev,
                  q2: isChecked
                    ? [...(prev.q2 || []), answer]
                    : (prev.q2 || []).filter(a => a !== answer)
                }));
              }}
            />
            Decomposition
          </label>
          <label>
            <input
              type="checkbox"
              name="q2"
              value="b"
              checked={answers.q2?.includes('b')}
              onChange={(e) => {
                const answer = e.target.value;
                const isChecked = e.target.checked;
                setAnswers(prev => ({
                  ...prev,
                  q2: isChecked
                    ? [...(prev.q2 || []), answer]
                    : (prev.q2 || []).filter(a => a !== answer)
                }));
              }}
            />
            Pattern Recognition
          </label>
          <label>
            <input
              type="checkbox"
              name="q2"
              value="c"
              checked={answers.q2?.includes('c')}
              onChange={(e) => {
                const answer = e.target.value;
                const isChecked = e.target.checked;
                setAnswers(prev => ({
                  ...prev,
                  q2: isChecked
                    ? [...(prev.q2 || []), answer]
                    : (prev.q2 || []).filter(a => a !== answer)
                }));
              }}
            />
            Data Encryption
          </label>
          <label>
            <input
              type="checkbox"
              name="q2"
              value="d"
              checked={answers.q2?.includes('d')}
              onChange={(e) => {
                const answer = e.target.value;
                const isChecked = e.target.checked;
                setAnswers(prev => ({
                  ...prev,
                  q2: isChecked
                    ? [...(prev.q2 || []), answer]
                    : (prev.q2 || []).filter(a => a !== answer)
                }));
              }}
            />
            Abstraction
          </label>
          <label>
            <input
              type="checkbox"
              name="q2"
              value="e"
              checked={answers.q2?.includes('e')}
              onChange={(e) => {
                const answer = e.target.value;
                const isChecked = e.target.checked;
                setAnswers(prev => ({
                  ...prev,
                  q2: isChecked
                    ? [...(prev.q2 || []), answer]
                    : (prev.q2 || []).filter(a => a !== answer)
                }));
              }}
            />
            Machine Learning
          </label>
        </div>
      </div>
      
      <div className={styles.question}>
        <h3>Algorithm design involves creating a step-by-step process to solve a problem.</h3>
        <div className={styles.optionsGrid}>
          <label>
            <input
              type="radio"
              name="q3"
              value="true"
              checked={answers.q3 === 'true'}
              onChange={() => updateAnswer('q3', 'true')}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="q3"
              value="false"
              checked={answers.q3 === 'false'}
              onChange={() => updateAnswer('q3', 'false')}
            />
            False
          </label>
        </div>
      </div>

      <div className={styles.question}>
        <h3>Arrange the following steps of algorithm design in the correct order:</h3>
        <div className={styles.sortableList}>
          <div 
            className={styles.sortableItem}
            data-order="3"
          >
            Define the problem
          </div>
          <div
            className={styles.sortableItem}
            data-order="4"
          >
            Create a plan
          </div>
          <div
            className={styles.sortableItem}
            data-order="1"
          >
            Test the solution
          </div>
          <div
            className={styles.sortableItem}
            data-order="2"
          >
            Evaluate the solution
          </div>
        </div>
      </div>

      <div className={styles.question}>
        <h3>Match the computational thinking concepts with their correct descriptions:</h3>
        <div className={styles.matchingContainer}>
          <div className={styles.matchingPair}>
            <div className={styles.matchingConcept}>
              1. Decomposition
            </div>
            <select
              className={styles.matchingSelect}
              value={answers.q5?.q5_1 || ''}
              onChange={(e) => {
                const value = e.target.value;
                setAnswers(prev => ({
                  ...prev,
                  q5: {
                    ...(prev.q5 || {}),
                    q5_1: value
                  }
                }));
              }}
            >
              <option value="">Select the correct description...</option>
              <option value="a">Focusing on key information and ignoring unnecessary details</option>
              <option value="b">Identifying similarities or trends in data</option>
              <option value="c">Breaking down complex problems</option>
              <option value="d">Creating a step-by-step process</option>
            </select>
          </div>
          
          <div className={styles.matchingPair}>
            <div className={styles.matchingConcept}>
              2. Pattern Recognition
            </div>
            <select
              className={styles.matchingSelect}
              value={answers.q5?.q5_2 || ''}
              onChange={(e) => {
                const value = e.target.value;
                setAnswers(prev => ({
                  ...prev,
                  q5: {
                    ...(prev.q5 || {}),
                    q5_2: value
                  }
                }));
              }}
            >
              <option value="">Select the correct description...</option>
              <option value="a">Focusing on key information and ignoring unnecessary details</option>
              <option value="b">Identifying similarities or trends in data</option>
              <option value="c">Breaking down complex problems</option>
              <option value="d">Creating a step-by-step process</option>
            </select>
          </div>

          <div className={styles.matchingPair}>
            <div className={styles.matchingConcept}>
              3. Abstraction  
            </div>
            <select
              className={styles.matchingSelect}
              value={answers.q5?.q5_3 || ''}
              onChange={(e) => {
                const value = e.target.value;
                setAnswers(prev => ({
                  ...prev,
                  q5: {
                    ...(prev.q5 || {}),
                    q5_3: value
                  }
                }));
              }}
            >
              <option value="">Select the correct description...</option>
              <option value="a">Focusing on key information and ignoring unnecessary details</option>
              <option value="b">Identifying similarities or trends in data</option>
              <option value="c">Breaking down complex problems</option>
              <option value="d">Creating a step-by-step process</option>
            </select>
          </div>

          <div className={styles.matchingPair}>
            <div className={styles.matchingConcept}>
              4. Algorithm Design
            </div>
            <select
              className={styles.matchingSelect}
              value={answers.q5?.q5_4 || ''}
              onChange={(e) => {
                const value = e.target.value;
                setAnswers(prev => ({
                  ...prev,
                  q5: {
                    ...(prev.q5 || {}),
                    q5_4: value
                  }
                }));
              }}
            >
              <option value="">Select the correct description...</option>
              <option value="a">Focusing on key information and ignoring unnecessary details</option>
              <option value="b">Identifying similarities or trends in data</option>
              <option value="c">Breaking down complex problems</option>
              <option value="d">Creating a step-by-step process</option>
            </select>
          </div>
        </div>
      </div>

      <button 
        className={styles.submitButton}
        onClick={checkAnswers}
      >
        Submit Test
      </button>

      {feedback && (
        <div className={styles.feedback}>
          <h3>Assessment Results</h3>
          <p>You scored {feedback.score} out of 5 ({feedback.percentage}%)</p>
          <p>{feedback.passed ? 'Congratulations! You passed the assessment.' : 'Please review the material and try again.'}</p>
        </div>  
      )}
    </div>
  );
};

export default Quiz;