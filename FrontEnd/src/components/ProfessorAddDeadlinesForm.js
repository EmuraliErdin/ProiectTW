import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {useState} from 'react'; 

function ProfessorAddDeadlinesForm()
{

    const [deadline1, setDeadline1] = useState('');
    const [deadline2, setDeadline2] = useState('');
    const [deadline3, setDeadline3] = useState('');
    
    const handleClick = async ()=>{
        if(!deadline1 || !deadline2 || !deadline3)
        {
            alert("All fields should be completed before proceding.");
            return;
        }

        const response1 = await fetch(`/api/deadlines`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number:1,
                date:deadline1
            }),
         });

         const response2 = await fetch(`/api/deadlines`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number:2,
                date:deadline2
            }),
         });

         const response3 = await fetch(`/api/deadlines`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number:3,
                date:deadline3
            }),
         });

         if(response1.status === 201 && response2.status === 201 && response3.status === 201)
         {
             alert("The deadlines have been saved succesfully!");
         }
         else
         {
            alert("The deadlines have not been saved!");
         }

    }

    return (
<div>
    <InputText placeholder='deadline1' value={deadline1.data} onChange={(e)=>setDeadline1(e.target.value)}/>
    <InputText placeholder='deadline2' value={deadline2.data} onChange={(e)=>setDeadline2(e.target.value)}/>
    <InputText placeholder='deadline3' value={deadline3.data} onChange={(e)=>setDeadline3(e.target.value)}/>
    <Button id="btnAddDeadlines" label = "Set deadlines" onClick={()=>handleClick()}/>
</div>

);
}

export default ProfessorAddDeadlinesForm;