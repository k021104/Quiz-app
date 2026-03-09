import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import './Quiz.css'

const quizData = [
  {
    question: 'What does CSS stand for?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style System',
      'Colorful Style Scripts'
    ],
    answer: 1
  },
  {
    question: 'Which React hook is used for side effects?',
    options: ['useState', 'useRef', 'useEffect', 'useContext'],
    answer: 2
  },
  {
    question: 'Time complexity of binary search?',
    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
    answer: 2
  },
  {
    question: 'Which company developed React?',
    options: ['Google', 'Facebook', 'Microsoft', 'Twitter'],
    answer: 1
  },
  {
    question: 'Which keyword is used to declare a constant in JavaScript?',
    options: ['var', 'let', 'constant', 'const'],
    answer: 3
  },
  {
    question: 'What is the virtual DOM?',
    options: [
      'A real copy of DOM',
      'A lightweight copy of the real DOM',
      'A browser extension',
      'A database model'
    ],
    answer: 1
  },
  {
    question: 'Which method is used to update state in React?',
    options: [
      'this.updateState()',
      'setState()',
      'changeState()',
      'modifyState()'
    ],
    answer: 1
  },
  {
    question: 'Which CSS property controls text size?',
    options: ['font-style', 'text-size', 'font-size', 'text-style'],
    answer: 2
  },
  {
    question: 'What does JSX stand for?',
    options: [
      'JavaScript XML',
      'Java Syntax Extension',
      'JSON XML',
      'JavaScript Extension'
    ],
    answer: 0
  },
  {
    question: 'Which hook is used to manage state in functional components?',
    options: ['useEffect', 'useState', 'useMemo', 'useCallback'],
    answer: 1
  },
  {
    question: 'Which array method is used to transform elements?',
    options: ['filter()', 'reduce()', 'map()', 'forEach()'],
    answer: 2
  },
  {
    question: 'What is the default port for React development server?',
    options: ['3000', '8080', '5000', '4200'],
    answer: 0
  }
]

const LETTERS = ['A', 'B', 'C', 'D']

