// components/AdmissionCard.jsx
import React from "react";
import styled from "styled-components";
import { FaFilePdf, FaFileImage, FaTrashAlt, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";

const FILE_BASE_URL = "https://mpif-skillhub.onrender.com/uploads/";

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;
const ToggleButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: rotate(180deg);
  }
`;
const CardDetail = styled.div`
  font-size: 14px;
  color: #444;
  margin-bottom: 6px;
`;
const FileLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;
const FileLink = styled.a`
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1.5px solid #4a90e2;
  color: #4a90e2;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background-color: #4a90e2;
    color: #fff;
  }
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;
const IconButton = styled.button`
  background-color: ${(props) => (props.$delete ? 'red' : 'green')};
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${(props) => (props.$delete ? "#c0392b" : "#2980b9")};
  }
`;

const AdmissionCard = ({ admission, isExpanded, toggleCard, handleEdit, deleteAdmission, handleStatusChange }) => {
  return (
    <Card>
      <CardHeader>
        <TopSection>
          {admission.files?.photo && (
            <ProfileImage src={`${FILE_BASE_URL}${admission.files.photo}`} alt="Profile" />
          )}
          <div>{admission.name}</div>
        </TopSection>

        <ToggleButton onClick={() => toggleCard(admission._id)}>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </ToggleButton>
      </CardHeader>

      {isExpanded && (
        <>
          <CardDetail><strong>Email:</strong> {admission.email}</CardDetail>
          <CardDetail><strong>Father's Name:</strong> {admission.FatherName}</CardDetail>
          <CardDetail><strong>DOB:</strong> {new Date(admission.dob).toLocaleDateString()}</CardDetail>
          <CardDetail><strong>Gender:</strong> {admission.Gender}</CardDetail>
          <CardDetail><strong>Mobile:</strong> {admission.Mobile}</CardDetail>
          <CardDetail><strong>Local Address:</strong> {admission.LocalAddress}</CardDetail>
          <CardDetail><strong>Permanent Address:</strong> {admission.PermanentAddress}</CardDetail>
          <CardDetail><strong>State:</strong> {admission.State}</CardDetail>
          <CardDetail><strong>Marital Status:</strong> {admission.Marital}</CardDetail>
          <CardDetail><strong>Qualification:</strong> {admission.Qualification}</CardDetail>
          <CardDetail><strong>Graduation Year:</strong> {admission.GraduationYear}</CardDetail>
          <CardDetail><strong>Income:</strong> {admission.income}</CardDetail>
          <CardDetail><strong>City:</strong> {admission.city}</CardDetail>
          <CardDetail><strong>Details:</strong> {admission.Details}</CardDetail>
          <CardDetail><strong>Course:</strong> {admission.course}</CardDetail>
          <CardDetail><strong>Status:</strong> {admission.status || 'Pending'}</CardDetail>

          <FileLinks>
            {Object.entries(admission.files || {}).map(([key, value]) => (
              value && (
                <FileLink key={key} href={`${FILE_BASE_URL}${value}`} target="_blank">
                  {key.includes("photo") ? <FaFileImage /> : <FaFilePdf />} {key.replace(/_/g, " ")}
                </FileLink>
              )
            ))}
          </FileLinks>

          <div style={{ marginTop: "10px" }}>
            <label><strong>Update Status:</strong></label><br />
            <select
              value={admission.status || 'Pending'}
              onChange={(e) => handleStatusChange(admission._id, e.target.value)}
              style={{ padding: "5px", marginTop: "5px", borderRadius: "5px" }}
            >
              <option>Pending</option>
              <option>Submitted</option>
              <option>Written Exam</option>
              <option>Interview</option>
              <option>House Visit</option>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
          </div>

          <ActionButtons>
            <IconButton onClick={() => handleEdit(admission)}>
              <FaEdit /> Edit
            </IconButton>
            <IconButton $delete onClick={() => deleteAdmission(admission._id)}>
              <FaTrashAlt /> Delete
            </IconButton>
          </ActionButtons>
        </>
      )}
    </Card>
  );
};

export default AdmissionCard;