import {reducer} from './reducer';
import { createContext } from 'react';
import { ContextType, DataType, ProviderType } from './types';

const initialState: DataType = {
    tenant: null
}

export const AppContext = createContext<ContextType>({
    state: initialState,
    dispatch: () => { }
});

export const Provider = ({children} : ProviderType) => {
    
}