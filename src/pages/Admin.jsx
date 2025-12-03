import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UseAuth } from '../context/AuthContext';

function Admin() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { session } = UseAuth();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Load user whenever session changes
  useEffect(() => {
    const loadUser = async () => {
      if (!session) {
        setUser(null);
        setProfile(null);
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
      } else {
        setUser(data.user);
      }
    };
    loadUser();
  }, [session]);

  // Load profile whenever user changes
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) {
        setError(error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };
    loadProfile();
  }, [user]);

  // Fetch all profiles only if admin
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!profile || profile.role !== 'admin') return;
      setLoading(true);
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) {
        setError(error.message);
      } else {
        setProfiles(data);
      }
      setLoading(false);
    };
    fetchProfiles();
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <p className="text-lg" style={{ color: 'var(--text)' }}>
          Loading...
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
    <>
      {session && profile?.role === 'admin' ? (
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
                  {profiles.map((profileItem) => (
                    <tr key={profileItem.id} className="text-center" style={{ color: 'var(--text)' }}>
                      <td className="px-4 py-2 border-b border-[var(--border)]">{profileItem.role}</td>
                      <td className="px-4 py-2 border-b border-[var(--border)]">{profileItem.first_name}</td>
                      <td className="px-4 py-2 border-b border-[var(--border)]">{profileItem.last_name}</td>
                      <td className="px-4 py-2 border-b border-[var(--border)]">{profileItem.email}</td>
                      <td className="px-4 py-2 border-b border-[var(--border)]">{profileItem.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-xl font-bold">You are attempting to view a restricted web page</p>
          <p className="py-6">
            <a href="/home" className="text-blue-400 underline">
              Go back to home page
            </a>
          </p>
        </div>
      )}
    </>
  );
}

export default Admin;
