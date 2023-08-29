import {NavLink} from 'react-router-dom';
export const NavBar = ()=>{
    return (<>
        <NavLink to="/"> Home </NavLink>
       
        <NavLink to="/add"> Add Note </NavLink>
        
        <NavLink to="/view-all"> View All </NavLink>
        

        {/* <NavLink to="/delete"> Delete Notes </NavLink>
        <NavLink to="/view-all"> View All </NavLink>
        <NavLink to="/search"> Search Notes </NavLink> */}
    </>)
}