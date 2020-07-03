import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Title, Form, Repositories, Error } from './styles';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');
        if(storageRepositories) {
            return JSON.parse(storageRepositories);
        }else{
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if(!newRepo) {
            setInputError('Digita o author/name do repositório');
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)
        
            const repository = response.data;
    
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
    
        }catch (err) {
            setInputError('Erro na busca nesse repositório');
        }


    }

    return (
        <>
        <img src={logo} alt="logo" /> 
        <Title>Explore repositorios no Github</Title>
        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
            <input 
                type="text" 
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
                placeholder="Digite o repositório" />
            <button type="submit">Procurar</button>
        </Form>

        { inputError && <Error>{inputError}</Error> }
        
        <Repositories>
            {repositories.map(repository => (
                <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
                    <img 
                        alt={repository.owner.login} 
                        src={repository.owner.avatar_url} 
                    />
                    <div>
                    <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            ))}
        </Repositories>
        </>
    )
}

export default Dashboard;