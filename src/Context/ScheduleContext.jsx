import React, {createContext, useState} from "react"
import AllSchedule from '../Assets/Schedule'

export const ScheduleContext = createContext(null);

const getDefaultSchedule = ()=>{
    let Schedule = {};
    for(let index = 0; index < AllSchedule.length+1; index++){
        Schedule[index] = 0;
    }
    return Schedule
}

const ScheduleContextProvider = (props)=>{

    const[ScheduleItems, setScheduleItems] = useState(getDefaultSchedule())

    
    const contextValue = {AllSchedule, ScheduleItems,  };
    return(
        <ScheduleContext.Provider value={contextValue}>
            {props.children}
        </ScheduleContext.Provider>
    )
}

export default ScheduleContextProvider;