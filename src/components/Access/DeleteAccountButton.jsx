import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import { supabase } from "../../supabaseClient";
import ConfirmModal from "./ConfirmModal"; // import the modal

const DeleteAccountButton = () => {
  const { session, signOutUser } = UseAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if (!session) {
        setUser(null);
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
      }
    };
    loadUser();
  }, [session]);

  const deleteProfile = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting profile:", error);
      setLoading(false);
      return;
    }

    try {
      await signOutUser();
      navigate("/home");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <button
            onClick={() => setShowModal(true)}
            className="relative group overflow-hidden rounded px-4 py-2 text-center shadow-sm cursor-pointer"
            style={{
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}    
            disabled={loading}
        >
            <span className="absolute inset-0 rounded-full bg-red-600 scale-0 group-hover:scale-150 transition-transform duration-500"></span>
            <span className="relative z-10 group-hover:text-white duration-500">Delete Account</span>
        </button>

        {showModal && (
            <ConfirmModal
            message="Are you sure you want to delete your account? This action cannot be undone."
            onConfirm={() => {
                setShowModal(false);
                deleteProfile();
            }}
            onCancel={() => setShowModal(false)}
            />
        )}
        </>
  );
};

export default DeleteAccountButton;
