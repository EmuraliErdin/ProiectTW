import { useState } from 'react';
import store from '../Store'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Navigate, useNavigate } from 'react-router-dom';


function AddProjectForm(){

    const [projectFile, setProjectFile] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()


    let addProject = async()=>{
        if(!projectFile || !description || !name)
        {
            alert("The fields have not been completed correctly.");
            return;
        }
        
        let response1 = await fetch(`/api/students/${store.id}`);
        let student = await response1.json();

        const response = await fetch(`/api/projects`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:name,
                projectFile:projectFile,
                description:description,
                teamId:student.teamId,
                date:store.date
            }),
         });


         

         if(response.status === 201)
         {
             alert("The project has been saved");
             navigate(`/student-interface/${store.id}`);
         }
         else
         {
            alert("The project has not been saved.");
         }
    }

    return (

        store.id ? (
        <div>
            <InputText id = "projectName" placeholder = "Name of the stage of the project" value = {name} onChange = {(e) => setName(e.target.value)} /> 
            <InputText id = "projectFile" placeholder = "URL of project file" value = {projectFile} onChange = {(e) => setProjectFile(e.target.value)} /> 
            <InputText id = "description" placeholder = "Description of the stage of the project" value = {description} onChange = {(e) => setDescription(e.target.value)} />
            <Button id="btnAddProject" label = "Add project stage" onClick={()=>addProject()}/> 
        </div>
        ) : (
                <Navigate replace to={{ pathname: '/'}} />
        )
    )

}

export default AddProjectForm;