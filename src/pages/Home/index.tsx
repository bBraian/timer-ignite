import { createContext, useState } from 'react';

import { Play, HandPalm } from 'phosphor-react';
import * as C from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as zod  from 'zod';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60, 'O tempo máximo é 60 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
        task: '',
        minutesAmount: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycleId = String(new Date().getTime());

    const newCycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycleId);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles(state =>
      state.map(cycle => {
        if(cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
    }))

    setActiveCycleId(null);
  }

  function markCurrentCycleAsFinished() {
    setCycles(state => 
      state.map(cycle => {
        if(cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
    }))
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  const task = watch('task');

  return (
    <C.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

      <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        
        <Countdown />
      </CyclesContext.Provider>

        { activeCycle ? (
          <C.StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </C.StopCountdownButton>
        ) : (
          <C.StartCountdownButton disabled={!task} type="submit">
            <Play size={24} />
            Começar
          </C.StartCountdownButton>
        )}
      </form>
    </C.HomeContainer>
  )
}
