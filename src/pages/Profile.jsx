import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const formatPercentage = (value) => {
  if (value == null) return "–";
  const num = Number(value);
  if (Number.isNaN(num)) return "–";
  return `${num.toFixed(1)}%`;
};

const formatNumber = (value) => {
  if (value == null) return "–";
  const num = Number(value);
  if (Number.isNaN(num)) return "–";
  return num.toLocaleString();
};

const formatWpm = (value) => {
  if (value == null) return "–";
  const num = Number(value);
  if (Number.isNaN(num)) return "–";
  return `${num.toFixed(1)} WPM`;
};

const formatDuration = (seconds) => {
  const num = Number(seconds);
  if (!num || num <= 0 || Number.isNaN(num)) return "0s";

  const hrs = Math.floor(num / 3600);
  const mins = Math.floor((num % 3600) / 60);
  const secs = Math.floor(num % 60);

  const parts = [];
  if (hrs) parts.push(`${hrs}h`);
  if (mins) parts.push(`${mins}m`);
  if (secs && !hrs) parts.push(`${secs}s`);

  return parts.join(" ");
};

function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const { data, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error("auth.getUser error:", authError);
        }

        const currentUser = data?.user ?? null;

        if (!currentUser) {
          if (!isMounted) return;
          setError("You must be logged in to view your profile.");
          setLoading(false);
          return;
        }

        if (!isMounted) return;
        setUser(currentUser);

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select(
            "user_id, first_name, last_name, email, tests_completed, lifetime_errors, lifetime_time_seconds, lifetime_words_typed, average_accuracy, lifetime_wpm"
          )
          .eq("user_id", currentUser.id)
          .single();

        if (profileError) {
          console.error("profile select error:", profileError);
          if (!isMounted) return;
          setError("Could not load your profile stats.");
          setLoading(false);
          return;
        }

        if (!isMounted) return;
        setStats(profile);
        setLoading(false);
      } catch (err) {
        console.error("Unexpected error loading profile:", err);
        if (!isMounted) return;
        setError("Something went wrong loading your profile.");
        setLoading(false);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  // ---------- RENDER STATES ----------

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-muted-foreground">Loading profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-muted-foreground">
          No profile stats found yet. Try completing a test.
        </p>
      </div>
    );
  }

  const {
    first_name,
    last_name,
    email,
    tests_completed,
    lifetime_errors,
    lifetime_time_seconds,
    lifetime_words_typed,
    average_accuracy,
    lifetime_wpm,
  } = stats;

  const displayName =
    first_name || last_name
      ? `${first_name ?? ""} ${last_name ?? ""}`.trim()
      : user?.email ?? "Your Profile";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-card text-card-foreground shadow-lg rounded-2xl border border-border p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4 mb-4">
          <h1 className="text-2xl font-semibold">
            {displayName}
          </h1>
          {(stats.email || user?.email) && (
            <p className="text-sm text-muted-foreground">
              {stats.email || user?.email}
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Average Accuracy */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Average Accuracy
            </p>
            <p className="text-xl font-semibold">
              {formatPercentage(average_accuracy)}
            </p>
          </div>

          {/* Tests Completed */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Tests Completed
            </p>
            <p className="text-xl font-semibold">
              {formatNumber(tests_completed)}
            </p>
          </div>

          {/* Lifetime Errors */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Lifetime Errors
            </p>
            <p className="text-xl font-semibold text-destructive">
              {formatNumber(lifetime_errors)}
            </p>
          </div>

          {/* Lifetime Words Typed */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Lifetime Words Typed
            </p>
            <p className="text-xl font-semibold">
              {formatNumber(Math.round(lifetime_words_typed || 0))}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (Assuming 5 characters per word)
            </p>
          </div>

          {/* Lifetime Time Typing */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Lifetime Time Typing
            </p>
            <p className="text-xl font-semibold">
              {formatDuration(lifetime_time_seconds)}
            </p>
          </div>

          {/* Lifetime WPM */}
          <div className="rounded-xl border border-border bg-muted p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Lifetime WPM
            </p>
            <p className="text-xl font-semibold">
              {formatWpm(lifetime_wpm)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
