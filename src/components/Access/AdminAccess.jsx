import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { UseAuth } from '../../context/AuthContext';

const AdminAccess = () => {
  const { session } = UseAuth();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reload user whenever session changes
  useEffect(() => {
    const loadUser = async () => {
      if (!session) {
        setUser(null);
        setProfile(null);
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(data.user);
      }
    };
    loadUser();
  }, [session]);

  // Load profile whenever user changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile data:', error);
        setProfile(null);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    loadProfile();
  }, [user]);


  return (
    <>
      {session && profile?.role === 'admin' ? (
        <div className="flex items-center space-x-2">
          <Link to="/admin">Admin</Link>
        </div>
      ) : null}
    </>
  );
};

export default AdminAccess;
