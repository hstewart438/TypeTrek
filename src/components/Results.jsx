import { useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";
import { formatPercentage } from "../utils/helpers";

const Results = ({
  state,
  errors,
  accuracyPercentage, // e.g. 92.5
  total,              // total characters typed this test
  durationSeconds,    // pass this in from the parent
  className = "",
}) => {
  useEffect(() => {
    if (state !== "finish") return;

    const saveStats = async () => {
      // 1. Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Could not get user for stats update:", userError);
        return;
      }

      // 2. Compute this test's stats
      const wordsThisTest = total / 5; // 5 chars = 1 word
      const timeThisTestSeconds = durationSeconds ?? 0;

      const wpmThisTest =
        timeThisTestSeconds > 0
          ? (wordsThisTest / timeThisTestSeconds) * 60
          : 0;

      // 3. Get existing profile stats (using user_id, not id)
      let { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select(
          "user_id, tests_completed, lifetime_errors, lifetime_time_seconds, lifetime_words_typed, average_accuracy"
        )
        .eq("user_id", user.id)
        .maybeSingle(); // returns null instead of throwing if no row

      // If no profile row yet, create one with defaults
      if (!profile && !profileError) {
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            tests_completed: 0,
            lifetime_errors: 0,
            lifetime_time_seconds: 0,
            lifetime_words_typed: 0,
            average_accuracy: 0,
            lifetime_wpm: 0,
          })
          .select(
            "user_id, tests_completed, lifetime_errors, lifetime_time_seconds, lifetime_words_typed, average_accuracy"
          )
          .single();

        if (insertError) {
          console.error("Error creating profile for stats update:", insertError);
          return;
        }

        profile = newProfile;
      } else if (profileError) {
        console.error("Error fetching profile for stats update:", profileError);
        return;
      }

      const prevTests = profile?.tests_completed ?? 0;
      const prevErrors = profile?.lifetime_errors ?? 0;
      const prevTime = profile?.lifetime_time_seconds ?? 0;
      const prevWords = profile?.lifetime_words_typed ?? 0;
      const prevAvgAcc = profile?.average_accuracy ?? 0;

      // 4. Compute new lifetime stats
      const newTests = prevTests + 1;
      const newLifetimeErrors = prevErrors + errors;
      const newLifetimeTimeSeconds = prevTime + timeThisTestSeconds;
      const newLifetimeWords = prevWords + wordsThisTest;

      // Weighted average accuracy over all tests
      const newAverageAccuracy =
        newTests > 0
          ? (prevAvgAcc * prevTests + accuracyPercentage) / newTests
          : accuracyPercentage;

      // Lifetime WPM = total lifetime words / total lifetime minutes
      const newLifetimeWpm =
        newLifetimeTimeSeconds > 0
          ? (newLifetimeWords / newLifetimeTimeSeconds) * 60
          : 0;

      // 5. Push update to Supabase (using user_id)
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          tests_completed: newTests,
          lifetime_errors: newLifetimeErrors,
          lifetime_time_seconds: newLifetimeTimeSeconds,
          lifetime_words_typed: newLifetimeWords,
          average_accuracy: newAverageAccuracy,
          lifetime_wpm: newLifetimeWpm,
        })
        .eq("user_id", user.id);

      if (updateError) {
        console.error("Error updating profile stats:", updateError);
      } else {
        console.log("Stats updated:", {
          tests_completed: newTests,
          lifetime_errors: newLifetimeErrors,
          lifetime_time_seconds: newLifetimeTimeSeconds,
          lifetime_words_typed: newLifetimeWords,
          average_accuracy: newAverageAccuracy,
          lifetime_wpm: newLifetimeWpm,
        });
      }
    };

    saveStats();
  }, [state, total, errors, accuracyPercentage, durationSeconds]);

  // ----- existing UI -----
  if (state !== "finish") {
    return null;
  }

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
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
