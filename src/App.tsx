import { useState} from 'react';
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

  const [workExperience, setWorkExperience] = useState<WorkExperienceData[]>([
    {
    position: 'Work Position',
    company: 'ABC Company',
    startDate: new Date(),
    endDate: new Date(),
  }
  ]);


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

        {educationData && educationData.length > 0 && (
        <div className="card-part" id="education">
          <h2 className="title">Education Preview</h2>
          <div className='info'>
            {educationData.map((edu, index) => (
              <div className='row'>
                <div className="dates">
                  <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {educationData[index]?.startDate
                      ? format(new Date(educationData[index].startDate), "MMM yyyy")
                      : "Start Date"}{" "}
                    -{" "}
                    {educationData[index]?.endDate
                      ? format(new Date(educationData[0].endDate), "MMM yyyy")
                      : "End Date"}
                  </p>
                </div>
                <div className="details">
                  <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {educationData[index]?.institution
                      ? educationData[index].institution
                      : "Institution"}
                  </p>
                  <p>
                    {educationData && educationData[index]?.degree
                      ? educationData[index].degree
                      : "Degree"}
                  </p>
                </div>
              </div>
            ))}
            </div>
        </div>
        )}

        {workExperience && workExperience.length > 0 && (
        <div className="card-part" id="work-experience">
          <h2 className='title'>Work Experience Preview</h2>
          <div className='info'>
            {workExperience.map((work, index) => (
              <div className='row'>
                <div className="dates">
                  <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {workExperience[index]?.startDate
                      ? format(new Date(workExperience[index].startDate), "MMM yyyy")
                      : "Start Date"}{" "}
                    -{" "}
                    {workExperience[index]?.endDate
                      ? format(new Date(workExperience[0].endDate), "MMM yyyy")
                      : "End Date"}
                  </p>
                </div>
                <div className="details">
                  <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {workExperience[index]?.company
                      ? workExperience[index].company
                      : "Company"}
                  </p>
                  <p>
                    {workExperience && workExperience[index]?.position
                      ? workExperience[index].position
                      : "Position"}
                  </p>
                </div>
              </div>
            ))}
          </div>  
        </div>
        )}

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
  const [btnCreateActivate, setBtnCreateActivate] = useState(false);
  const [btnEditActivate, setBtnEditActivate] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const handleTempEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempEducation((prev) => ({
      ...prev,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value) : value,
    }));
  }

  const createNewEducationForm = () => {
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
        <button type="button" onClick={addNewEducation}>
          Save New Education
        </button>
      </form>
    );
  };

  const editEducationForm = () => {
    // Render the form for editing existing education
    return (
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
        <button type="button" onClick={() => handleUpdateEducation(tempEducation)}>
          Update Education
        </button>
      </form>
    );
  };

  const addNewEducation = () => {
    setEducations([...educations, tempEducation]); // Add new education to the list
    setBtnCreateActivate(false); // Deactivate the Save button
    setTempEducation({ institution: '', degree: '', startDate: new Date(), endDate: new Date() }); // Reset the temp education
  };

  function handleDelete(index: number) {
    if(educations.length > 1) {
      setEducations((prev) => prev.filter((_, i) => i !== index));
    }
    else if(educations.length === 1){
      setEducations([]); 
    }

    else{
      console.log("No education data to delete");
    }
  }

  function handleEdit(index: number) {
    const selectedEducation = educations[index];
    setTempEducation(selectedEducation); // Set the selected education for editing
    setBtnEditActivate(true); // Activate the edit form
    setEditIndex(index); // Set the index of the education being edited
  }

  function handleUpdateEducation(updatedEducation: EducationData) {
    setEducations((prev) =>
      prev.map((edu, i) => (i === editIndex ? updatedEducation : edu))
    );
    setTempEducation({institution: '', degree: '', startDate: new Date(), endDate: new Date()}); // Clear the temporary education
    setBtnEditActivate(false); // Deactivate the edit form
  }

  function showEducationsCards(){
    if(educations.length !== 0){
      return(
        <div className="cards-column">
        {educations.map((edu, index) => (
        <div key={index} className="element-row">
            <p>{edu.institution}</p>
            <div className="row-btns">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
      ))}
      </div>
      );
    }
    else{
      return (
        <p> You have no education data yet. </p>
      );
    }
  }

  return (
    <>
      <h2>Now, put some information about your education!</h2>
      {btnCreateActivate ? (
        createNewEducationForm() // Directly call the function to render the forms
      ) : btnEditActivate ? editEducationForm()
      :(
        <>
          {showEducationsCards()}
          <button type="button" className="addBtn" onClick={() => setBtnCreateActivate(true)}>
            Add New Education
          </button>
        </>
      )}
    </>
  );
}

