import { Play } from 'phosphor-react';
import * as C from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod  from 'zod';
import { useState } from 'react';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60, 'O tempo máximo é 60 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycleId = String(new Date().getTime());

    const newCycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount
    }

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycleId);

    reset();
  }

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');

  return (
    <C.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

        <C.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <C.TaskInput 
            type="text" 
            id="task"
            list='task-suggestions'
            placeholder='Dê um nome para o seu projeto'
            {...register('task')}
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
          />

          <span>minutos.</span>
        </C.FormContainer>

        <C.CountdownContainer>
          <span>{minutes[0]}</span><span>{minutes[1]}</span>
          <C.Separator>:</C.Separator>
          <span>{seconds[0]}</span><span>{seconds[0]}</span>
        </C.CountdownContainer>

        <C.StartCountdownButton disabled={!task} type="submit">
          <Play size={24} />
          Começar
        </C.StartCountdownButton>
      </form>
    </C.HomeContainer>
  )
}
