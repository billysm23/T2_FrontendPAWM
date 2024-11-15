import { useCallback, useContext } from 'react';
import { AppContext, SET_ERROR, SET_LESSONS, SET_LOADING, UPDATE_PROGRESS } from '../context/AppContext';
import { lessonService } from '../services/lessonService';
import { progressService } from '../services/progressService';

export const useApp = () => {
    const { state, dispatch } = useContext(AppContext);

    const setLoading = useCallback((loading) => {
        dispatch({ type: SET_LOADING, payload: loading });
    }, [dispatch]);

    const setError = useCallback((error) => {
        dispatch({ type: SET_ERROR, payload: error });
    }, [dispatch]);

    const fetchLessons = useCallback(async () => {
        try {
            setLoading(true);
            const data = await lessonService.getLessons();
            dispatch({ type: SET_LESSONS, payload: data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [dispatch, setLoading, setError]);

    const fetchProgress = useCallback(async () => {
        try {
            setLoading(true);
            const data = await progressService.getUserProgress();
            dispatch({ type: UPDATE_PROGRESS, payload: data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [dispatch, setLoading, setError]);

    return {
        ...state,
        fetchLessons,
        fetchProgress,
        setLoading,
        setError
    };
};