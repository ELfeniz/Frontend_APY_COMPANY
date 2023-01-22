import * as companyServer from "../CompanyList/CompanyServer";
import {useNavigate} from 'react-router-dom';   // libreria para navegar entre paginas


export const CompanyItem = ( {company, listcompanies} ) => {

    const navigate = useNavigate();    // creamos una constante de navegacion

    console.log(company.name);


    const handleDelete = async(id)=>{
        console.log(id);
        await companyServer.deleteCompany(id);  // llamamos a la funcion de eliminacion
        listcompanies();
    };

return(

    <div className="col-md-4 mb-4">   {/* creamos 4 columnas con boostrap*/}
        <div className="card card-body">   {/* creamos card dinamicas con estilos de boostrap*/}
            <h3 className="card-title">{company.name}<button className="btn btn-sm ms-2 btn-outline-info" onClick={()=>navigate(`/updateCompany/${company.id}`)}>Update</button></h3>   {/* ms-2 para mover desde el inicio 2 unidades*/}
            <p className="card-text"> Phone : <strong>{company.phone}</strong></p>
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary"> 
                Go to Website
            </a>
            {/* ()=>company.id && handleDelete(company.id )  esta funcion renderizada quiere decir que en caso de que exista el id, llamamos a una funcion para su respectiva eliminacion*/}
            <button onClick={()=> company.id && handleDelete(company.id)} className="btn btn-danger my-2">Delete Company</button>
        </div>
    </div>

)

};
