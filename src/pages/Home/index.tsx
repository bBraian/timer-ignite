import { Play } from 'phosphor-react';
import * as C from './styles';

export function Home() {
  return (
    <C.HomeContainer>
      <form action="">

        <C.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <C.TaskInput 
            type="text" 
            id="task"
            list='task-suggestions'
            placeholder='Dê um nome para o seu projeto'
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
          />

          <span>minutos.</span>
        </C.FormContainer>

        <C.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <C.Separator>:</C.Separator>
          <span>0</span>
          <span>0</span>
        </C.CountdownContainer>

        <C.StartCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </C.StartCountdownButton>
      </form>
    </C.HomeContainer>
  )
}
