import React, { createContext, useReducer } from 'react';

const initialState = {
    lessons: [],
    error: null,
    loading: false
};

export const AppContext = createContext(initialState);

// Reduced actions
export const SET_LESSONS = 'SET_LESSONS';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_LESSONS:
            return { 
                ...state, 
                lessons: action.payload,
                loading: false 
            };
        case SET_ERROR:
            return { 
                ...state, 
                error: action.payload,
                loading: false 
            };
        case SET_LOADING:
            return { 
                ...state, 
                loading: action.payload 
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};