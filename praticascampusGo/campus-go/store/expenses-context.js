
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  updateExpense: (id, expense) => {},
  deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];

    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    case 'SET':
      return [...action.payload];

    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem('@expenses');

        if (storedExpenses !== null) {
          const parsedExpenses = JSON.parse(storedExpenses);

          if (Array.isArray(parsedExpenses)) {
            dispatch({ type: 'SET', payload: parsedExpenses });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem('@expenses', JSON.stringify(expensesState));
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    }

    saveExpenses();
  }, [expensesState, isLoaded]);

  function addExpense(expense) {
    dispatch({ type: 'ADD', payload: expense });
  }

  function updateExpense(id, expense) {
    dispatch({
      type: 'UPDATE',
      payload: { ...expense, id },
    });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (context === undefined) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider.');
  }

  return context;
}
