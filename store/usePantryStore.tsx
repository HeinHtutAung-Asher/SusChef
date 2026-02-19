import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface PantryState {
  ingredients: Ingredient[];
}

type PantryAction =
  | { type: 'ADD_INGREDIENT'; payload: { name: string; amount: number; unit: string } }
  | { type: 'REMOVE_INGREDIENT'; payload: string }
  | { type: 'UPDATE_INGREDIENT'; payload: { id: string; updates: Partial<Ingredient> } }
  | { type: 'CLEAR_PANTRY' };

const initialState: PantryState = {
  ingredients: [
    { id: '1', name: 'Rice', amount: 2, unit: 'cups' },
    { id: '2', name: 'Eggs', amount: 6, unit: 'pcs' },
  ],
};

function pantryReducer(state: PantryState, action: PantryAction): PantryState {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ingredients: [
          ...state.ingredients,
          {
            id: Date.now().toString(),
            name: action.payload.name.trim(),
            amount: action.payload.amount,
            unit: action.payload.unit,
          },
        ],
      };
    case 'REMOVE_INGREDIENT':
      return {
        ingredients: state.ingredients.filter((ing) => ing.id !== action.payload),
      };
    case 'UPDATE_INGREDIENT':
      return {
        ingredients: state.ingredients.map((ing) =>
          ing.id === action.payload.id ? { ...ing, ...action.payload.updates } : ing
        ),
      };
    case 'CLEAR_PANTRY':
      return { ingredients: [] };
    default:
      return state;
  }
}

interface PantryContextType {
  state: PantryState;
  addIngredient: (name: string, amount?: number, unit?: string) => void;
  removeIngredient: (id: string) => void;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => void;
  clearPantry: () => void;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function usePantryStore(): PantryContextType {
  const context = useContext(PantryContext);
  if (!context) {
    throw new Error('usePantryStore must be used within PantryProvider');
  }
  return context;
}

interface PantryProviderProps {
  children: ReactNode;
}

export function PantryProvider({ children }: PantryProviderProps) {
  const [state, dispatch] = useReducer(pantryReducer, initialState);

  const addIngredient = (name: string, amount = 1, unit = 'pcs') => {
    dispatch({ type: 'ADD_INGREDIENT', payload: { name, amount, unit } });
  };

  const removeIngredient = (id: string) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: id });
  };

  const updateIngredient = (id: string, updates: Partial<Ingredient>) => {
    dispatch({ type: 'UPDATE_INGREDIENT', payload: { id, updates } });
  };

  const clearPantry = () => {
    dispatch({ type: 'CLEAR_PANTRY' });
  };

  const value: PantryContextType = {
    state,
    addIngredient,
    removeIngredient,
    updateIngredient,
    clearPantry,
  };

  return (
    <PantryContext.Provider value={value}>
      {children}
    </PantryContext.Provider>
  );
}
