import { HtmlHTMLAttributes, useState } from 'react';
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

  const [educationData, setEducationData] = useState<EducationData>({
    institution: "University of Example",
    degree: "Bachelor of Science in Computer Science",
    startDate: new Date(), // September 2015
    endDate: new Date(), // June 2019
  });

  const [workExperience, setWorkExperience] = useState<WorkExperienceData>({
    position: '',
    company: '',
    startDate: new Date(),
    endDate: new Date(),
    workDescription: '',
  });


  const pageList = [
    <PersonalSection PersonalData={PersonalData} setPersonalData={setPersonalData} />,
    <EducationSection education={educationData} setEducation={setEducationData}/>,
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
            <p>
            <p style={{fontWeight:"bold", fontSize:'1.1rem'}}>{format(educationData.startDate, 'MMM yyyy')} 
            -
            {format(educationData.endDate, 'MMM yyyy')}</p>
            </p>
          </div>
          <div className='details'>
            <p style={{fontWeight:"bold", fontSize:'1.2rem'}}>
              {educationData.institution || "Insitution:"}
            </p>
            <p>
              {educationData.degree || "Degree:"}
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
  education: EducationData;
  setEducation: React.Dispatch<React.SetStateAction<EducationData>>;
}

function EducationSection({education, setEducation}: EducationDataProbs) :JSX.Element{
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const{ name, value } = e.target;

    // Special handling for date fields to convert value to Date type
    if (name === "startDate" || name === "endDate") {
      setEducation((prevData) => ({
        ...prevData,
        [name]: new Date(value),
      }));
    } else {
      setEducation((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

    return(
      <>
      <h2>Now, put some information about your education!</h2>
      <form>
        <input
          type="text"
          name="institution"
          placeholder="Institution"
          value={education.institution}
          onChange={handleChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={education.degree}
          onChange={handleChange}
        />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={education.startDate.toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={education.endDate.toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </label>
      </form>
      </>
    );
}


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
