
import { useCallback, useState } from "react";

const paragraph = "You are going to make a choice today that will have a direct impact on where you are five years from now? The truth is, you will make choice like that every day of your life. The problem is that on most days, you won't know the choice you make will have such a huge impact on your life in the future. So if you want to end up in a certain place in the future, you need to be careful of the choices you make today.";
const generateWords = (count) => {
  return paragraph;
};

const useWords = (count) => {
  const [words, setWords] = useState(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
};

export default useWords;