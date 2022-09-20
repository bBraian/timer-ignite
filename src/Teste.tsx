import { createContext, useContext, useState } from "react";


const cProps = createContext({} as any)


export function Teste() {
    const [activeCycle, setActiveCycle] = useState(0);
    return (
        <cProps.Provider value={{activeCycle, setActiveCycle}}>
            <div>
                Teste components
                <C1 />
            </div>
        </cProps.Provider>
    )
}

function C1() {
    const {activeCycle, setActiveCycle} = useContext(cProps);
    return (
        <>
            <h1>C1: {activeCycle}</h1>
            <button onClick={() => setActiveCycle(state => state + 1)}>oi</button>
        </>
    )
}