export default function Quiz () {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [timeLeft, setTimeLeft] = useState(10)
  const [quizStarted, setQuizStarted] = useState(false)
  // const [direction, setDirection] = useState(1)

  const currentQuestion = quizData[currentIndex]
  const totalTime = 10
  const percentage = (timeLeft / totalTime) * 100

  const timerColor =
    timeLeft > 6 ? '#7c6af7' : timeLeft > 3 ? '#fbbf24' : '#f87171'

  useEffect(() => {
    if (!quizStarted) return
    if (selectedOption !== null) return
    if (timeLeft === 0) {
      // setDirection(1)
      if (currentIndex + 1 < quizData.length) {
        setCurrentIndex(prev => prev + 1)
      } else {
        setShowResult(true)
      }
      return
    }
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, selectedOption, currentIndex, quizStarted])

  const handleOptionClick = index => {
    if (selectedOption !== null) return
    setSelectedOption(index)
    if (index === currentQuestion.answer) {
      setScore(prev => prev + 1)
    }
    setTimeout(() => {
      // setDirection(1)
      if (currentIndex + 1 < quizData.length) {
        setCurrentIndex(prev => prev + 1)
        setSelectedOption(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  useEffect(() => {
    setTimeLeft(10)
  }, [currentIndex])

  const restartQuiz = () => {
    setCurrentIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedOption(null)
    // setDirection(-1)
    setQuizStarted(false)
  }

  const getOptionState = i => {
    if (selectedOption === null) return 'idle'
    if (i === currentQuestion.answer) return 'correct'
    if (i === selectedOption) return 'wrong'
    return 'dimmed'
  }

  const scorePercent = Math.round((score / quizData.length) * 100)

  return (
    <div className='quiz-root'>
      {/* Animated background orbs */}
      <div className='orb orb-1' />
      <div className='orb orb-2' />
      <div className='orb orb-3' />

      <AnimatePresence mode='wait'>
        {!quizStarted ? (
          // ── START SCREEN ──────────────────────────────
          <motion.div
            key='start'
            className='quiz-card result-card start-hero'
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <span className='hero-badge'>
                <span className='hero-badge-dot' />
                Frontend Challenge
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className='hero-title'
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.25,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              Ultimate
              <br />
              <em>React Quiz</em>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className='hero-sub'
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              Test your frontend knowledge across CSS, React, and algorithms. 10
              seconds per question.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className='hero-stats'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                type: 'spring',
                stiffness: 200,
                damping: 18
              }}
            >
              <div className='hero-stat'>
                <span className='hero-stat-num'>3</span>
                <span className='hero-stat-label'>Questions</span>
              </div>
              <div className='hero-divider' />
              <div className='hero-stat'>
                <span className='hero-stat-num'>10s</span>
                <span className='hero-stat-label'>Per Round</span>
              </div>
              <div className='hero-divider' />
              <div className='hero-stat'>
                <span className='hero-stat-num'>∞</span>
                <span className='hero-stat-label'>Retries</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button
              className='restart-btn'
              onClick={() => {
                setTimeLeft(10)
                setQuizStarted(true)
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{
                scale: 1.07,
                boxShadow:
                  '0 0 40px rgba(124,106,247,0.7), 0 0 80px rgba(124,106,247,0.3)',
                transition: { duration: 0.15, ease: 'easeOut' }
              }}
              whileTap={{
                scale: 0.93,
                boxShadow: '0 0 20px rgba(124,106,247,0.4)',
                transition: { duration: 0.1, ease: 'easeOut' }
              }}
            >
              <span className='btn-glow' />
              Begin Quiz →
            </motion.button>
          </motion.div>
        ) : showResult ? (
          // ── RESULT SCREEN ─────────────────────────────
          <motion.div
            key='result'
            className='quiz-card result-card'
            initial={{ opacity: 0, scale: 0.88, y: 48 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -24 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            <motion.div
              className='result-icon'
              initial={{ scale: 0, rotate: -160 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.25,
                type: 'spring',
                stiffness: 240,
                damping: 18
              }}
            >
              {scorePercent === 100 ? '🏆' : scorePercent >= 66 ? '⚡' : '🎯'}
            </motion.div>

            <motion.p
              className='result-label'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Quiz Complete
            </motion.p>

            <motion.h2
              className='result-score'
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {score}{' '}
              <span className='result-score-denom'>/ {quizData.length}</span>
            </motion.h2>

            <motion.div
              className='result-bar-track'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className='result-bar-fill'
                initial={{ width: 0 }}
                animate={{ width: `${scorePercent}%` }}
                transition={{
                  delay: 0.75,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            </motion.div>

            <motion.p
              className='result-message'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              {scorePercent === 100
                ? "Perfect score. You're unstoppable."
                : scorePercent >= 66
                ? 'Solid performance. Keep it up.'
                : 'Room to grow. Give it another shot.'}
            </motion.p>

            <motion.button
              className='restart-btn'
              onClick={restartQuiz}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 8px 40px rgba(124,106,247,0.55)'
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className='btn-glow' />
              Restart Quiz
            </motion.button>
          </motion.div>
        ) : (
          // ── QUIZ SCREEN ───────────────────────────────
          <motion.div
            key='quiz'
            className='quiz-card'
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header row */}
            <div className='quiz-header'>
              <div className='progress-pills'>
                {quizData.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`pill ${
                      i < currentIndex
                        ? 'pill-done'
                        : i === currentIndex
                        ? 'pill-active'
                        : ''
                    }`}
                    layoutId={`pill-${i}`}
                  />
                ))}
              </div>

              <div className='score-badge'>
                <span className='score-badge-icon'>✦</span>
                {score} pts
              </div>
            </div>

            {/* Timer */}
            <div className='timer-wrap'>
              <Box position='relative' display='inline-flex'>
                <CircularProgress
                  variant='determinate'
                  value={percentage}
                  size={88}
                  thickness={3.5}
                  sx={{
                    color: timerColor,
                    transition: 'color 0.5s ease',
                    filter: `drop-shadow(0 0 10px ${timerColor}66)`,
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                      transition: 'stroke-dashoffset 0.9s linear'
                    }
                  }}
                />
                {/* Track */}
                <CircularProgress
                  variant='determinate'
                  value={100}
                  size={88}
                  thickness={3.5}
                  sx={{
                    color: 'rgba(255,255,255,0.05)',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
                <Box
                  position='absolute'
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Typography
                    variant='h6'
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: timerColor,
                      transition: 'color 0.5s ease',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {timeLeft}s
                  </Typography>
                </Box>
              </Box>
            </div>

            {/* Question */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className='question-num'>
                  Question {currentIndex + 1} of {quizData.length}
                </p>
                <h2 className='question-text'>{currentQuestion.question}</h2>

                <div className='options-grid'>
                  {currentQuestion.options.map((option, i) => {
                    const state = getOptionState(i)
                    return (
                      <motion.button
                        key={i}
                        className={`option-btn option-${state}`}
                        onClick={() => handleOptionClick(i)}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.07 + 0.08,
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        whileHover={
                          selectedOption === null ? { scale: 1.018, y: -2 } : {}
                        }
                        whileTap={
                          selectedOption === null ? { scale: 0.982 } : {}
                        }
                        {...(state === 'wrong' && {
                          animate: {
                            x: [0, -8, 8, -6, 6, -3, 3, 0],
                            opacity: 1,
                            y: 0
                          },
                          transition: { duration: 0.45 }
                        })}
                      >
                        <span className='option-letter'>{LETTERS[i]}</span>
                        <span className='option-text'>{option}</span>
                        {state === 'correct' && (
                          <motion.span
                            className='option-check'
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 320,
                              damping: 18
                            }}
                          >
                            ✓
                          </motion.span>
                        )}
                        {state === 'wrong' && (
                          <motion.span
                            className='option-check'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            ✗
                          </motion.span>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
