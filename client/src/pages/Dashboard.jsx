import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // For date formatting
import toast from "react-hot-toast"; // For notifications

import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import SummaryCard from "../components/Cards/SummaryCard.jsx";
import Modal from "../components/Modal.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";
import DeleteAlertContent from "../components/DeleteAlertContent.jsx";

import axiosInstance from "../utils/axiosInstance.js";
import API_PATHS  from "../utils/apiPaths.js";
import { CARD_BG } from "../utils/cardBG.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions(); // re-fetch updated list
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-10 px-4">
        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.map((data, index) => (
            <SummaryCard
              key={data?._id}
              bg={CARD_BG[index % CARD_BG.length].bgcolor}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || "-"}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* Add New Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Session
          </button>
        </div>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSessions();
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Confirmation"
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this session?"
          onDelete={() => deleteSession(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
