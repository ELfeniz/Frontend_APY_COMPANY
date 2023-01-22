
import { useEffect } from "react";
import { useState } from "react";

import {useNavigate, useParams } from 'react-router-dom';   // libreria para navegar entre paginas, el USEParamas se usa para ver los parametros recibidos, y validar la info

import * as companyServer from "../CompanyList/CompanyServer";

export function CompanyForm () {

    const navigate = useNavigate();    // creamos una constante de navegacion
    const param = useParams(); // definimos una variable, para almacenar los paramteros recibidos

    console.log('parametros:', param);  // ver los parametros recibidos

    const initialState = { id:0, name:"", phone:"", email:"", website:""};

    const [company, setcompany] = useState(initialState);

    const handleInputChange = (e) => {
        setcompany({ ...company, [e.target.name]: e.target.value });  // {} definimos el objeto
        // los ...  --> indicamos un operador split, los 3 puntos, para el estado actual de la compania
        // y decimos que vamos a modificar el atributo, tarjet.name, con tarjet.values
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();

        try{
            if (!param.id){

                console.log(company);
                const res = await companyServer.registerCompany(company);
                const data = await res.json();
                console.log(data);
                if(data.message == "Success"){
                    setcompany(initialState);
                }

            }else{
                
                await companyServer.updateCompany(param.id, company);

            }

            navigate("/");        // cuando ya registre una empresa, volvemos a la pagina principal

        }catch(error){
            console.log(error);
        }

    };

    const getCompany = async(companyID) => {
        try{
            const res = await companyServer.getCompany(companyID); // se utiliza la funcion, para el consumo de la API
            const data = await res.json(); // se convierte los datos en un Json para poder obtener los datos del body
            console.log(data);
            const { name, phone, email, website} = data.company;   // esto esta renderizado debido a que name = {name:name}
            setcompany({ name, phone, email, website });

        } catch(error){
            console.log(Error)
        }
    }

    useEffect(()=>{
        if (param.id){
            console.log(param.id)
            getCompany(param.id)
        }
    }, []);


    return(
        <div className="col-md-4 mx-auto my-4">     {/* mx-auto, margen en x y margen en y*/}
            <h1 className="mx-5"> Registro de Compañia...</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label  className="form-label">Name</label>
                <input type="text" className="form-control"   maxLength="50" minLength="2" name="name"    // los name, deben conicidir con los atributos del objeto  de los initialState
                value={company.name} onChange={handleInputChange} placeholder="Ingrese el nombre de la empresa"></input>
            </div>
            
            <div className="mb-3">
                <label  className="form-label">Phone</label>
                <input type="text" className="form-control" minLength="2" name="phone"
                maxLength="50" value={company.phone} onChange={handleInputChange} placeholder="Ingrese el numero de contacto de la empresa"></input>    {/* autoFocus required  --> sirve para enfocarse en ese custionario rinicialmente*/}
            </div>

            <div className="mb-3">
                <label  className="form-label">Email</label>
                <input type="email" className="form-control"  maxLength="50" name="email"
                placeholder="Ingrese el correo electronico de la empresa" value={company.email} onChange={handleInputChange}></input>
            </div>

            <div className="mb-3">
                <label  className="form-label">Website</label>
                <input type="url" className="form-control" maxLength="50" name="website"
                placeholder="Ingrese la ruta de acceso a la pagina de la empresa" value={company.website} onChange={handleInputChange}></input>
            </div>
            <div className="d-grid gap-2">

                {param.id?(           // si param es diferente de Null entonces
                        <button type="submit" className="btn btn-block btn-primary">
                            Update
                        </button>

                    ) : (                               //sino
                        <button type="submit" className="btn btn-block btn-success">
                            Register
                        </button>
                    )}

            </div>
            </form>
        </div>

    )

};