import React from "react";
import { FiChevronRight } from 'react-icons/fi';

import logoImg from "../../assets/Logo.svg";

import { Title, Form, Repositories } from "./styles";
//mesma coisa que : function Dashboard (){}
const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no Github</Title>;
            <Form action="">
                <input type="text" placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>
            <Repositories>
                <a href="teste">
                    <img
                        src="https://avatars0.githubusercontent.com/u/40966093?s=460&u=fc5e9222dbfdd227ac88cad97c67819c626cb719&v=4"
                        alt="Wlad"
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>Unform is a performance focused library that helps you creating beautiful forms in ReactJS, React Native with the power of uncontrolled components performance and React Hooks.</p>
                    </div>

                    <FiChevronRight size={20} />
                </a>
            </Repositories>
        </>
    );
};

export default Dashboard;
