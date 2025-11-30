import { useCallback, useEffect, useState } from "react";

const useWords = (count) => {
  const [words, setWords] = useState("");

  //local word list
  const WORD_LIST = [
"apple", "apple", "school", "keyboard", "monitor", "javascript", "bottle", "cloud", "space", "rocket", "student", "tiger", "ocean", "mountain", "river", "future", "smart", "challenge", "learn", "type", "speed", "your", "try", "a", "they", "sometimes", "let", "out", "no", "leave", "war", "like", "plant", "great", "paper", "children", "seem", "girl", "her", "of", "until", "letter", "story", "right", "eye", "above", "two", "feet", "well.", "because", "almost", "their", "been", "name", "water", "do", "city", "own", "more", "very"
  ];

  //Picks random words
  const generateWords = useCallback(() => {
    const randomWords = Array.from({ length: count }, () => {
      const index = Math.floor(Math.random() * WORD_LIST.length);
      return WORD_LIST[index];
    });

    setWords(randomWords.join(" "));
  }, [count]);

  useEffect(() => {
    generateWords();
  }, [generateWords]);

  const updateWords = useCallback(() => {
    generateWords();
  }, [generateWords]);

  return { words, updateWords };
};

export default useWords;
