import iconTT from '../assets/icons8-twitter.svg';
import { NavLink } from './nav-link';

export function Header(){
    return (
    <div className="flex items-center gap-5">
        <img src={iconTT} alt="Twitter Placeholder" />
        <nav className="flex items-center gap-5 py">
            <NavLink href='/eventos'>Eventos</NavLink>
            <NavLink href='/participantes'>Participantes</NavLink>
        </nav>
    </div>
    )
}