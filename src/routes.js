import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import { Companylist } from './components/CompanyList';
import { CompanyForm } from './components/CompanyForm';


import { Navbar } from './components/Navbar';


const AppRoutes = () => (
<Router>
  <Navbar/>
    <Routes>
          <Route path='/' exact element={ <Companylist/> }></Route>
          <Route path='/form' exact element={ <CompanyForm/> }></Route>
          <Route path='/updateCompany/:id' exact element={ <CompanyForm/> }></Route>
          <Route path='*' exact element={ <Companylist/> }></Route>

    </Routes>
</Router>
  );
  
  export default AppRoutes;