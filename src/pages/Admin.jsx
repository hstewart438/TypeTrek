import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path as needed


function Admin() {
  const [profile, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error: fetchError } = await supabase
          .from('profiles') // Replace with your table name
          .select('*'); // Select all columns, or specify columns like 'name, age'

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
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center mb-6 drop-shadow pt-8">
        User Profile Information
      </h1>
  <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
  <thead>
    <tr className="bg-gray-100 text-center">
    <th className="px-4 py-2 border-b font-semibold ">Role</th>
      <th className="px-4 py-2 border-b font-semibold ">First Name</th>
      <th className="px-4 py-2 border-b font-semibold">Last Name</th>
      <th className="px-4 py-2 border-b font-semibold ">Email</th>
      <th className="px-4 py-2 border-b font-semibold">Created At</th>
    </tr>
  </thead>
  <tbody>
    {profile.map((profile, idx) => (
      <tr key={idx} className="text-center">
        <td className="px-4 py-2 border-b">{profile.role}</td>
        <td className="px-4 py-2 border-b">{profile.first_name}</td>
        <td className="px-4 py-2 border-b">{profile.last_name}</td>
        <td className="px-4 py-2 border-b">{profile.email}</td>
        <td className="px-4 py-2 border-b">{profile.created_at}</td>
        {/* Add more cells as needed */}
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default Admin;