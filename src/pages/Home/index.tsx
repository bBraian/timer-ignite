import { useContext } from 'react';

import { Play, HandPalm } from 'phosphor-react';
import * as C from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import { useForm, FormProvider } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as zod  from 'zod';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(5, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60, 'O tempo máximo é 60 minutos!'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {
  const {createNewCycle, activeCycle, interruptCurrentCycle} = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
        task: '',
        minutesAmount: 0
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task');

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <C.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">      

      <FormProvider {...newCycleForm}>
        <NewCycleForm />
      </FormProvider>
      
      <Countdown />

        { activeCycle ? (
          <C.StopCountdownButton type="button" onClick={interruptCurrentCycle}>
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
