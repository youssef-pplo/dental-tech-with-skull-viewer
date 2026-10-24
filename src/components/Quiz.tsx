import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CircleCheck, RotateCcw, Sparkles, X } from 'lucide-react';
import { chapters, questions } from '../data';

type QuizProps = { initialChapter?: string; onComplete?: (score: number, total: number) => void };

export default function Quiz({ initialChapter = 'all', onComplete }: QuizProps) {
  const [chapterId, setChapterId] = useState(initialChapter);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const quizQuestions = useMemo(() => chapterId === 'all' ? questions : questions.filter((question) => question.chapter === chapterId), [chapterId]);
  const current = quizQuestions[index];
  const answered = current ? chosen[current.id] !== undefined : false;
  const score = quizQuestions.filter((question) => chosen[question.id] === question.answer).length;

  useEffect(() => {
    setChapterId(initialChapter);
    setIndex(0);
    setChosen({});
    setFinished(false);
  }, [initialChapter]);

  const changeChapter = (value: string) => {
    setChapterId(value);
    setIndex(0);
    setChosen({});
    setFinished(false);
  };

  const choose = (optionIndex: number) => {
    if (!current || answered) return;
    setChosen((previous) => ({ ...previous, [current.id]: optionIndex }));
  };

  const finish = () => {
    setFinished(true);
    onComplete?.(score, quizQuestions.length);
    try {
      const old = JSON.parse(localStorage.getItem('craniaQuizHistory') || '[]') as Array<{ at: string; score: number; total: number; chapter: string }>;
      localStorage.setItem('craniaQuizHistory', JSON.stringify([{ at: new Date().toISOString(), score, total: quizQuestions.length, chapter: chapterId }, ...old].slice(0, 12)));
    } catch { /* local storage may be unavailable in a private browser session */ }
  };

  const restart = () => {
    setChosen({});
    setIndex(0);
    setFinished(false);
  };

  if (!current) return <div className="empty-state">There are no questions in this section yet.</div>;

  if (finished) {
    const percent = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="quiz-page">
        <div className="quiz-result">
          <div className="result-orb"><Sparkles size={26} /></div>
          <span className="eyebrow">QUIZ COMPLETE</span>
          <h2>{percent >= 80 ? 'Great recall.' : percent >= 55 ? 'Good progress.' : 'A useful first pass.'}</h2>
          <p>You answered <b>{score} of {quizQuestions.length}</b> questions correctly. Review the explanations, then try again when you are ready.</p>
          <div className="result-score"><strong>{percent}<small>%</small></strong><div><span>{score} correct</span><span>{quizQuestions.length - score} to revisit</span></div></div>
          <div className="result-actions"><button className="button-primary" onClick={restart}><RotateCcw size={16} /> Try again</button><button className="button-secondary" onClick={() => changeChapter('all')}>Comprehensive quiz</button></div>
        </div>
        <div className="review-list"><span className="eyebrow">ANSWER REVIEW</span>{quizQuestions.map((question, qIndex) => <article key={question.id} className={chosen[question.id] === question.answer ? 'review-correct' : 'review-incorrect'}><span>{String(qIndex + 1).padStart(2, '0')}</span><div><b>{question.question}</b><p>{chosen[question.id] === question.answer ? 'Correct' : 'Review'} · {question.options[question.answer]}</p></div>{chosen[question.id] === question.answer ? <Check size={16} /> : <X size={16} />}</article>)}</div>
      </div>
    );
  }

  const correct = current ? chosen[current.id] === current.answer : false;
  const progress = Math.round(((index + (answered ? 1 : 0)) / quizQuestions.length) * 100);
  return (
    <div className="quiz-page">
      <div className="quiz-intro"><div><span className="eyebrow">TEST YOURSELF</span><h2>Practice with a reason.</h2><p>Pick an answer to get immediate feedback. Every option includes a short explanation.</p></div><div className="quiz-spark"><Sparkles size={20} /></div></div>
      <div className="quiz-controls">
        <label>CHAPTER <select value={chapterId} onChange={(event) => changeChapter(event.target.value)}><option value="all">All chapters · {questions.length} questions</option>{chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.shortTitle} · {questions.filter((question) => question.chapter === chapter.id).length} questions</option>)}</select></label>
        <span className="quiz-counter">{String(index + 1).padStart(2, '0')} <i>/</i> {String(quizQuestions.length).padStart(2, '0')}</span>
      </div>
      <div className="quiz-progress"><span style={{ width: progress + '%' }} /></div>
      <div className="question-card">
        <div className="question-meta"><span>{chapters.find((chapter) => chapter.id === current.chapter)?.shortTitle}</span><span>QUESTION {String(index + 1).padStart(2, '0')}</span></div>
        <h3>{current.question}</h3>
        <div className="answer-options">{current.options.map((option, optionIndex) => {
          const isChosen = chosen[current.id] === optionIndex;
          const isRight = current.answer === optionIndex;
          let className = 'answer-option';
          if (answered && isRight) className += ' is-correct';
          if (answered && isChosen && !isRight) className += ' is-wrong';
          return <button key={optionIndex} className={className} onClick={() => choose(optionIndex)} disabled={answered}><span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{answered && isRight && <CircleCheck size={17} />}{answered && isChosen && !isRight && <X size={17} />}</button>;
        })}</div>
        {answered && <div className={'answer-rationale ' + (correct ? 'correct' : 'incorrect')}>
          <div className="rationale-heading">{correct ? <Check size={18} /> : <X size={18} />}<div><b>{correct ? 'That’s right.' : 'Not quite.'}</b><span>Here’s the anatomy behind it.</span></div></div>
          <div className="rationale-correct"><b>Why this is correct</b><p>{current.correctWhy}</p></div>
          <details className="other-options"><summary>Why the other options are incorrect <span>+</span></summary><div>{current.options.map((option, optionIndex) => optionIndex !== current.answer && <p key={optionIndex}><b>{String.fromCharCode(65 + optionIndex)} · {option}</b><br />{current.optionWhy[optionIndex]}</p>)}</div></details>
        </div>}
        <div className="quiz-footer">
          <button className="button-quiet" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}><ArrowLeft size={15} /> Previous</button>
          <div className="quiz-dots">{quizQuestions.map((question, dotIndex) => <button key={question.id} aria-label={'Go to question ' + (dotIndex + 1)} className={(dotIndex === index ? 'current ' : '') + (chosen[question.id] !== undefined ? 'answered' : '')} onClick={() => setIndex(dotIndex)} />)}</div>
          {index < quizQuestions.length - 1 ? <button className="button-primary" onClick={() => setIndex(index + 1)} disabled={!answered}>Next <ArrowRight size={15} /></button> : <button className="button-primary" onClick={finish} disabled={!answered || Object.keys(chosen).length < quizQuestions.length}>See results <ArrowRight size={15} /></button>}
        </div>
      </div>
      <div className="quiz-tip"><span className="tip-icon">✦</span><p><b>Tip:</b> Read the incorrect-option notes too. They help separate ideas that are easy to mix up in an exam.</p></div>
    </div>
  );
}
