import React, { createContext, useReducer } from 'react';

const initialState = {
    lessons: [],
    progress: null,
    loading: false,
    error: null
};

export const AppContext = createContext(initialState);

// Actions
export const SET_LESSONS = 'SET_LESSONS';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const RESET_STATE = 'RESET_STATE';

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_LESSONS:
            return { ...state, lessons: action.payload };
        case UPDATE_PROGRESS:
            return { ...state, progress: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        case RESET_STATE:
            return initialState;
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