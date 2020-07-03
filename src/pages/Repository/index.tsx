import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface RepositoryParams  {
    repository: string;
}

const Repository: React.FC = () => {

    const { params } = useRouteMatch<RepositoryParams>();

    return (
        <>
        <Header>
            <img src={logoImg} alt="Github Explorer" />
            <Link to="/">
                <FiChevronLeft size={16} />
                Voltar
            </Link>
        </Header>
        <RepositoryInfo>
            <header>
                <img src="https://avatars3.githubusercontent.com/u/1187643?s=460&u=83c5d93c88c0756ac0af0994d0ba7043c5dd8332&v=4" alt="teste" />
                <div>
                    <strong>rafaelbozzetti/gostack</strong>
                    <p>teste</p>
                </div>                    
            </header>
            <ul>
                <li>
                    <strong>12123</strong>
                    <span>Stars</span>
                </li>
                <li>
                    <strong>12312</strong>
                    <span>Forks</span>
                </li>
                <li>
                    <strong>12312</strong>
                    <span>Issues</span>
                </li>          
            </ul>            
        </RepositoryInfo>
        <Issues>
            <Link to="21321">
                <div>
                <strong>dasd</strong>
                    <p>adasd</p>
                </div>
                <FiChevronRight size={20} />
            </Link>
        </Issues>
        </>
    );
}

export default Repository;