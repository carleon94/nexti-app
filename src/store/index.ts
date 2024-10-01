import { create } from 'zustand';
import { IEvento } from '../interfaces/IEvento';

interface EventosState {
    list: IEvento[]
}

interface EventosActions {
    setEventos: (rows: IEvento[]) => void
}

const state: EventosState = {
    list: []
}

export const useEventos = create<EventosState & EventosActions >(
  (set) => {
    return {
     ...state,
     setEventos: (rows) => {
        set({
            list: rows
        })
     }
    }
  },
)