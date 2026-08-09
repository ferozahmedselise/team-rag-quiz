/**
 * AI Certification Exam Engine Application Script
 * Controls candidate login, quiz set selection, multi-attempt retakes, exam state,
 * timer, UI rendering, scoring, SQLite persistence, and attempt history browsing.
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
  let currentExamSet = { setId: "set-1", setName: "Quiz Set 1" };
  let activeQuestions = [];
  let userAnswers = {}; // { questionId: selectedIndex }
  let flaggedQuestions = new Set();
  let currentIndex = 0;
  let timerInterval = null;
  let remainingSeconds = EXAM_CONFIG.timeLimitMinutes * 60;
  let isSubmitted = false;
  let userAttemptHistory = [];

  // DOM Element Handles
  const elements = {
    welcomeCard: document.getElementById("welcome-screen"),
    examContainer: document.getElementById("exam-screen"),
    resultsContainer: document.getElementById("results-screen"),
    registrationForm: document.getElementById("registration-form"),
    candidateEmailInput: document.getElementById("candidate-email"),
    candidatePasswordInput: document.getElementById("candidate-password"),
    quizSetSelect: document.getElementById("quiz-set-select"),
    userLoginErrorMsg: document.getElementById("user-login-error"),
    userHistorySection: document.getElementById("user-history-section"),
    userHistoryList: document.getElementById("user-history-list"),
    startNewAttemptBtn: document.getElementById("start-new-attempt-btn"),
    
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
    loginBox: document.getElementById("login-box"),
    candidateDashboard: document.getElementById("candidate-dashboard"),
    dashboardUserEmail: document.getElementById("dashboard-user-email"),
    userLogoutBtn: document.getElementById("user-logout-btn"),
    topLogoutBtn: document.getElementById("top-logout-btn"),
    upperWelcomeSection: document.getElementById("upper-welcome-section"),
    startSelectedQuizBtn: document.getElementById("start-selected-quiz-btn"),
    confirmSubmitModal: document.getElementById("confirm-submit-modal"),
    confirmModalText: document.getElementById("confirm-modal-text"),
    confirmSubmitYes: document.getElementById("confirm-submit-yes"),
    confirmSubmitNo: document.getElementById("confirm-submit-no"),
    strikeModalClose: document.getElementById("strike-modal-close"),
    fullscreenReenterBtn: document.getElementById("reenter-fullscreen-btn")
  };

  // 1. Populate Quiz Set Selection Dropdown & Check Session
  populateQuizSetDropdown();
  checkAndRestoreSession();

  function checkAndRestoreSession() {
    try {
      const savedSessionStr = localStorage.getItem("quiz_candidate_session") || sessionStorage.getItem("quiz_candidate_session");
      if (!savedSessionStr) return;

      const session = JSON.parse(savedSessionStr);
      if (session && session.email && session.id) {
        candidateInfo.email = session.email;
        candidateInfo.id = session.id;
        candidateInfo.name = session.email.split("@")[0];

        if (elements.candidateHeaderName) {
          elements.candidateHeaderName.textContent = candidateInfo.email;
        }
        if (elements.dashboardUserEmail) {
          elements.dashboardUserEmail.textContent = candidateInfo.email;
        }

        if (elements.topLogoutBtn) elements.topLogoutBtn.classList.remove("hidden");
        if (elements.upperWelcomeSection) elements.upperWelcomeSection.classList.add("hidden");
        if (elements.loginBox) elements.loginBox.classList.add("hidden");
        if (elements.candidateDashboard) elements.candidateDashboard.classList.remove("hidden");

        fetchCandidateHistory();
      }
    } catch (e) {
      console.warn("Session restore failed:", e);
    }
  }

  function populateQuizSetDropdown() {
    if (!elements.quizSetSelect) return;
    elements.quizSetSelect.innerHTML = "";

    if (typeof QUIZ_SETS !== "undefined" && Array.isArray(QUIZ_SETS) && QUIZ_SETS.length > 0) {
      QUIZ_SETS.forEach((setObj) => {
        const opt = document.createElement("option");
        opt.value = setObj.setId;
        opt.textContent = `${setObj.setName} — 25 Questions (30 Mins)`;
        elements.quizSetSelect.appendChild(opt);
      });
    } else {
      const opt = document.createElement("option");
      opt.value = "default";
      opt.textContent = "Default AI Certification Set (25 Questions)";
      elements.quizSetSelect.appendChild(opt);
    }
  }

  // 2. Initialize AntiCheat System (Silent tracking without auto-submit or popups)
  AntiCheat.init({
    onViolation: (data) => {
      if (elements.strikeBadgeText) {
        elements.strikeBadgeText.textContent = `${data.strikeCount}`;
      }
    },
    onAutoSubmit: null
  });

  // Event Listeners
  if (elements.registrationForm) {
    elements.registrationForm.addEventListener("submit", handleParticipantLogin);
  }

  if (elements.startSelectedQuizBtn) {
    elements.startSelectedQuizBtn.addEventListener("click", () => {
      if (candidateInfo.email) {
        startNewExam();
      } else {
        alert("Please log in first.");
      }
    });
  }

  if (elements.userLogoutBtn) {
    elements.userLogoutBtn.addEventListener("click", handleLogout);
  }

  if (elements.topLogoutBtn) {
    elements.topLogoutBtn.addEventListener("click", handleLogout);
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

  // Handle Participant Login & Show Dashboard
  function handleParticipantLogin(e) {
    e.preventDefault();
    const email = elements.candidateEmailInput.value.trim();
    const password = elements.candidatePasswordInput.value.trim();

    fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Authentication failed");
        return res.json();
      })
      .then((data) => {
        elements.userLoginErrorMsg.classList.add("hidden");
        candidateInfo.name = data.user.email.split("@")[0];
        candidateInfo.email = data.user.email;
        candidateInfo.id = data.user.id;

        // Persist candidate session for page reloads
        const sessionData = { id: data.user.id, email: data.user.email };
        localStorage.setItem("quiz_candidate_session", JSON.stringify(sessionData));
        sessionStorage.setItem("quiz_candidate_session", JSON.stringify(sessionData));

        if (elements.candidateHeaderName) {
          elements.candidateHeaderName.textContent = candidateInfo.email;
        }
        if (elements.dashboardUserEmail) {
          elements.dashboardUserEmail.textContent = candidateInfo.email;
        }

        // Show top logout button and hide upper section & login card
        if (elements.topLogoutBtn) elements.topLogoutBtn.classList.remove("hidden");
        if (elements.upperWelcomeSection) elements.upperWelcomeSection.classList.add("hidden");
        if (elements.loginBox) elements.loginBox.classList.add("hidden");
        if (elements.candidateDashboard) elements.candidateDashboard.classList.remove("hidden");

        userAttemptHistory = data.history || [];
        renderUserHistoryList(userAttemptHistory);
      })
      .catch(() => {
        elements.userLoginErrorMsg.textContent = "Invalid email or password. Only registered participants can log in.";
        elements.userLoginErrorMsg.classList.remove("hidden");
      });
  }

  function handleLogout() {
    candidateInfo = { name: "", email: "", id: "" };
    userAttemptHistory = [];

    // Clear saved session
    localStorage.removeItem("quiz_candidate_session");
    sessionStorage.removeItem("quiz_candidate_session");

    if (elements.topLogoutBtn) elements.topLogoutBtn.classList.add("hidden");
    if (elements.candidateHeaderName) elements.candidateHeaderName.textContent = "Guest Candidate";
    if (elements.candidateDashboard) elements.candidateDashboard.classList.add("hidden");
    if (elements.upperWelcomeSection) elements.upperWelcomeSection.classList.remove("hidden");
    if (elements.loginBox) elements.loginBox.classList.remove("hidden");
    if (elements.candidateEmailInput) elements.candidateEmailInput.value = "";
    if (elements.candidatePasswordInput) elements.candidatePasswordInput.value = "";
  }

  function fetchCandidateHistory() {
    if (!candidateInfo.email) return;
    fetch(`/api/user/results?email=${encodeURIComponent(candidateInfo.email)}`)
      .then((res) => res.json())
      .then((history) => {
        userAttemptHistory = history || [];
        renderUserHistoryList(userAttemptHistory);
      })
      .catch((err) => console.warn("Failed to fetch user history:", err));
  }

  function renderUserHistoryList(historyArray) {
    if (!elements.userHistorySection || !elements.userHistoryList) return;

    if (!historyArray || historyArray.length === 0) {
      elements.userHistorySection.classList.add("hidden");
      return;
    }

    elements.userHistorySection.classList.remove("hidden");
    elements.userHistoryList.innerHTML = "";

    historyArray.forEach((item, index) => {
      const itemCard = document.createElement("div");
      itemCard.style.cssText =
        "display: flex; justify-content: space-between; align-items: center; background: rgba(15,23,42,0.6); padding: 0.85rem 1.2rem; border-radius: 8px; border: 1px solid var(--border-color); flex-wrap: wrap; gap: 0.5rem;";

      const passBadge = item.passed
        ? '<span style="color: var(--success-color); font-weight: 600; background: rgba(34,197,94,0.15); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">PASS</span>'
        : '<span style="color: var(--danger-color); font-weight: 600; background: rgba(239,68,68,0.15); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">FAIL</span>';

      const setLabel = item.setName || (item.setId ? `Quiz Set ${item.setId.replace("set-", "")}` : "AI Certification Quiz");
      const dateStr = item.formattedDate || (item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "Recent");

      itemCard.innerHTML = `
        <div>
          <div style="font-weight: 600; font-size: 0.95rem; color: #f8fafc;">${escapeHTML(setLabel)} ${passBadge}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
            📅 ${escapeHTML(dateStr)} | Score: <strong>${item.correctCount} / ${item.totalQuestions || 25} (${item.percentage}%)</strong>
          </div>
        </div>
        <button type="button" class="btn-secondary view-past-result-btn" style="padding: 0.3rem 0.75rem; font-size: 0.8rem;">🔍 View Details</button>
      `;

      const viewBtn = itemCard.querySelector(".view-past-result-btn");
      viewBtn.addEventListener("click", () => {
        renderResultsScreen(item, false);
      });

      elements.userHistoryList.appendChild(itemCard);
    });
  }

  function startNewExam() {
    isSubmitted = false;
    userAnswers = {};
    flaggedQuestions.clear();
    currentIndex = 0;
    remainingSeconds = EXAM_CONFIG.timeLimitMinutes * 60;

    // Determine selected Quiz Set
    const selectedSetId = elements.quizSetSelect ? elements.quizSetSelect.value : "set-1";
    let selectedSetObj = null;

    if (typeof QUIZ_SETS !== "undefined" && Array.isArray(QUIZ_SETS)) {
      selectedSetObj = QUIZ_SETS.find((s) => s.setId === selectedSetId) || QUIZ_SETS[0];
    }

    if (selectedSetObj) {
      currentExamSet = {
        setId: selectedSetObj.setId,
        setName: selectedSetObj.setName
      };
      activeQuestions = prepareShuffledQuestions(selectedSetObj.questions);
    } else {
      currentExamSet = { setId: "default", setName: "AI Certification Quiz" };
      activeQuestions = prepareShuffledQuestions(quizQuestions);
    }

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
        submitExam(true); // Auto-submit on time expiry
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    if (!elements.timerDisplay) return;
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    elements.timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (remainingSeconds < 300) {
      elements.timerDisplay.style.color = "var(--danger-color)";
    } else {
      elements.timerDisplay.style.color = "var(--accent-glow)";
    }
  }

  // Question Navigation & UI Rendering
  function renderCurrentQuestion() {
    if (!activeQuestions[currentIndex]) return;
    const q = activeQuestions[currentIndex];

    elements.questionCategory.textContent = `${currentExamSet.setName} • ${q.category}`;
    elements.questionNumber.textContent = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
    elements.questionText.innerHTML = formatMarkdown(q.question);

    // Render Options
    elements.optionsContainer.innerHTML = "";
    q.options.forEach((optText, optIdx) => {
      const card = document.createElement("div");
      card.className = `option-card ${userAnswers[q.id] === optIdx ? "selected" : ""}`;
      
      const letter = String.fromCharCode(65 + optIdx);
      card.innerHTML = `
        <div class="option-letter">${letter}</div>
        <div class="option-text">${formatMarkdown(optText)}</div>
      `;

      card.addEventListener("click", () => selectOption(q.id, optIdx));
      elements.optionsContainer.appendChild(card);
    });

    // Update Flag Button
    if (flaggedQuestions.has(q.id)) {
      elements.flagBtn.classList.add("flagged");
      elements.flagBtn.textContent = "🚩 Flagged";
    } else {
      elements.flagBtn.classList.remove("flagged");
      elements.flagBtn.textContent = "🏳️ Flag for Review";
    }

    // Controls State
    elements.prevBtn.disabled = currentIndex === 0;
    if (currentIndex === activeQuestions.length - 1) {
      elements.nextBtn.style.display = "none";
      elements.submitExamBtn.style.display = "inline-flex";
    } else {
      elements.nextBtn.style.display = "inline-flex";
      elements.submitExamBtn.style.display = "inline-flex";
    }

    updateProgressBar();
    highlightCurrentGridCell();
  }

  function selectOption(qId, optIndex) {
    if (isSubmitted) return;
    userAnswers[qId] = optIndex;
    renderCurrentQuestion();
    renderQuestionGrid();
  }

  function toggleFlagCurrentQuestion() {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;

    if (flaggedQuestions.has(currentQ.id)) {
      flaggedQuestions.delete(currentQ.id);
    } else {
      flaggedQuestions.add(currentQ.id);
    }

    renderCurrentQuestion();
    renderQuestionGrid();
  }

  function navigateQuestion(direction) {
    const newIdx = currentIndex + direction;
    if (newIdx >= 0 && newIdx < activeQuestions.length) {
      currentIndex = newIdx;
      renderCurrentQuestion();
    }
  }

  function renderQuestionGrid() {
    if (!elements.questionGrid) return;
    elements.questionGrid.innerHTML = "";

    activeQuestions.forEach((q, idx) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "grid-cell";
      cell.textContent = idx + 1;

      if (userAnswers[q.id] !== undefined) {
        cell.classList.add("answered");
      }
      if (flaggedQuestions.has(q.id)) {
        cell.classList.add("flagged");
      }
      if (idx === currentIndex) {
        cell.classList.add("current");
      }

      cell.addEventListener("click", () => {
        currentIndex = idx;
        renderCurrentQuestion();
      });

      elements.questionGrid.appendChild(cell);
    });

    // Update Counts
    const ansCount = Object.keys(userAnswers).length;
    if (elements.answeredCount) elements.answeredCount.textContent = `${ansCount} / ${activeQuestions.length}`;
    if (elements.flaggedCount) elements.flaggedCount.textContent = flaggedQuestions.size;
  }

  function highlightCurrentGridCell() {
    const cells = elements.questionGrid.querySelectorAll(".grid-cell");
    cells.forEach((c, idx) => {
      if (idx === currentIndex) {
        c.classList.add("current");
      } else {
        c.classList.remove("current");
      }
    });
  }

  function updateProgressBar() {
    const ansCount = Object.keys(userAnswers).length;
    const pct = Math.round((ansCount / activeQuestions.length) * 100);
    if (elements.progressBar) elements.progressBar.style.width = `${pct}%`;
    if (elements.progressText) elements.progressText.textContent = `${pct}% Complete (${ansCount}/${activeQuestions.length})`;
  }

  // Submission Flow
  function promptSubmitConfirmation() {
    const ansCount = Object.keys(userAnswers).length;
    const total = activeQuestions.length;
    const unanswered = total - ansCount;

    let msg = `You have answered ${ansCount} of ${total} questions.`;
    if (unanswered > 0) {
      msg += ` Warning: ${unanswered} question(s) remain unanswered.`;
    }
    msg += " Are you sure you want to submit now?";

    if (elements.confirmModalText) elements.confirmModalText.textContent = msg;
    if (elements.confirmSubmitModal) elements.confirmSubmitModal.classList.add("active");
  }

  function closeSubmitModal() {
    if (elements.confirmSubmitModal) elements.confirmSubmitModal.classList.remove("active");
  }

  function submitExam(isAutoSubmit = false) {
    if (isSubmitted) return;
    isSubmitted = true;
    clearInterval(timerInterval);
    AntiCheat.stopExam();

    // Calculate Score
    let correctCount = 0;
    const domainScores = {};
    const questionsReview = [];

    activeQuestions.forEach((q) => {
      const chosenIdx = userAnswers[q.id];
      const isCorrect = chosenIdx === q.correctIndex;
      if (isCorrect) correctCount++;

      // Domain tracking
      if (!domainScores[q.category]) {
        domainScores[q.category] = { total: 0, correct: 0 };
      }
      domainScores[q.category].total++;
      if (isCorrect) domainScores[q.category].correct++;

      questionsReview.push({
        id: q.id,
        category: q.category,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        chosenIndex: chosenIdx !== undefined ? chosenIdx : -1,
        explanation: q.explanation
      });
    });

    const percentage = Math.round((correctCount / activeQuestions.length) * 100);
    const passed = percentage >= EXAM_CONFIG.passingPercentage;
    const timeSpent = EXAM_CONFIG.timeLimitMinutes * 60 - remainingSeconds;

    const resultPayload = {
      id: `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      setId: currentExamSet.setId,
      setName: currentExamSet.setName,
      candidate: candidateInfo,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      correctCount,
      totalQuestions: activeQuestions.length,
      percentage,
      passed,
      strikes: AntiCheat.getStrikes(),
      timeSpentSeconds: timeSpent,
      isAutoSubmit,
      domainScores,
      questionsReview
    };

    // Save Result to LocalStorage & SQLite Backend
    saveResultToStorageAndAPI(resultPayload);

    // Update history list in background
    fetchCandidateHistory();

    // Render Dashboard
    renderResultsScreen(resultPayload);
  }

  function saveResultToStorageAndAPI(resultPayload) {
    try {
      const stored = JSON.parse(localStorage.getItem("quiz_results") || "[]");
      stored.unshift(resultPayload);
      localStorage.setItem("quiz_results", JSON.stringify(stored));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }

    fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultPayload)
    }).catch((err) => {
      console.warn("Backend API save failed:", err);
    });
  }

  function renderResultsScreen(data) {
    elements.examContainer.classList.add("hidden");
    elements.welcomeCard.classList.add("hidden");
    elements.resultsContainer.classList.remove("hidden");

    const setLabel = data.setName || (data.setId ? `Quiz Set ${data.setId.replace("set-", "")}` : "AI Certification Exam");
    elements.resultCandidateName.textContent = `${data.candidate.email} (${setLabel})`;
    elements.resultCandidateId.textContent = `ID: ${data.candidate.id}`;
    elements.resultDate.textContent = data.formattedDate || new Date().toLocaleDateString("en-US");

    if (data.passed) {
      elements.badgeStatus.className = "pass-fail-badge badge-pass";
      elements.badgeStatus.innerHTML = `🏆 CERTIFIED - PASS (${data.percentage}%)`;
    } else {
      elements.badgeStatus.className = "pass-fail-badge badge-fail";
      elements.badgeStatus.innerHTML = `❌ NOT PASSED (${data.percentage}%)`;
    }

    elements.scoreFraction.textContent = `${data.correctCount} / ${data.totalQuestions}`;
    elements.scorePercent.textContent = `${data.percentage}%`;

    // SVG Donut Circle Animation
    if (elements.circleScoreProgress) {
      const circumference = 2 * Math.PI * 54; // r=54
      const offset = circumference - (data.percentage / 100) * circumference;
      elements.circleScoreProgress.style.strokeDasharray = `${circumference}`;
      elements.circleScoreProgress.style.strokeDashoffset = `${offset}`;
      elements.circleScoreProgress.style.stroke = data.passed ? "var(--success-color)" : "var(--danger-color)";
    }

    // Render Domain Breakdown
    renderDomainBreakdown(data.domainScores || {});

    // Render Detailed Answer Review Cards
    renderQuestionsReview(data.questionsReview || []);

    if (elements.restartBtn) {
      elements.restartBtn.style.display = "inline-flex";
      elements.restartBtn.textContent = "Take Another Assessment / Choose Quiz Set";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderDomainBreakdown(domainScores) {
    if (!elements.domainBreakdownContainer) return;
    elements.domainBreakdownContainer.innerHTML = "";

    Object.keys(domainScores).forEach((domain) => {
      const scoreObj = domainScores[domain];
      const pct = Math.round((scoreObj.correct / scoreObj.total) * 100);

      const domainCard = document.createElement("div");
      domainCard.className = "domain-item";
      domainCard.innerHTML = `
        <div class="domain-header">
          <span class="domain-name">${escapeHTML(domain)}</span>
          <span class="domain-score">${scoreObj.correct}/${scoreObj.total} (${pct}%)</span>
        </div>
        <div class="domain-progress-bg">
          <div class="domain-progress-fill" style="width: ${pct}%; background: ${pct >= 80 ? "var(--success-color)" : pct >= 50 ? "var(--warning-color)" : "var(--danger-color)"};"></div>
        </div>
      `;
      elements.domainBreakdownContainer.appendChild(domainCard);
    });
  }

  function renderQuestionsReview(reviewList) {
    if (!elements.reviewQuestionsContainer) return;
    elements.reviewQuestionsContainer.innerHTML = "";

    reviewList.forEach((q, idx) => {
      const isCorrect = q.chosenIndex === q.correctIndex;
      const isUnanswered = q.chosenIndex === -1 || q.chosenIndex === undefined;

      const reviewCard = document.createElement("div");
      reviewCard.className = `review-card ${isCorrect ? "review-correct" : "review-incorrect"}`;

      let optionsHTML = "";
      q.options.forEach((optText, optIdx) => {
        let optClass = "review-opt";
        let optIcon = "";

        if (optIdx === q.correctIndex) {
          optClass += " opt-correct";
          optIcon = "✓ Correct Answer";
        }
        if (optIdx === q.chosenIndex && !isCorrect) {
          optClass += " opt-chosen-wrong";
          optIcon = "✗ Your Answer";
        }

        const letter = String.fromCharCode(65 + optIdx);
        optionsHTML += `
          <div class="${optClass}">
            <div class="opt-left">
              <span class="review-letter">${letter}</span>
              <span>${formatMarkdown(optText)}</span>
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
        <h4 class="review-question-text">${formatMarkdown(q.question)}</h4>
        <div class="review-options-list">${optionsHTML}</div>
        <div class="review-explanation">
          <strong>💡 Explanation:</strong> ${formatMarkdown(q.explanation)}
        </div>
      `;

      elements.reviewQuestionsContainer.appendChild(reviewCard);
    });
  }

  function resetExam() {
    elements.resultsContainer.classList.add("hidden");
    elements.examContainer.classList.add("hidden");
    elements.welcomeCard.classList.remove("hidden");
    if (candidateInfo.email) {
      if (elements.loginBox) elements.loginBox.classList.add("hidden");
      if (elements.candidateDashboard) elements.candidateDashboard.classList.remove("hidden");
      fetchCandidateHistory();
    } else {
      if (elements.candidateDashboard) elements.candidateDashboard.classList.add("hidden");
      if (elements.loginBox) elements.loginBox.classList.remove("hidden");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatMarkdown(str) {
    if (!str) return "";
    let safe = str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // Convert **bold** markdown syntax to <strong>bold</strong>
    safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert *italic* markdown syntax to <em>italic</em>
    safe = safe.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert > scenario quotes and line breaks
    safe = safe.replace(/\n\n> /g, "<blockquote class='scenario-quote'>");
    safe = safe.replace(/\n> /g, "<blockquote class='scenario-quote'>");
    safe = safe.replace(/\n/g, "<br>");

    return safe;
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
