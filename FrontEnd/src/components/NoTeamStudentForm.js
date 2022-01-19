import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import {useNavigate, Navigate} from 'react-router-dom'
import store from '../Store'

function NoTeamStudentForm(){
    const [team,setTeam] = useState('');
    const navigate = useNavigate();

    const createTeam = async ()=>
    {
        if(!team)
        {
            alert('The fields have not been completed properly.');
        }
        else
        {
            const response = await fetch('/api/teams',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name":team
                }),
             });

             let response1 = await fetch(`/api/teams?filter=name-eq-${team}`);

             let teamfromDB = await response1.json();
             console.log(teamfromDB);

             await fetch(`/api/students/${store.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "teamId":teamfromDB[0].id
                }),
             });
             

             if(response.status == 201)
             {
                alert(`The team has been created! Congratulations, now you are the first member of ${team}`);
                navigate(`/student-interface/${store.id}`)
             }
             else
             {
                 alert('The team could not be created at this time. Try again later.')
             }
        }


    }

    let joinTeam = async()=>
    {
        if(!team)
        {
            alert('The fields have not been completed properly.');
            return;
        }

        let response = await fetch(`/api/teams?filter=name-eq-${team}`);

        let teamfromDB =null;
        
        try{
            teamfromDB = await response.json();
        }
        catch(e)
        {
            console.log(e);
        }


        if(teamfromDB!=null)
        {
            await fetch(`/api/students/${store.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "teamId":teamfromDB[0].id
                }),
             });
        }
        else
        {
            alert(`Nu exista echipa ${team}`);
        }
        console.log(response.status)

        if(response.status == 200)
        {
           alert(` Congratulations, you are now a member of ${team}!`);
           navigate(`/student-interface/${store.id}`)
        }


    }

    return (

        store.id ? (
            <div>
            <InputText id="teamName" type="text" placeholder="Team name" value={team} onChange={(e)=>setTeam(e.target.value)}/>
            <Button id="createTeam" label="Create a team" onClick={()=>createTeam()}/> 
            <Button id="joinTeam" label="Join a team" onClick={()=>joinTeam()}/> 

        </div>
          ) : (
            <Navigate replace to={{ pathname: '/'}} />
          )

    )

}

export default NoTeamStudentForm;