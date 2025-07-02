import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaFilePdf, FaFileImage, FaTrashAlt, FaEdit,FaChevronDown, FaChevronUp  } from "react-icons/fa";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";
import { toast } from "react-toastify";



const baseURL = "http://localhost:5000/admission";
const FILE_BASE_URL = "http://localhost:5000/uploads/";

const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 15px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;



const Form = styled.form`
  background: #fff;
  padding: 100px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  font-size: 14px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-start;
  gap: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.cancel ? "#888" : "#4a90e2")};
  color: white;
  border: none;
  padding: 11px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.25s ease;
  &:hover {
    background-color: ${(props) => (props.cancel ? "#666" : "#357ABD")};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

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
    background-color: ${(props) => (props.delete ? "#c0392b" : "#2980b9")};
  }
`;

const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);  
  const toggleCard = (id) => {                             
    setExpandedCard(expandedCard === id ? null : id);
  };

    const defaultFormData = {
        name: "",
        email: "",
        FatherName: "",
        dob: "",
        Gender: "",
        Mobile: "",
        LocalAddress: "",
        PermanentAddress: "",
        State: "",
        Marital: "",
        Qualification: "",
        GraduationYear: "",
        income: "",
        city: "",
        course: "",
        files: {
            photo: "",
            aadhar: "",
            marksheet_10: "",
            marksheet_12: "",
            last_year: "",
            income_certificate: "",
        },
    };

    const [formData, setFormData] = useState(defaultFormData);

    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const fetchAdmissions = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${baseURL}/all`, config);
            setAdmissions(res.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch admissions");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmissions();
    }, []);

    const deleteAdmission = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admission?")) return;
        try {
            await axios.delete(`${baseURL}/${id}`, config);
            fetchAdmissions();
        } catch {
            toast.error("Failed to delete admission");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("files.")) {
            const fileKey = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                files: { ...prev.files, [fileKey]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                if (!window.confirm("Are you sure you want to update this record?")) return;
                await axios.put(`${baseURL}/${editId}`, formData, config);
                toast.success("Admission updated!");
            } else {
                await axios.post(baseURL, formData, config);
                toast.success("Admission added!");
            }
            setFormData(defaultFormData);
            setEditId(null);
            fetchAdmissions();
        } catch {
            toast.error("Error submitting admission");
        }
    };

    const handleEdit = (admission) => {
        setFormData({
            ...admission,
            files: {
                photo: admission.files?.photo || "",
                aadhar: admission.files?.aadhar || "",
                marksheet_10: admission.files?.marksheet_10 || "",
                marksheet_12: admission.files?.marksheet_12 || "",
                last_year: admission.files?.last_year || "",
                income_certificate: admission.files?.income_certificate || "",
            },
        });
        setEditId(admission._id);
    };

    if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
    if (error) return <p style={{ textAlign: "center", marginTop: 40 }}>{error}</p>;
const handleStatusChange = async (id, newStatus) => {
  try {
    let requestData = { status: newStatus };

    if (newStatus === "Written Exam") {
      const examName = prompt("Enter Exam Name:");
      const examDate = prompt("Enter Exam Date :");
      const reportingTime = prompt("Enter Reporting Time:");

      if (!examName || !examDate || !reportingTime) {
        alert("All fields are required for Written Exam!");
        return;
      }

      requestData = {
        status: newStatus,
        examName,
        examDate,
        reportingTime
      };
    }

    const res = await axios.put(`http://localhost:5000/admission/update-status/${id}`, requestData);

    alert("Status updated!");
    window.location.reload();
  } catch (err) {
    console.error("Failed to update status", err);
    alert("Error updating status");
  }
};


    return (
        <>
            <Header />
            <Container>
                

                <Form onSubmit={handleSubmit}>
                    <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <Input name="FatherName" placeholder="Father's Name" value={formData.FatherName} onChange={handleChange} />
                    <Input type="date" name="dob" value={formData.dob} onChange={handleChange} />

                    <Select name="Gender" value={formData.Gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </Select>

                    <Input name="Mobile" placeholder="Mobile" value={formData.Mobile} onChange={handleChange} />
                    <Input name="LocalAddress" placeholder="Local Address" value={formData.LocalAddress} onChange={handleChange} />
                    <Input name="PermanentAddress" placeholder="Permanent Address" value={formData.PermanentAddress} onChange={handleChange} />
                    <Select name="State" value={formData.State} onChange={handleChange}>
                        <option value="">Select State</option>
                        <option value="AN">Andaman and Nicobar Islands</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CH">Chandigarh</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="DN">Dadra and Nagar Haveli</option>
                        <option value="DD">Daman and Diu</option>
                        <option value="DL">Delhi</option>
                        <option value="GA">Goa</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="WB">West Bengal</option>
                    </Select>

                    <Select name="Marital" value={formData.Marital} onChange={handleChange} > 
                        <option value="" >Select Marital Status</option>
                        <option>Single</option>                       
                         <option>Married</option>
                        <option>Divorced</option>
                    </Select>
                    <Select name="Qualification" placeholder="Qualification" value={formData.Qualification} onChange={handleChange} >
                        <option value="">Select Qualification</option>
                        <option>BA</option>
                        <option>Bsc</option>
                        <option>B.com</option>
                        <option>BBA</option>
                        <option>BCA</option>
                        <option>MCA</option>
                        <option>Btech</option>
                        <option>Other</option>
                    </Select>
                    <Select name="GraduationYear" value={formData.GraduationYear} onChange={handleChange} >
                         <option>Select Year</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                        <option value="1999">1999</option>
                        <option value="1998">1998</option>
                        <option value="1997">1997</option>
                        <option value="1996">1996</option>
                        <option value="1995">1995</option>
                        <option value="1994">1994</option>
                        <option value="1993">1993</option>
                        <option value="1992">1992</option>
                        <option value="1991">1991</option>
                        <option value="1990">1990</option>
                    </Select>
                    <Input name="income" placeholder="Income" value={formData.income} onChange={handleChange} />
                    <Select name="city" value={formData.city} onChange={handleChange} >
                        <option value="">Select City</option>
                        <option value="Agar">Agar</option>
                        <option value="Amla">Amla</option>
                        <option value="Ashoknagar">Ashoknagar</option>
                        <option value="Ashta">Ashta</option>
                        <option value="Babai">Babai</option>
                        <option value="Bag">Bag</option>
                        <option value="Balaghat">Balaghat</option>
                        <option value="Betul">Betul</option>
                        <option value="Bhind">Bhind</option>
                        <option value="Bhitarwar">Bhitarwar</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Chhatarpur">Chhatarpur</option>
                        <option value="Chhindwara">Chhindwara</option>
                        <option value="Dewas">Dewas</option>
                        <option value="Govindgarh">Govindgarh</option>
                        <option value="Guna">Guna</option>
                        <option value="Gwalior">Gwalior</option>
                        <option value="Harda">Harda</option>
                        <option value="Hoshangabad">Hoshangabad</option>
                        <option value="Indore">Indore</option>
                        <option value="Itarsi">Itarsi</option>
                        <option value="Jabalpur">Jabalpur</option>
                        <option value="Jaisinghnagar">Jaisinghnagar</option>
                        <option value="Jaithari">Jaithari</option>
                        <option value="Khargone">Khargone</option>
                        <option value="Khategaon">Khategaon</option>
                        <option value="Maksi">Maksi</option>
                        <option value="Malhargarh">Malhargarh</option>
                        <option value="Manasa">Manasa</option>
                        <option value="Manawar">Manawar</option>
                        <option value="Mandideep">Mandideep</option>
                        <option value="Mandla">Mandla</option>
                        <option value="Mandleshwar">Mandleshwar</option>
                        <option value="Mandsaur">Mandsaur</option>
                        <option value="Mangawan">Mangawan</option>
                        <option value="Manpur">Manpur</option>
                        <option value="Mau">Mau</option>
                        <option value="Mauganj">Mauganj</option>
                        <option value="Mihona">Mihona</option>
                        <option value="Mohgaon">Mohgaon</option>
                        <option value="Morar">Morar</option>
                        <option value="Morena">Morena</option>
                        <option value="Multai">Multai</option>
                        <option value="Mungaoli">Mungaoli</option>
                        <option value="Narsimhapur">Narsimhapur</option>
                        <option value="Narsinghgarh">Narsinghgarh</option>
                        <option value="Nasrullahganj">Nasrullahganj</option>
                        <option value="Neemuch">Neemuch</option>
                        <option value="Nepanagar">Nepanagar</option>
                        <option value="Pandhurna">Pandhurna</option>
                        <option value="Panna">Panna</option>
                        <option value="Pithampur">Pithampur</option>
                        <option value="Ratlam">Ratlam</option>
                        <option value="Rewa">Rewa</option>
                        <option value="Sagar">Sagar</option>
                        <option value="Sanawad">Sanawad</option>
                        <option value="Sanchi">Sanchi</option>
                        <option value="Sanwer">Sanwer</option>
                        <option value="Satna">Satna</option>
                        <option value="Sehore">Sehore</option>
                        <option value="Sendhwa">Sendhwa</option>
                        <option value="Ujjain">Ujjain</option>
                        <option value="Vidisha">Vidisha</option>
                    </Select>
                    <Select name="course" placeholder="Course" value={formData.course} onChange={handleChange} > 
                        <option value="">Select Course</option>
                        <option>ITEP</option>
                        <option>BMEP</option>
                    </Select>

                    <Input
                        name="files.photo"
                        placeholder="Photo filename or URL"
                        value={formData.files.photo}
                        onChange={handleChange}
                    />
                    <Input
                        name="files.aadhar"
                        placeholder="Aadhar filename or URL"
                        value={formData.files.aadhar}
                        onChange={handleChange}
                    />
                    <Input
                        name="files.marksheet_10"
                        placeholder="10th Marksheet filename or URL"
                        value={formData.files.marksheet_10}
                        onChange={handleChange}
                    />
                    <Input
                        name="files.marksheet_12"
                        placeholder="12th Marksheet filename or URL"
                        value={formData.files.marksheet_12}
                        onChange={handleChange}
                    />
                    <Input
                        name="files.last_year"
                        placeholder="Last Year Marksheet filename or URL"
                        value={formData.files.last_year}
                        onChange={handleChange}
                    />
                    <Input
                        name="files.income_certificate"
                        placeholder="Income Certificate filename or URL"
                        value={formData.files.income_certificate}
                        onChange={handleChange}
                    />

                    <ButtonGroup>
                        <Button type="submit">{editId ? "Update" : "Add"}</Button>
                        {editId && (
                            <Button
                                type="button"
                                cancel
                                onClick={() => {
                                    setFormData(defaultFormData);
                                    setEditId(null);
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </ButtonGroup>
                </Form>
<CardGrid>
  {admissions.map((admission) => {
    const isExpanded = expandedCard === admission._id;

    return (
      <Card key={admission._id}>
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
            <CardDetail><strong>Course:</strong> {admission.course}</CardDetail>
            <CardDetail><strong>Status:</strong> {admission.status || 'Pending'}</CardDetail>

            {admission.writtenExamDate && (
              <CardDetail><strong>Written Exam:</strong> {new Date(admission.writtenExamDate).toLocaleDateString()}</CardDetail>
            )}
            {admission.interviewDate && (
              <CardDetail><strong>Interview:</strong> {new Date(admission.interviewDate).toLocaleDateString()}</CardDetail>
            )}
            {admission.houseVisitDate && (
              <CardDetail><strong>House Visit:</strong> {new Date(admission.houseVisitDate).toLocaleDateString()}</CardDetail>
            )}
            {admission.batchStartDate && (
              <CardDetail><strong>Batch Start:</strong> {new Date(admission.batchStartDate).toLocaleDateString()}</CardDetail>
            )}


            <FileLinks>
              {admission.files?.photo && (
                <FileLink href={`${FILE_BASE_URL}${admission.files.photo}`} target="_blank">
                  <FaFileImage /> Photo
                </FileLink>
              )}
              {admission.files?.aadhar && (
                <FileLink href={`${FILE_BASE_URL}${admission.files.aadhar}`} target="_blank">
                  <FaFilePdf /> Aadhar
                </FileLink>
              )}
              {admission.files?.marksheet_10 && (
                <FileLink href={`${FILE_BASE_URL}${admission.files.marksheet_10}`} target="_blank">
                  <FaFilePdf /> 10th Marksheet
                </FileLink>
              )}
              {admission.files?.marksheet_12 && (
                <FileLink href={`${FILE_BASE_URL}${admission.files.marksheet_12}`} target="_blank">
                  <FaFilePdf /> 12th Marksheet
                </FileLink>
              )}
              {admission.files?.last_year && (
                <FileLink href={`${FILE_BASE_URL}${admission.files.last_year}`} target="_blank">
                  <FaFilePdf /> Last Year Marksheet
                </FileLink>
              )}
              {admission.files?.income_certificate && (
                <FileLink href={`${FILE_BASE_URL}${admission.files.income_certificate}`} target="_blank">
                  <FaFilePdf /> Income Certificate
                </FileLink>
              )}
            </FileLinks>
            <div style={{ marginTop: "10px" }}>
              <label><strong>Update Status:</strong></label><br />
              <select
                value={admission.status}
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
              <IconButton
                $delete
                onClick={() => deleteAdmission(admission._id)}
              >
                <FaTrashAlt /> Delete
              </IconButton>

            </ActionButtons>
          </>
        )}
      </Card>
    );
  })}
</CardGrid>

            </Container>
            <Footer />
        </>
    );
};

export default ManageAdmissions;
