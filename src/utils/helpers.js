// accept only letters and whitespaces
export const isKeyboardCodeAllowed = (code) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space" ||
        code === "Comma" ||
        code === "Period" || 
        code === "Slash" ||
        code === "Quote" ||
        code === "Semicolon" ||
        code === "Colon" ||
        code === "Minus" || 
        code === "SingleQuote" ||
        code === "backtick"
    );
  };
  
  export const countErrors = (actual, expected) => {
    const expectedCharacters = expected.split("");
  
    return expectedCharacters.reduce((errors, expectedChar, i) => {
      const actualChar = actual[i];
      if (actualChar !== expectedChar) {
        errors++;
      }
      return errors;
    }, 0);
  };
  
  export const calculateAccuracyPercentage = (errors, total) => {
    if (total > 0) {
      const corrects = total - errors;
      return (corrects / total) * 100;
    }
  
    return 0;
  };
  
  export const formatPercentage = (percentage) => {
    return percentage.toFixed(0) + "%";
  };

  export const calculateWPM = (errors, total) => {
    if (total > 0){
      const corrects = total - errors;
      //change 30 to a variable passed through parameters to change the time based on what is implemented for future settings
      return Math.round((corrects / 5) / (30 / 60));
    }
};
  
  export const debug = (str) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(str);
    }
  };