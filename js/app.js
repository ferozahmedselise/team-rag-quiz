/**
 * AI Certification Exam Engine Application Script
 * Controls exam state, question shuffling, timer, UI rendering, scoring, persistence, and review generation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Exam Configuration & State
  const EXAM_CONFIG = {
    totalQuestions: 25,
    passingPercentage: 80,
    passingScore: 20, // 20 / 25
    timeLimitMinutes: 30
  };

  let candidateInfo = { name: "", email: "", id: "" };
  let activeQuestions = [];
  let userAnswers = {}; // { questionId: selectedIndex }
  let flaggedQuestions = new Set();
  let currentIndex = 0;
  let timerInterval = null;
  let remainingSeconds = EXAM_CONFIG.timeLimitMinutes * 60;
  let isSubmitted = false;

  // DOM Element Handles
  const elements = {
    welcomeCard: document.getElementById("welcome-screen"),
    examContainer: document.getElementById("exam-screen"),
    resultsContainer: document.getElementById("results-screen"),
    registrationForm: document.getElementById("registration-form"),
    candidateNameInput: document.getElementById("candidate-name"),
    candidateEmailInput: document.getElementById("candidate-email"),
    candidateIdInput: document.getElementById("candidate-id"),
    
    // Exam Header
    timerDisplay: document.getElementById("timer-display"),
    progressBar: document.getElementById("exam-progress-bar"),
    progressText: document.getElementById("exam-progress-text"),
    strikeBadgeText: document.getElementById("strike-badge-text"),
    candidateHeaderName: document.getElementById("header-candidate-name"),

    // Question Panel
    questionCategory: document.getElementById("question-category"),
    questionNumber: document.getElementById("question-number"),
    questionText: document.getElementById("question-text"),
    optionsContainer: document.getElementById("options-container"),
    flagBtn: document.getElementById("flag-btn"),
    prevBtn: document.getElementById("prev-btn"),
    nextBtn: document.getElementById("next-btn"),
    submitExamBtn: document.getElementById("submit-exam-btn"),

    // Sidebar Jump Grid
    questionGrid: document.getElementById("question-grid"),
    answeredCount: document.getElementById("answered-count"),
    flaggedCount: document.getElementById("flagged-count"),

    // Results Dashboard
    resultCandidateName: document.getElementById("res-candidate-name"),
    resultCandidateId: document.getElementById("res-candidate-id"),
    resultDate: document.getElementById("res-date"),
    badgeStatus: document.getElementById("badge-status"),
    scoreFraction: document.getElementById("score-fraction"),
    scorePercent: document.getElementById("score-percent"),
    circleScoreProgress: document.getElementById("circle-score-progress"),
    domainBreakdownContainer: document.getElementById("domain-breakdown"),
    reviewQuestionsContainer: document.getElementById("review-questions-container"),
    restartBtn: document.getElementById("restart-exam-btn"),

    // Modals & Anti-Cheat
    confirmSubmitModal: document.getElementById("confirm-submit-modal"),
    confirmModalText: document.getElementById("confirm-modal-text"),
    confirmSubmitYes: document.getElementById("confirm-submit-yes"),
    confirmSubmitNo: document.getElementById("confirm-submit-no"),
    strikeModalClose: document.getElementById("strike-modal-close"),
    fullscreenReenterBtn: document.getElementById("reenter-fullscreen-btn")
  };

  // Initialize AntiCheat System
  AntiCheat.init({
    onViolation: (data) => {
      if (elements.strikeBadgeText) {
        elements.strikeBadgeText.textContent = `${data.strikeCount} / ${data.maxStrikes}`;
      }
    },
    onAutoSubmit: () => {
      submitExam(true);
    }
  });

  // Event Listeners
  if (elements.registrationForm) {
    elements.registrationForm.addEventListener("submit", handleRegistration);
  }

  if (elements.prevBtn) {
    elements.prevBtn.addEventListener("click", () => navigateQuestion(-1));
  }
  if (elements.nextBtn) {
    elements.nextBtn.addEventListener("click", () => navigateQuestion(1));
  }
  if (elements.flagBtn) {
    elements.flagBtn.addEventListener("click", toggleFlagCurrentQuestion);
  }
  if (elements.submitExamBtn) {
    elements.submitExamBtn.addEventListener("click", promptSubmitConfirmation);
  }

  if (elements.confirmSubmitYes) {
    elements.confirmSubmitYes.addEventListener("click", () => {
      closeSubmitModal();
      submitExam(false);
    });
  }
  if (elements.confirmSubmitNo) {
    elements.confirmSubmitNo.addEventListener("click", closeSubmitModal);
  }

  if (elements.strikeModalClose) {
    elements.strikeModalClose.addEventListener("click", () => AntiCheat.hideViolationModal());
  }

  if (elements.fullscreenReenterBtn) {
    elements.fullscreenReenterBtn.addEventListener("click", () => {
      AntiCheat.requestFullscreen();
      AntiCheat.hideFullscreenWarning();
    });
  }

  if (elements.restartBtn) {
    elements.restartBtn.addEventListener("click", resetExam);
  }

  // Handle Registration & Start Test
  function handleRegistration(e) {
    e.preventDefault();
    candidateInfo.name = elements.candidateNameInput.value.trim() || "Candidate";
    candidateInfo.email = elements.candidateEmailInput.value.trim() || "candidate@example.com";
    candidateInfo.id = elements.candidateIdInput.value.trim() || "AI-8092";

    if (elements.candidateHeaderName) {
      elements.candidateHeaderName.textContent = candidateInfo.name;
    }

    startNewExam();
  }

  function startNewExam() {
    isSubmitted = false;
    userAnswers = {};
    flaggedQuestions.clear();
    currentIndex = 0;
    remainingSeconds = EXAM_CONFIG.timeLimitMinutes * 60;

    // Shuffle Questions and their Options using Fisher-Yates
    activeQuestions = prepareShuffledQuestions(quizQuestions);

    // Switch Views
    elements.welcomeCard.classList.add("hidden");
    elements.resultsContainer.classList.add("hidden");
    elements.examContainer.classList.remove("hidden");

    // Activate Anti-cheat & Fullscreen
    AntiCheat.startExam();

    // Render Navigation Grid & First Question
    renderQuestionGrid();
    renderCurrentQuestion();
    startTimer();
  }

  function prepareShuffledQuestions(questions) {
    const cloned = JSON.parse(JSON.stringify(questions));
    const shuffledQ = shuffleArray(cloned);

    return shuffledQ.map((q) => {
      const originalCorrectString = q.options[q.correctIndex];
      const shuffledOpt = shuffleArray([...q.options]);
      const newCorrectIndex = shuffledOpt.indexOf(originalCorrectString);

      return {
        ...q,
        options: shuffledOpt,
        correctIndex: newCorrectIndex
      };
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Timer Control
  function startTimer() {
    clearInterval(timerInterval);
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      remainingSeconds--;
      updateTimerDisplay();

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        submitExam(true);
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    
    if (elements.timerDisplay) {
      elements.timerDisplay.textContent = formatted;
      if (remainingSeconds <= 300) { // < 5 mins
        elements.timerDisplay.classList.add("timer-urgent");
      } else {
        elements.timerDisplay.classList.remove("timer-urgent");
      }
    }
  }

  // Question Rendering
  function renderCurrentQuestion() {
    const q = activeQuestions[currentIndex];
    if (!q) return;

    elements.questionCategory.textContent = q.category;
    elements.questionNumber.textContent = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
    elements.questionText.textContent = q.question;

    // Render Option Buttons
    elements.optionsContainer.innerHTML = "";
    q.options.forEach((optText, optIndex) => {
      const optionCard = document.createElement("button");
      optionCard.type = "button";
      optionCard.className = "option-card";
      if (userAnswers[q.id] === optIndex) {
        optionCard.classList.add("selected");
      }

      const letterPrefix = String.fromCharCode(65 + optIndex);
      optionCard.innerHTML = `
        <span class="option-prefix">${letterPrefix}</span>
        <span class="option-text">${escapeHTML(optText)}</span>
      `;

      optionCard.addEventListener("click", () => selectOption(q.id, optIndex));
      elements.optionsContainer.appendChild(optionCard);
    });

    // Update Flag Button State
    if (flaggedQuestions.has(q.id)) {
      elements.flagBtn.classList.add("flagged");
      elements.flagBtn.innerHTML = `🚩 Flagged`;
    } else {
      elements.flagBtn.classList.remove("flagged");
      elements.flagBtn.innerHTML = `🏳️ Flag for Review`;
    }

    // Navigation buttons disabled state
    elements.prevBtn.disabled = currentIndex === 0;
    if (currentIndex === activeQuestions.length - 1) {
      elements.nextBtn.textContent = "Review & Submit";
    } else {
      elements.nextBtn.textContent = "Next Question →";
    }

    updateProgressUI();
  }

  function selectOption(questionId, optionIndex) {
    if (isSubmitted) return;
    userAnswers[questionId] = optionIndex;
    renderCurrentQuestion();
    renderQuestionGrid();
  }

  function toggleFlagCurrentQuestion() {
    const q = activeQuestions[currentIndex];
    if (flaggedQuestions.has(q.id)) {
      flaggedQuestions.delete(q.id);
    } else {
      flaggedQuestions.add(q.id);
    }
    renderCurrentQuestion();
    renderQuestionGrid();
  }

  function navigateQuestion(direction) {
    const nextIdx = currentIndex + direction;
    if (nextIdx >= 0 && nextIdx < activeQuestions.length) {
      currentIndex = nextIdx;
      renderCurrentQuestion();
      renderQuestionGrid();
    } else if (nextIdx === activeQuestions.length) {
      promptSubmitConfirmation();
    }
  }

  // Sidebar Question Grid
  function renderQuestionGrid() {
    elements.questionGrid.innerHTML = "";
    activeQuestions.forEach((q, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "grid-item";

      if (idx === currentIndex) btn.classList.add("active");
      if (userAnswers[q.id] !== undefined) btn.classList.add("answered");
      if (flaggedQuestions.has(q.id)) btn.classList.add("flagged");

      btn.textContent = idx + 1;
      btn.addEventListener("click", () => {
        currentIndex = idx;
        renderCurrentQuestion();
        renderQuestionGrid();
      });

      elements.questionGrid.appendChild(btn);
    });

    // Update Counters
    const answeredCountVal = Object.keys(userAnswers).length;
    elements.answeredCount.textContent = `${answeredCountVal} / ${activeQuestions.length}`;
    elements.flaggedCount.textContent = flaggedQuestions.size;
  }

  function updateProgressUI() {
    const answeredCountVal = Object.keys(userAnswers).length;
    const pct = Math.round((answeredCountVal / activeQuestions.length) * 100);
    elements.progressBar.style.width = `${pct}%`;
    elements.progressText.textContent = `${pct}% Complete`;
  }

  // Submission & Scoring Engine
  function promptSubmitConfirmation() {
    const answeredVal = Object.keys(userAnswers).length;
    const remainingVal = activeQuestions.length - answeredVal;

    elements.confirmModalText.innerHTML = `
      You have answered <strong>${answeredVal}</strong> out of <strong>${activeQuestions.length}</strong> questions.<br>
      ${remainingVal > 0 ? `<span style="color: var(--danger-color); font-weight:600;">⚠️ You have ${remainingVal} unanswered question(s).</span>` : 'All questions answered!'}
      <br><br>Are you sure you want to submit your final exam answers now?
    `;
    elements.confirmSubmitModal.classList.add("active");
  }

  function closeSubmitModal() {
    elements.confirmSubmitModal.classList.remove("active");
  }

  function submitExam(isAutoSubmit = false) {
    if (isSubmitted) return;
    isSubmitted = true;

    clearInterval(timerInterval);
    AntiCheat.stopExam();

    // Calculate Score & Results
    let correctCount = 0;
    const domainScores = {};

    const questionsReview = activeQuestions.map((q) => {
      if (!domainScores[q.category]) {
        domainScores[q.category] = { total: 0, correct: 0 };
      }
      domainScores[q.category].total++;

      const chosenIndex = userAnswers[q.id];
      if (chosenIndex === q.correctIndex) {
        correctCount++;
        domainScores[q.category].correct++;
      }

      return {
        id: q.id,
        category: q.category,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        chosenIndex: chosenIndex,
        explanation: q.explanation
      };
    });

    const percentage = Math.round((correctCount / activeQuestions.length) * 100);
    const passed = correctCount >= EXAM_CONFIG.passingScore; // 20 / 25 (80%)
    const timeSpentSeconds = EXAM_CONFIG.timeLimitMinutes * 60 - remainingSeconds;

    const resultPayload = {
      id: "RES-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      candidate: candidateInfo,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleString(),
      correctCount,
      totalQuestions: activeQuestions.length,
      percentage,
      passed,
      strikes: AntiCheat.getStrikes(),
      timeSpentSeconds,
      isAutoSubmit,
      domainScores,
      questionsReview
    };

    // Save to LocalStorage & Send to Backend API
    saveResultToStorageAndAPI(resultPayload);

    renderResultsScreen({
      candidate: candidateInfo,
      correctCount,
      totalQuestions: activeQuestions.length,
      percentage,
      passed,
      domainScores,
      isAutoSubmit
    });
  }

  function saveResultToStorageAndAPI(resultPayload) {
    // 1. LocalStorage Fallback
    try {
      const stored = JSON.parse(localStorage.getItem("quiz_results") || "[]");
      stored.unshift(resultPayload); // Latest first
      localStorage.setItem("quiz_results", JSON.stringify(stored));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }

    // 2. REST API Persist
    fetch("/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resultPayload)
    }).catch((err) => {
      console.warn("Backend API save failed (will rely on localStorage):", err);
    });
  }

  function renderResultsScreen(data) {
    elements.examContainer.classList.add("hidden");
    elements.resultsContainer.classList.remove("hidden");

    elements.resultCandidateName.textContent = data.candidate.name;
    elements.resultCandidateId.textContent = `ID: ${data.candidate.id}`;
    elements.resultDate.textContent = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    // Pass / Fail Badge
    if (data.passed) {
      elements.badgeStatus.className = "pass-fail-badge badge-pass";
      elements.badgeStatus.innerHTML = `🏆 CERTIFIED - PASS (${data.percentage}%)`;
    } else {
      elements.badgeStatus.className = "pass-fail-badge badge-fail";
      elements.badgeStatus.innerHTML = `❌ NOT PASSED (${data.percentage}%)`;
    }

    elements.scoreFraction.textContent = `${data.correctCount} / ${data.totalQuestions}`;
    elements.scorePercent.textContent = `${data.percentage}%`;

    // Animate Circle SVG Progress Ring
    const strokeDashoffset = 339 - (339 * data.percentage) / 100;
    setTimeout(() => {
      elements.circleScoreProgress.style.strokeDashoffset = strokeDashoffset;
      elements.circleScoreProgress.style.stroke = data.passed ? "#10b981" : "#ef4444";
    }, 100);

    // Render Domain Scores
    elements.domainBreakdownContainer.innerHTML = "";
    Object.keys(data.domainScores).forEach((domain) => {
      const stats = data.domainScores[domain];
      const domPct = Math.round((stats.correct / stats.total) * 100);

      const domainCard = document.createElement("div");
      domainCard.className = "domain-card";
      domainCard.innerHTML = `
        <div class="domain-header">
          <span class="domain-name">${domain}</span>
          <span class="domain-score">${stats.correct}/${stats.total} (${domPct}%)</span>
        </div>
        <div class="domain-progress-bar">
          <div class="domain-progress-fill" style="width: ${domPct}%; background-color: ${domPct >= 80 ? '#10b981' : '#f59e0b'};"></div>
        </div>
      `;
      elements.domainBreakdownContainer.appendChild(domainCard);
    });

    // Render Question-by-Question Detailed Review
    renderDetailedReview();
  }

  function renderDetailedReview() {
    elements.reviewQuestionsContainer.innerHTML = "";

    activeQuestions.forEach((q, idx) => {
      const chosenIndex = userAnswers[q.id];
      const isCorrect = chosenIndex === q.correctIndex;
      const isUnanswered = chosenIndex === undefined;

      const reviewCard = document.createElement("div");
      reviewCard.className = `review-card ${isCorrect ? "review-correct" : "review-incorrect"}`;

      let optionsHTML = "";
      q.options.forEach((optText, optIdx) => {
        let optClass = "review-option";
        let optIcon = "";

        if (optIdx === q.correctIndex) {
          optClass += " opt-correct";
          optIcon = "✓ Correct Answer";
        } else if (optIdx === chosenIndex && !isCorrect) {
          optClass += " opt-user-incorrect";
          optIcon = "✗ Your Answer";
        }

        const letter = String.fromCharCode(65 + optIdx);
        optionsHTML += `
          <div class="${optClass}">
            <div class="opt-left">
              <span class="review-letter">${letter}</span>
              <span>${escapeHTML(optText)}</span>
            </div>
            ${optIcon ? `<span class="opt-tag">${optIcon}</span>` : ""}
          </div>
        `;
      });

      reviewCard.innerHTML = `
        <div class="review-card-header">
          <span class="review-q-num">Q${idx + 1}. [${q.category}]</span>
          <span class="review-status-badge ${isCorrect ? "badge-green" : "badge-red"}">
            ${isCorrect ? "Correct (+1)" : isUnanswered ? "Unanswered (0)" : "Incorrect (0)"}
          </span>
        </div>
        <h4 class="review-question-text">${escapeHTML(q.question)}</h4>
        <div class="review-options-list">${optionsHTML}</div>
        <div class="review-explanation">
          <strong>💡 Explanation:</strong> ${escapeHTML(q.explanation)}
        </div>
      `;

      elements.reviewQuestionsContainer.appendChild(reviewCard);
    });
  }

  function resetExam() {
    elements.resultsContainer.classList.add("hidden");
    elements.welcomeCard.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
