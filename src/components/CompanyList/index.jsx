import { useEffect, useState } from "react";

// Importamos nuestra funcion para hacer la peticion a la API
import * as companyServer from './CompanyServer';

// Importamos Componentes
import { CompanyItem } from "./CompanyItem";


export function Companylist ()  {

// const initialState = [{
//     id:1,
//     name: "Facebook",
//     fonundation: 1984
// },
// {
//     id:2,
//     name: "Uber",
//     fonundation: 200
// }];

const [companies, setcompanies] = useState([]);  // arreglo vacio

// funcion flecha para consumir API, y revisar si nos arroja un error
const listcompanies = async () => { 
     // definimos una async await, debido a que estamos esperando el consumo de la API
    try{
        const res = await companyServer.listCompanies(); // se utiliza la funcion, para el consumo de la API
        const data = await res.json(); // se convierte los datos en un Json para poder obtener los datos del body
        console.log(data);
        console.log(data.companies);
        setcompanies(data.companies) // guardamos los datos de la API en el usestate
    } catch (error){   // en caso de que ocurra un error
        console.log(error);
    }
};

// se consume una unica vez la funcion anterior
useEffect(()=>{    // generando una cominicacion con javascript
    listcompanies();
}, []);  // con el arreglo vacio se ejecuta una unica vez

    return(
    <div className='container my-4'>
        <div className="row">
            {companies.map((company)=> (
                <CompanyItem key={company.id} company={company} listcompanies={listcompanies} />   
            ))}

        </div>
        </div>

        
    )
};