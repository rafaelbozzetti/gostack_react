import React, { useState, FormEvent } from 'react';
import logo from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';
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
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const response = await api.get<Repository>(`repos/${newRepo}`)
        
        const repository = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo('');

    }

    return (
        <>
        <img src={logo} alt="logo" /> 
        <Title>Explore repositorios no Github</Title>
        <Form onSubmit={handleAddRepository}>
            <input 
                type="text" 
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
                placeholder="Digite o repositório" />
            <button type="submit">Procurar</button>
        </Form>

        <Repositories>
            {repositories.map(repository => (
                <a key={repository.full_name} href="teste">
                    <img 
                        alt={repository.owner.login} 
                        src={repository.owner.avatar_url} 
                    />
                    <div>
                    <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
            ))}
        </Repositories>
        </>
    )
}

export default Dashboard;