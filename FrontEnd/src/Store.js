
class Store{
    constructor()
    {
        this.id=null;
        this.date = '17.10.2021';
    }
    
    async login(name, password)
    {
        const response = await fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,password
            }),
         });
         
         if(response.status===200)
         {
            let persoana = await response.json(); //o singura persoana
            return persoana;
        }
        else if(response.status!==200)
        {
            return null;
        }
    }
}

const store = new Store();

export default store;