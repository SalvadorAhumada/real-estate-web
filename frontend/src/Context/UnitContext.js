import { createContext, useState } from 'react';

export const UnitContext = createContext({});

export const UnitContextProvider = ({ children }) => {

    const[TOTAL_COUNT, SET_TOTAL_COUNT] = useState([]);

    const GET_COUNT = async () => {
        let units = await fetch('http://localhost:3030/api/units/count', {
          method: 'GET',
          credentials: "include",
          headers: {
              'Content-Type': 'application/json',
          },
      });
      units = await units.json();
      SET_TOTAL_COUNT(units.data);
      return units;
      }

    const userContext = {
        GET_COUNT,
        TOTAL_COUNT
    }

    return <UnitContext.Provider value={userContext}>
        {children}
    </UnitContext.Provider>
}
export const { UnitContextConsumer } = UnitContext;