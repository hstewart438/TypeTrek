import React from "react";
import GeneratedWords from "../components/GeneratedWords";
import RestartButton from "../components/RestartButton";
import Results from "../components/Results";
import TypingDisplay from "../components/TypingDisplay";
import useEngine from "../hooks/useEngine";
import { calculateAccuracyPercentage } from "../utils/helpers";

function Home () {
  const { words, typed, timeLeft, errors, state, restart, totalTyped } =
    useEngine();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-y-6">
        <CountdownTimer timeLeft={timeLeft} />
        <div className="relative w-full max-w-screen-xl p-6 bg-white rounded shadow">
          <WordsContainer>
            <GeneratedWords key={words} words={words} />
            <TypingDisplay
              className="absolute inset-0"
              words={words}
              userInput={typed}
            />
          </WordsContainer>
        </div>
        <RestartButton
          className="mx-auto mt-4 text-slate-500"
          onRestart={restart}
        />
        <Results
          className="mt-4"
          state={state}
          errors={errors}
          accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
          total={totalTyped}
        />
      </div>
    </>
  );
};

const WordsContainer = ({ children }) => {
  return (
    <div className="relative w-full text-2xl leading-relaxed break-words mt-3">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default Home;