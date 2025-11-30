import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatPercentage } from "../utils/helpers";
import { supabase } from "../supabaseclient";

const Results = ({
  state,
  errors,
  accuracyPercentage,
  WPM,
  total,
  className = "",
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (mounted) setUser(currentUser);
      } catch (err) {
        console.error("Failed to get supabase user:", err);
      }
    }

    loadUser();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (state !== "finish") return;
    if (!user) return;

    async function saveTestResult() {
      try {
        const { error } = await supabase.from("test_history").insert([
          {
            user_id: user.id,
            wpm: WPM,
            accuracy: Math.round(accuracyPercentage),
            errors: errors,
            total_typed: total,
          },
        ]);

        if (error) console.error("Error saving test result:", error);
      } catch (err) {
        console.error("Unexpected error saving result:", err);
      }
    }

    saveTestResult();
  }, [state, user, WPM, accuracyPercentage, errors, total]);

  if (state !== "finish") return null;

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <motion.ul
      initial={initial}
      animate={animate}
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li transition={{ duration: 0.3, delay: 0.5 }}>
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li transition={{ duration: 0.3, delay: 1 }}>
        WPM: {WPM}
      </motion.li>
      <motion.li
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li transition={{ duration: 0.3, delay: 1.4 }}>
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
