import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div>
            <Link className='navbar-brand' to={'/'}>Парсер пробок Красноярск</Link>
            <ul>
                <li>
                    <NavLink exact to={'/'}>Главная страница</NavLink>
                </li>
                <li>
                    <NavLink to={'/graph'}>График изменения пробок</NavLink>
                </li>
                <li>
                    <NavLink to={'/fetchdata'}>Карта красноярска</NavLink>
                </li>
            </ul>
        </div>;
    }
}
