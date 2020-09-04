import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/Logo.svg";

import { Title, Form, Repositories, Error } from "./styles";

//Não precisa colocar a tipagem de tudo que o repositório vai ter KKK;
interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState("");
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [inputError, setInputError] = useState("");

    //1- Adicionar um novo repositório -> newRepo
    //2- Consumir api do github, 3- salvar o novo repositório no estado;
    async function handleAddRepository(event: FormEvent) {
        event.preventDefault();
        if (!newRepo) {
            setInputError("Digite o autor/nome do repositório");
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;

            setRepositories([...repositories, repository]);
            setNewRepo("");
            setInputError("");
        } catch (err) {
            setInputError("Erro na busca por esse repositório");
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>;
            {/* Ter acesso à propriedades que passa para os componentes estilizados
                por dentro dos estilos!!! Boolean(inputError) converte de bool pra string;
                Também dá pra usar a dupla negação, Thuthy, falsy */}
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    type="text"
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>
            {inputError && <Error>{inputError}</Error>};
            <Repositories>
                {repositories.map((repository) => (
                    <a key={repository.full_name} href="teste">
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
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
    );
};

export default Dashboard;
