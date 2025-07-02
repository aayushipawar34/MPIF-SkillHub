import React from "react";
import styled from "styled-components";

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
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.8px solid #ccc;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
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
`;

const AdmissionForm = ({ formData,setFormData, handleChange, handleSubmit, editId, setEditId, defaultFormData }) => (
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
                    <Input name="Details" placeholder="Details" value={formData.Details} onChange={handleChange} />
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
            setEditId(null);
            setFormData(defaultFormData);
          }}
        >
          Cancel
        </Button>
      )}
    </ButtonGroup>
  </Form>
);

export default AdmissionForm;
