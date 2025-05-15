import { HtmlHTMLAttributes, useState, useEffect} from 'react';
import React from 'react';
import { JSX } from 'react';
import {format} from 'date-fns'
import './App.css'; 

//Start page
function StartPage({ onStart }: { onStart: () => void }) {
  return(
    <div className='start-page'>
      <h1> Welcome to CV Application</h1>
      <p>If you need help creating your CV, you're in the right place.</p>
      <button onClick={onStart}> start </button>
    
    </div>
  )
}

//Main content
function MainContent() {
  const [PersonalData, setPersonalData] = useState<PersonalData>({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [educationData, setEducationData] = useState<EducationData[]>([
    {
      institution: "University of Example",
      degree: "Bachelor of Science in Computer Science",
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);

  const [workExperience, setWorkExperience] = useState<WorkExperienceData>({
    position: '',
    company: '',
    startDate: new Date(),
    endDate: new Date(),
    workDescription: '',
  });


  const pageList = [
    <PersonalSection PersonalData={PersonalData} setPersonalData={setPersonalData} />,
    <EducationSection educations={educationData} setEducations={setEducationData}/>,
    <WorkExperienceSection workExperience={workExperience} setWorkExperience={setWorkExperience}/>
  ];

  const [index,setIndex] = useState(0);

  function nextSection(){
    if(index < pageList.length - 1){
      setIndex(index+1);
    }
  }

  function previousSection(){
    if(index > 0){
      setIndex(index-1);
    }
  }

  return (
    <div className="main-content">
      <div className='card'>
        {pageList[index]}
        <div className='control-btms'>
          <button onClick={previousSection}>Previous</button>
          <button onClick={nextSection}>Next</button>
          </div>
      </div>

      
      <div className="card" id='preview'>
        <div className="personal-data">
          <h3>
            {PersonalData.name ? `${PersonalData.name}` : 'Name'}
          </h3>
          <div>
            <div>
                <img src='mail-icon.svg' alt='Email icon' className='icon' />
                <span>{PersonalData.email}</span>
            </div>
            <div>
              <img src='phone-icon.svg' alt='Phone icon' className='icon' />
              <span>{PersonalData.phone}</span>
            </div>
            <div>
              <img src='home-icon.svg' alt='Home icon' className='icon' />
              <span>{PersonalData.address}</span>
            </div>
          </div>
        </div>

        <div className="card-part" id="education">
          <h2 className='title'>Education Preview</h2>
          <div className="dates">
            <p style={{fontWeight:"bold", fontSize:'1.1rem'}}>{format(educationData[0].startDate, 'MMM yyyy')} 
            -
            {format(educationData[0].endDate, 'MMM yyyy')}</p>
          </div>
          <div className='details'>
            <p style={{fontWeight:"bold", fontSize:'1.2rem'}}>
              {educationData[0].institution || "Insitution:"}
            </p>
            <p>
              {educationData[0].degree || "Degree:"}
            </p>
          </div>
        </div>

        <div className="card-part" id="work-experience">
          <h2 className='title'>Work Experience</h2>
          <div className="dates">
            <p style={{fontWeight:"bold", fontSize:'1.1rem'}}>{format(workExperience.startDate, 'MMM yyyy')} 
            -
            {format(workExperience.endDate, 'MMM yyyy')}</p>
          </div>
          <div className="details">
            <p style={{fontWeight:"bold", fontSize:'1.2rem'}}>{workExperience.company ? `${workExperience.company}` : "Company:"}</p>
            <p>{workExperience.position ? `${workExperience.position}` : "Position:"}</p>
            {workExperience.workDescription && <p>{workExperience.workDescription}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}


//Personal Section
type PersonalData = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

type PersonalSectionProps = {
  PersonalData: PersonalData;
  setPersonalData: React.Dispatch<React.SetStateAction<PersonalData>>;
};

function PersonalSection({PersonalData, setPersonalData}: PersonalSectionProps):JSX.Element{
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const{ name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]:value,
    }));
  }

  return(
    <>
      <h2>Let's start with some basic data!</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={PersonalData.name}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={PersonalData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={PersonalData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={PersonalData.address}
          onChange={handleChange}
        />
      </form>
    </>
  );
}

//Education section
type EducationData = {
  institution: string;
  degree: string;
  startDate: Date;
  endDate: Date;
}

type EducationDataProbs = {
  educations: EducationData[];
  setEducations: React.Dispatch<React.SetStateAction<EducationData[]>>;
};


function EducationSection({educations, setEducations}: EducationDataProbs) :JSX.Element{
  
  const [tempEducation, setTempEducation] = useState({ institution: '', degree: '', startDate: new Date(), endDate: new Date()});
  const [addBtnActivate, setAddBtnActivate] = useState(false);


  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedTempEducations = [...educations];
    updatedTempEducations[index] = {
      ...updatedTempEducations[index],
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value) : value,
    };
    setEducations(updatedTempEducations);
    setAddBtnActivate(true); // Activate the Save button when changes are made
  };

  const handleTempEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempEducation((prev) => ({
      ...prev,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value) : value,
    }));
  }

  const editEducationForm = () => {
    // Render the form for adding new education
    return(
      <form>
        <input
          type="text"
          name="institution"
          placeholder="Institution"
          value={tempEducation.institution}
          onChange={handleTempEducationChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={tempEducation.degree}
          onChange={handleTempEducationChange}
        />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={tempEducation.startDate.toISOString().split('T')[0]}
            onChange={handleTempEducationChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={tempEducation.endDate.toISOString().split('T')[0]}
            onChange={handleTempEducationChange}
          />
        </label>
        <button type="button" onClick={saveEducation}>
          Save New Education
        </button>
      </form>
    );
  };

  const saveEducation = () => {
    setEducations([...educations, tempEducation]); // Add new education to the list
    setAddBtnActivate(false); // Deactivate the Save button
    setTempEducation({ institution: '', degree: '', startDate: new Date(), endDate: new Date() }); // Reset the temp education
  };

  const showEducations = () => {
    return educations.map((edu, index) => (
      <form key={index}>
        <input
          type="text"
          name="institution"
          placeholder="Institution"
          value={edu.institution}
          onChange={(e) => handleChange(index, e)}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={edu.degree}
          onChange={(e) => handleChange(index, e)}
        />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={edu.startDate.toISOString().split('T')[0]}
            onChange={(e) => handleChange(index, e)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={edu.endDate.toISOString().split('T')[0]}
            onChange={(e) => handleChange(index, e)}
          />
        </label>
      </form>
    ));
  };

  function handleDelete(index: number) {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  }

  function handleEdit(index: number) {
    const updatedEducations = [...educations];
    const selectedEducation = updatedEducations[index];
    setTempEducation(selectedEducation);
    setAddBtnActivate(true);
    handleDelete(index); 

  }

  function showEducationsCards(){
    return educations.map((edu, index) => (
      <div key={index} className="element-row">
        <p>{edu.institution}</p>
        <button onClick={() => handleEdit(index)}>Edit</button>
        <button onClick={() => handleDelete(index)}>Delete</button>
      </div>
    ));
  }

  return (
    <>
      <h2>Now, put some information about your education!</h2>
      {addBtnActivate ? (
        editEducationForm() // Directly call the function to render the forms
      ) : (
        <>
          {showEducationsCards()}
          <button type="button" className="addBtn" onClick={() => setAddBtnActivate(true)}>
            Add New Education
          </button>
        </>
      )}
    </>
  );
}

/* 
function EducationSection({ education, setEducation }: EducationsDataProbs): JSX.Element {
  const [btnActivate, setBtnActivate] = useState(false);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation(prev =>
      prev.map((edu, i) =>
        i === index
          ? {
              ...edu,
              [name]: name === "startDate" || name === "endDate" ? new Date(value) : value,
            }
          : edu
      )
    );
  };

  const addNewEducation = () => {
    setEducation(prev => [
      ...prev,
      {
        institution: "",
        degree: "",
        startDate: new Date(),
        endDate: new Date(),
      },
    ]);
  };

  return (
    <>
      <h2>Now, put some information about your education!</h2>
      {btnActivate ?
      education.map((edu, index) => (
        <form key={index}>
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleChange(index, e)}
          />
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={edu.startDate.toISOString().split("T")[0]}
              onChange={(e) => handleChange(index, e)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={edu.endDate.toISOString().split("T")[0]}
              onChange={(e) => handleChange(index, e)}
            />
          </label>
        </form>
      )):
      <button type="button" className='addBtn' onClick={() => setBtnActivate(true)}>
        Add New Education
      </button>
      }
    </>
  );
}
*/


//Work experience section
type WorkExperienceData = {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  workDescription: string;
};

type WorkExperienceDataProbs = {
  workExperience: WorkExperienceData;
  setWorkExperience: React.Dispatch<React.SetStateAction<WorkExperienceData>>;
}


function WorkExperienceSection({workExperience, setWorkExperience}: WorkExperienceDataProbs):JSX.Element{
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const{ name, value } = e.target;
    
    // Special handling for date fields to convert value to Date type
    if (name === "startDate" || name === "endDate") {
      setWorkExperience((prevData) => ({
        ...prevData,
        [name]: new Date(value),
      }));
    } else {
      setWorkExperience((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return(
    <>
      <h2>Now, put some information about your's work experience!</h2>
      <form>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={workExperience.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={workExperience.position}
          onChange={handleChange}
        />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={workExperience.startDate.toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={workExperience.endDate.toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </label>
        <textarea
          name="workDescription"
          placeholder="Work Description"
          value={workExperience.workDescription}
          onChange={handleChange}
        />
      </form>
    </>
  )
}



function App() {
  const [hasStart, setHasStart] = useState<boolean>(false)

  return (
    <>
      {hasStart ? <MainContent/>: <StartPage onStart={() => setHasStart(true)}/>  }
    </>
  )
}

export default App
