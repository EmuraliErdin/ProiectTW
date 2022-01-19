import { Button } from "primereact/button";
import { useEffect, useState } from "react"
import { useNavigate,Navigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import store from '../Store'
import moment from 'moment'

function ProfessorInterface(){
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    let dataSet =[];

    const init = async()=>{

        let teami=null;
        let deadlines = null;
        try{
            const responseTeam = await fetch(`/api/teams`);
            teami = await responseTeam.json();
            let responseDeadlines = await fetch(`/api/deadlines`);
            deadlines = await responseDeadlines.json();
        }
        catch(e)
        {
            console.log(e);
        }


        if(teami!=null && deadlines!=null)
        {

            teami.forEach(async (team) => {
                let responseJury = await fetch(`/api/teams/${team.id}/jury`);
                let jury = await responseJury.json();

                let responseStudents = await fetch(`/api/juries/${jury.id}/students`);
                let juryStudents = await responseStudents.json();
                
                let avg=0, min=null, max=null;
                
                for(let i=0;i<juryStudents.length;i++)
                {
                    if(juryStudents[i].grade!=null)
                    {
                        min = max = juryStudents[i].grade;
                    }
                }

                if(avg!=null)
                {
                    let numarStudentiCuNota=0;
                    for(let i=0;i<juryStudents.length;i++)
                    {
                        if(juryStudents[i].grade!=null)
                        {
                            avg = avg + juryStudents[i].grade;
                            if(max<=juryStudents[i].grade)
                            {
                                max = juryStudents[i].grade
                            }

                            if(min>=juryStudents[i].grade)
                            {
                                min = juryStudents[i].grade
                            }
                            numarStudentiCuNota++;
                        }
                    }
                    if(numarStudentiCuNota>=3)
                    {
                        avg = avg - min - max;
                    }
                    avg = avg/numarStudentiCuNota;
                }
                else{
                    avg =0;
                }

                let responseProject = await fetch(`/api/teams/${team.id}/projects`);
                let projects = await responseProject.json();
                
                let deadlineLinks=[];
                for(let i=0;i<3;i++)
                {
                    deadlineLinks.push('');
                }
                 deadlineLinks = formDeadLineLinks(projects, deadlines)

                if(avg==null)
                {
                    avg = 0;
                }

                dataSet.push({
                    teamId:team.id,
                    teamName:team.name,
                    deadline1:deadlineLinks[0],
                    deadline2:deadlineLinks[1],
                    deadline3:deadlineLinks[2],
                    average:avg
                })

            });

            console.log(dataSet);

            setData(dataSet);

        }
    }

    useEffect( ()=>{ 
        init();
    },[]);

    const formDeadLineLinks = (projects, deadlines) =>{

        let data = new Array(deadlines.length);
        let links= new Array(deadlines.length);
        for(let i=0;i<deadlines.length;i++)
        {
            data[i]=0;
            links[i]='';
        }

        for(let i=0;i<projects.length;i++)
        {
            let projectDate = moment(projects[i].date,"DD.MM.YYYY");
            for(let j=0;j<deadlines.length;j++)
            {
                let deadLineDate = moment(deadlines[j].date,"DD.MM.YYYY");
                if(projectDate<deadLineDate && data[j]<=projectDate)
                {
                    links[j] = projects[i].projectFile;
                }
            }
        }
        return links;
    }
    return (
        store.id ? (
        <div>
            <Button id="btnAddDeadlines" label = "Set deadlines" onClick={()=>navigate(`/professor-add-deadlines/${store.id}`)}/>

            <DataTable value={data} responsiveLayout="scroll">
                        <Column field="teamName" header="Team Name"></Column>
                        <Column field="deadline1" header="Deadline1"></Column>
                        <Column field="deadline2" header="Deadline2"></Column>
                        <Column field="deadline3" header="Deadline3"></Column>
                        <Column field="average" header="Average grade"></Column>
            </DataTable>

        </div>
          ) : (
            <Navigate replace to={{ pathname: '/'}} />
          )
    )

}

export default ProfessorInterface;