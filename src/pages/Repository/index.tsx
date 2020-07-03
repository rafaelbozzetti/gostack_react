import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface RepositoryParams  {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {

    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {

        // modo 1 - em paralelo
        api.get(`/repos/${params.repository}`).then(response => {
            console.log(response);
            setRepository(response.data);
        });
        api.get(`/repos/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        });

        // modo 2 - em fila
        // async function loadData(): Promise<void> {
        //     const repository = await api.get(`/repos/${params.repository}`);
        //     const issues = await api.get(`/repos/${params.repository}/issues`);
        // }        


        // modo 3 - Promise all
        // async function loadData(): Promise<void> {
        //     const [repository, issues] = await Promise.all([
        //         api.get(`/repos/${params.repository}`),
        //         api.get(`/repos/${params.repository}`),
        //     ]);
        // }        

        // loadData();

    },[params.repository]);

    return (
        <>
        <Header>
            <img src={logoImg} alt="Github Explorer" />
            <Link to="/">
                <FiChevronLeft size={16} />
                Voltar
            </Link>
        </Header>

        { repository && (
            <RepositoryInfo>
                <header>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>                    
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>{repository.forks_count}</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>Issues</span>
                    </li>          
                </ul>            
            </RepositoryInfo>
        )}

        <Issues>
            {issues.map((issue) => (
                <a key={issue.id} target="_blank" href={issue.html_url}>
                    <div>
                        <strong>{issue.title}</strong>
                        <p>{issue.user.login}</p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
            ))}
        </Issues>
        </>
    );
}

export default Repository;