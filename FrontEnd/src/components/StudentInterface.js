import { useEffect, useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from "moment"
import store from '../Store'
import { InputText } from 'primereact/inputtext';


function StudentInterface(){
    const [student,setStudent] = useState({})
    const [isJudgeDay,setIsJudgeDay] = useState(false)
    const [deadlines,setDeadlines] = useState([])
    const [team,setTeam] = useState({})
    const [projects,setProjects] = useState([])
    const [grade,setGrade] = useState('')
    const [judgeProject,setJudgeProject] = useState()
    const navigate = useNavigate();

    useEffect( ()=>{ 
        init();    
    },[])

    const init =async ()=>{

        const responseStudent = await fetch(`/api/students/${store.id}`);
        let studenti = await responseStudent.json();
        setStudent(studenti);

        const responseTeam = await fetch(`/api/teams/${studenti.teamId}`);
        let teami = await responseTeam.json();
        setTeam(teami);


        try{
            const responseProjects = await fetch(`/api/teams/${studenti.teamId}/projects`);
            let projectsi = await responseProjects.json();
            setProjects(projectsi);
        }
        catch(e)
        {
            console.log(e);
        }
        
        // daca este ziua de jurizat.
        try{
        const responseDeadlines = await fetch('/api/deadlines');
        let deadlinesi = await responseDeadlines.json();
        setDeadlines(deadlinesi);
        
        deadlinesi.forEach(async (deadline) => {
            if(deadline.number === 3)
            {
                let deadLineDate = moment(deadline.date,"DD.MM.YYYY").dayOfYear();
                let currentDate = moment(store.date,"DD.MM.YYYY").dayOfYear();

                if(currentDate === deadLineDate+1)
                {
                    setIsJudgeDay(true);
                    const responseJury = await fetch(`/api/juries/${studenti.juryId}`);
                    let jury = await responseJury.json();
                    const responseJudgeProject = await fetch(`/api/teams/${jury.teamId}/projects`)
                    let projectsToJudge = await responseJudgeProject.json();
                    console.log(projectsToJudge[projectsToJudge.length-1]);

                    setJudgeProject(projectsToJudge[projectsToJudge.length-1].projectFile); 
                }
            }
        });
        }
        catch(e)
        {
            console.log(e);
        }


    }

    const submitGrade = async() =>
    {
        if(!grade)
        {
            alert("Grade should be a floating point number.");
            return;
        }

        await fetch(`/api/students/${store.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "grade":grade
            }),
         });
    }


    const validate = async()=>{
        navigate(`/add-project/${store.id}`)

    }
    return (

        store.id ? (
        <div>
            <h1>Hello {student.firstName}</h1>
            <Button id="btnAddProject" label = "Set deadlines" onClick={()=>validate()}/>
            <DataTable value={projects} responsiveLayout="scroll">
                        <Column field="name" header="Name"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column field="projectFile" header="Project file"></Column>
                        <Column field="date" header="Date"></Column>
            </DataTable>
            
            { // In ziua in care se jurizeaza
                isJudgeDay && student.juryId!==null ? (
                    <div>
                        <h1>Input your grade for the project located at: {judgeProject}</h1>
                        <InputText placeholder='Grade' value={grade} onChange={(e)=>setGrade(e.target.value)}/>
                        <Button label='Submit grade' onClick={submitGrade}/>
                    </div>
                ) : 
                (<div></div>)
            }
        </div>
          ) : (
            <Navigate replace to={{ pathname: '/'}} />
          )
    )

}

export default StudentInterface;