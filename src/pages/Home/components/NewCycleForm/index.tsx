import * as C from './styles';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext()  

    return (
        <C.FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <C.TaskInput 
            type="text" 
            id="task"
            list='task-suggestions'
            placeholder='Dê um nome para o seu projeto'
            {...register('task')}
            disabled={!!activeCycle}
            />

            <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Banana" />
            </datalist>

            <label htmlFor="minutesAmount">Durante</label>
            <C.MinutesAmountInput 
            type="number" 
            id="minutesAmount"
            placeholder='00'
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber: true})}
            disabled={!!activeCycle}
            />

            <span>minutos.</span>
        </C.FormContainer>
    )
}