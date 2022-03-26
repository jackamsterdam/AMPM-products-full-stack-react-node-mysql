import "./Menu.css";
import { NavLink } from 'react-router-dom'

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <NavLink to='/products-list'>Products</NavLink>
            <NavLink to='/add-prdouct'>Add Product</NavLink>
		
        </div>
    );
}

export default Menu;
