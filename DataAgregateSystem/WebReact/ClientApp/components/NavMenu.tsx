import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div style = {{margin : 20}}>
            <Link className='navbar-brand' to={'/graph'}>Парсер пробок Красноярск</Link>
            <ul>
                <li>
                    <NavLink to={'/graph'}>График изменения пробок</NavLink>
                </li>
                <li>
                    <NavLink to={'/map'}>Карта Красноярска</NavLink>
                </li>
            </ul>
        </div>;
    }
}
