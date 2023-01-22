
const API_URL = "https://apy-company.onrender.com/api/company/";   // la API de Jgango que vamos a utilizar


export const listCompanies = async () =>{  // se disena una constante async await, para hacer el consumo de los datos
    const dat = await fetch(API_URL);
   // const data = await dat.json();
   // console.log(data)
    return dat
};

export const getCompany = async (companyId) =>{  // se disena una constante async await, para hacer el consumo de los datos
    
    return await fetch(`${API_URL}${companyId}/`);
} 

export const registerCompany = async (newCompany) => {

/// vamos a utilizar el metodo POST, para registrar una compania
// trim()  eliminar espacio a la derecha e izquierda

    return await fetch(API_URL, {
        method: 'POST',
        headers:{
            'content-Type': 'application/json'
        },
        body:JSON.stringify({
            "name": String(newCompany.name).trim(), 
            "phone": String(newCompany.phone).trim(), 
            "email": String(newCompany.email).trim(), 
            "website": String(newCompany.website).trim()
        })

    });
};

export const updateCompany = async (id, Company) => {

    /// vamos a utilizar el metodo POST, para registrar una compania
    // trim()  eliminar espacio a la derecha e izquierda
    
        return await fetch(`${API_URL}${id}/`, {
            method: 'PUT',
            headers:{
                'content-Type': 'application/json'
            },
            body:JSON.stringify({
                "name": String(Company.name).trim(), 
                "phone": String(Company.phone).trim(), 
                "email": String(Company.email).trim(), 
                "website": String(Company.website).trim()
            })
    
        });
};


export const deleteCompany = async (CompanyId) => {
   
    console.log("ruta de delete");
    console.log(`${API_URL}${CompanyId}/`);

    return await fetch(`${API_URL}${CompanyId}/`, {
                method: 'DELETE'
    });
};