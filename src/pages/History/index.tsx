import * as C from './styles';

export function History() {
    return (
        <C.HistoryContainer>
            <h1>Meu histórico</h1>

            <C.HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Limpar quarto</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 1 semana</td>
                            <td>
                                <C.Status statusColor='green'>Concluído</C.Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Limpar quarto</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 1 semana</td>
                            <td>
                                <C.Status statusColor='green'>Concluído</C.Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Limpar quarto</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 1 semana</td>
                            <td>
                                <C.Status statusColor='green'>Concluído</C.Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Limpar quarto</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 1 semana</td>
                            <td>
                                <C.Status statusColor='green'>Concluído</C.Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Limpar quarto</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 1 semana</td>
                            <td>
                                <C.Status statusColor='green'>Concluído</C.Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Limpar quarto</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 1 semana</td>
                            <td>
                                <C.Status statusColor='yellow'>Em andamento</C.Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Limpar quarto</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 1 semana</td>
                            <td>
                                <C.Status statusColor='red'>Interrompido</C.Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </C.HistoryList>
        </C.HistoryContainer>
    )
}