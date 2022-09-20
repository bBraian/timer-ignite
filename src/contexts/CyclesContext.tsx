import { createContext, ReactNode, useState } from "react";

export const CyclesContext = createContext({} as CyclesContextType)

interface Cycle {
    id: string
    task: string
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

interface NewCycleFormData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: NewCycleFormData) => void;
    interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

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

    function createNewCycle(data: NewCycleFormData) {
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
      }
    
      function interruptCurrentCycle() {
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
    
    return (
        <CyclesContext.Provider 
            value={{
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished, 
                amountSecondsPassed, 
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}