//Work experience section
type WorkExperienceData = {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
};

type WorkExperienceDataProbs = {
  workExperience: WorkExperienceData[];
  setWorkExperience: React.Dispatch<React.SetStateAction<WorkExperienceData[]>>;
}


function WorkExperienceSection({workExperience, setWorkExperience}: WorkExperienceDataProbs):JSX.Element{
  
  const [tempWork, setTempWork] = useState({ company: '', position: '', startDate: new Date(), endDate: new Date()});
  const [btnCreateActivate, setBtnCreateActivate] = useState(false);
  const [btnEditActivate, setBtnEditActivate] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  
  
  const handleTempWorkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempWork((prev) => ({
      ...prev,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value) : value,
    }));
  };

  function handleUpdateWork (updatedWork: WorkExperienceData) {
    setWorkExperience((prev) =>
      prev.map((work, i) => (i === editIndex ? updatedWork : work))
    );
    setTempWork({company: '', position: '', startDate: new Date(), endDate: new Date()}); // Clear the temporary education
    setBtnEditActivate(false); // Deactivate the edit form
  }

  function handleEdit(index: number) {
    const selectedWork = workExperience[index];
    setTempWork(selectedWork); // Set the selected education for editing
    setBtnEditActivate(true); // Activate the edit form
    setEditIndex(index); // Set the index of the education being edited
  }

  const addNewWork = () => {
    setWorkExperience([...workExperience, tempWork]); // Add new work to the list
    setBtnCreateActivate(false); // Deactivate the Save button
    setTempWork({ company: '', position: '', startDate: new Date(), endDate: new Date()}); // Reset the temp education
  }

  function handleDelete(index: number) {
    if(workExperience.length > 1) {
      setWorkExperience((prev) => prev.filter((_, i) => i !== index));
    }
    else if(workExperience.length === 1){
      setWorkExperience([]); 
    }

    else{
      console.log("No work experience data to delete");
    }
  }


  

  const createNewWorkForm = ():JSX.Element => { 
    // Render the form for adding new work experience
    return(
      <form>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={tempWork.company}
          onChange={handleTempWorkChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={tempWork.position}
          onChange={handleTempWorkChange}
        />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={tempWork.startDate.toISOString().split('T')[0]}
            onChange={handleTempWorkChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={tempWork.endDate.toISOString().split('T')[0]}
            onChange={handleTempWorkChange}
          />
        </label>
        <button type="button" onClick={addNewWork}>
          Save New Work Experience
        </button>
      </form>
    );
  }

    const editWorkExperienceForm = () => { // Render the form for editing existing work experience
      return (
        <form>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={tempWork.company}
            onChange={handleTempWorkChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={tempWork.position}
            onChange={handleTempWorkChange}
          />
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={tempWork.startDate.toISOString().split('T')[0]}
              onChange={handleTempWorkChange}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              value={tempWork.endDate.toISOString().split('T')[0]}
              onChange={handleTempWorkChange}
            />
          </label>
          <button type="button" onClick={() => handleUpdateWork(tempWork)}>
            Update Work Experience
          </button>
        </form>
      );

    }

    function showWorkCards(){
      if(workExperience.length !== 0){
        return(
        <div className="cards-column">
        {workExperience.map((work, index) => (
          <div key={index} className="element-row">
            <p>{work.company}</p>
            <div className="row-btns">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
        </div>
        );
      }
      else{
        return (
          <p> You have no work experience data yet. </p>
        );
      }
    }
  
  
    return (
      <>
        <h2>Now, put some information about your's work experience!</h2>
        {btnCreateActivate ? (
          createNewWorkForm() // Directly call the function to render the forms
        ) : btnEditActivate ? editWorkExperienceForm()
        :(
          <>
            {showWorkCards()}
            <button type="button" className="addBtn" onClick={() => setBtnCreateActivate(true)}>
              Add New Work Experience
            </button>
          </>
        )}
      </>
    );
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
