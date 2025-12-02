import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Admin() {
  const [profile, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error: fetchError } = await supabase
          .from('profiles')
          .select('*');

        if (fetchError) {
          throw fetchError;
        }
        setData(fetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <p className="text-lg" style={{ color: 'var(--text)' }}>
          Loading profiles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <p className="text-lg" style={{ color: 'var(--text)' }}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] px-6 py-12">
      <div className="w-full max-w-5xl bg-[var(--bg-elevated)] rounded-lg shadow p-8">
        <h1
          className="text-3xl font-extrabold text-center mb-6 drop-shadow pt-2"
          style={{ color: 'var(--text)' }}
        >
          User Profile Information
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-[var(--border)] rounded-lg overflow-hidden">
            <thead>
              <tr className="text-center bg-[var(--bg)]" style={{ color: 'var(--text)' }}>
                <th className="px-4 py-2 border-b border-[var(--border)] font-semibold">Role</th>
                <th className="px-4 py-2 border-b border-[var(--border)] font-semibold">First Name</th>
                <th className="px-4 py-2 border-b border-[var(--border)] font-semibold">Last Name</th>
                <th className="px-4 py-2 border-b border-[var(--border)] font-semibold">Email</th>
                <th className="px-4 py-2 border-b border-[var(--border)] font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody>
              {profile.map((profile, idx) => (
                <tr key={idx} className="text-center" style={{ color: 'var(--text)' }}>
                  <td className="px-4 py-2 border-b border-[var(--border)]">
                    {profile.role}
                  </td>
                  <td className="px-4 py-2 border-b border-[var(--border)]">
                    {profile.first_name}
                  </td>
                  <td className="px-4 py-2 border-b border-[var(--border)]">
                    {profile.last_name}
                  </td>
                  <td className="px-4 py-2 border-b border-[var(--border)]">
                    {profile.email}
                  </td>
                  <td className="px-4 py-2 border-b border-[var(--border)]">
                    {profile.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
