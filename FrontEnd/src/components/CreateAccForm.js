import { InputText } from "primereact/inputtext";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Checkbox } from 'primereact/checkbox';
import store from '../Store'
import { Button } from "primereact/button";
import { Password } from "primereact/password";

function CreateAccForm(){
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassowrd] = useState('');
    const [email,setEmail] = useState('');
    const [isProfessor,setIsProfessor] = useState(false);
    
    const navigate = useNavigate();

    let handleClick = async ()=>{
        if(!firstName || !lastName || !password || !email)
        {
            alert('Toate campurile trebuie completate');
        }else{
            let cases = (isProfessor) ? 'professors':'students';
            
            const response = await fetch(`/api/${cases}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,lastName, email, password
                }),
             });
             console.log(response.status);
             if(response.status===201)
             {
                alert('S-a creat contul.');
                navigate('/');
             }
             else{
                 alert('Nu s-a putut adauga in baza de date.')
             }
        }
    }

    return (

        <div>
            <InputText id="firstName" placeholder="First name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <InputText id="lastName" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <InputText id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Password id="pass"  placeholder="Password" checked={password} onChange={(e)=>setPassowrd(e.target.value)} toggleMask />
            <label for="esteProfesor" >Are you a professor?</label>
            <input id="esteProfesor" type="checkbox" name="esteProfesor" value={isProfessor} onChange={(e)=>setIsProfessor(e.target.value)}></input>
            <Button id="createAcc" label="Create account" onClick={()=>handleClick()}/> 
        </div>
    )

}

export default CreateAccForm;