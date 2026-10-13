
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isRunning || submitted || time === 0) return;

    const timerId = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsRunning(false);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, submitted, time]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const startExam = () => {
    if (!submitted && time > 0) setIsRunning(true);
  };

  const pauseExam = () => setIsRunning(false);

  const resetExam = () => {
    setTime(600);
    setIsRunning(false);
    setSubmitted(false);
  };

  const submitExam = () => {
    setIsRunning(false);
    setSubmitted(true);
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Online Examination System</h1>
        <p>Full Stack Web Development Project</p>
      </header>

      <main className="exam-card">
        <h2>Examination Timer</h2>
        <p className="description">
          Complete your examination before the time expires.
        </p>

        <div className={`timer-box ${time <= 60 ? "warning" : ""}`}>
          <span className="clock">⏱</span>
          <h3>{formatTime(time)}</h3>
          <p>Time Remaining</p>
        </div>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${(time / 600) * 100}%` }}
          />
        </div>

        <p className="status">
          {submitted
            ? "Examination Submitted"
            : isRunning
            ? "Exam in Progress"
            : "Ready to Start"}
        </p>

        {submitted ? (
          <div className="result">
            <h3>Exam Submitted Successfully!</h3>
            <p>Your examination session has ended.</p>
            <button onClick={resetExam}>Restart Exam</button>
          </div>
        ) : (
          <div className="buttons">
            <button
              className="start"
              onClick={startExam}
              disabled={isRunning}
            >
              Start
            </button>

            <button
              className="pause"
              onClick={pauseExam}
              disabled={!isRunning}
            >
              Pause
            </button>

            <button className="reset" onClick={resetExam}>
              Reset
            </button>

            <button className="submit" onClick={submitExam}>
              Submit Exam
            </button>
          </div>
        )}

        <p className="note">
          Duration: 10 minutes | Timer updates every second
        </p>
      </main>

      <footer>
        Online Examination Timer | React Hooks Project
      </footer>
    </div>
  );
}

export default App;
