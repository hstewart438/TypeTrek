import { supabase } from "../supabaseclient";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    async function loadHistory() {
      setLoading(true);

      const { data, error } = await supabase
        .from("test_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("History error:", error);
        setTests([]);
      } else {
        setTests(data || []);
      }

      setLoading(false);
    }

    loadHistory();
  }, [user]);

  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  if (loading) {
    return <p>Loading test history…</p>;
  }

  return (
    <div>
      <h2>Recent Tests</h2>

      {tests.length === 0 ? (
        <p>No test history yet.</p>
      ) : (
        tests.map((t) => (
          <div key={t.id} style={{ marginBottom: "14px" }}>
            <p><strong>WPM:</strong> {t.wpm}</p>
            <p><strong>Accuracy:</strong> {t.accuracy}%</p>
            <p>{new Date(t.created_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
