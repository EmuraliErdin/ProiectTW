import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from 'primereact/password';
import store from '../Store.js'

function AuthenticationForm() {
    const [name, setName] = useState('');
    const [password, setPassowrd] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const login = async (name, password) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password
            }),
        });
        if (response.status === 200) {
            let persoana = await response.json(); //o singura persoana
            store.id = persoana.id;
            if (persoana.hasOwnProperty('teamId')) {


                if (persoana.teamId === null) {
                    navigate(`/student-without-team/${persoana.id}`)

                } else {
                    navigate(`/student-interface/${persoana.id}`)

                }
            } else {
                navigate(`/professor-interface/${persoana.id}`)
            }

        } else if (response.status !== 200) {
            alert("The account doesn't exist.")
        }
    }

    const validate = async () => {
        if (!name || !password) {
            alert("Campuri necompletate!");
            return;
        }
        login(name,password)

    }

    const changeDate = async()=>{
        store.date = date;
        if(date==='')
        {
            alert("Date problem detected.");
            return;
        }

        const response = await fetch('/api/date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date
            }),
        });

        if(response.status === 200)
        {
            alert("The date succesfully changed!");
        }
        else
        {
            alert("The date has not been changed!")
        }


    }

    return (

        <div>
            <InputText id = "name" placeholder = "Account name" value = { name} onChange = {(e) => setName(e.target.value)} /> 
            <Password id = "pass" placeholder = "Password" value = {password} onChange = {(e) => setPassowrd(e.target.value)} toggleMask feedback={false}/> 
            <Button id = "submit"  label = "Authenticate" onClick = { validate} /> 
            <Button id = "createAcc"  label= "Create account" onClick = {() => navigate('/sign-up')}/>
            <InputText id = "ISchimbaData" placeholder="Date"  value={date} onChange={(e)=>setDate(e.target.value)}/>
            <Button id = "btnSchimbaData" label="Change the date" onClick={changeDate}/>

        </div>
    )

}

export default AuthenticationForm;