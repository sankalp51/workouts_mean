import { useReducer, useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const errorStateObj = {
        error: false,
        titleError: false,
        loadError: false,
        repsError: false,
        message: ''
    }

    const errorReducer = (state, action) => {
        switch (action.type) {
            case 'TITLE_ERROR':
                return { ...errorStateObj, error: true, message: 'Valid title is required', titleError: true }
            case 'LOAD_ERROR':
                return { ...errorStateObj, error: true, message: 'Valid load value is required', loadError: true }
            case 'REP_ERROR':
                return { ...errorStateObj, error: true, message: 'Valid reps value is required', repsError: true }
            case 'SERVER_ERROR':
                return { ...errorStateObj, error: true, message: 'Sorry! could not add workout due to server issue' }
            case 'RESET':
                return { ...errorStateObj }
            default:
                return { ...state }
        }
    }


    const [errorState, errorDispatch] = useReducer(errorReducer, errorStateObj);
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (title.trim() === '' || !isNaN(title)) {
                errorDispatch({ type: 'TITLE_ERROR' });
            }
            else if (load.trim() === '' || typeof +load !== 'number') {
                errorDispatch({ type: 'LOAD_ERROR' });
            }
            else if (reps.trim() === '' || typeof +reps !== 'number') {
                errorDispatch({ type: 'REP_ERROR' })
            }
            else {
                const workout = {
                    title: title,
                    load: +load,
                    reps: +reps
                }
                const response = await axios.post('http://localhost:4000/api/workouts', workout);
                setTitle('');
                setLoad('');
                setReps('');
                dispatch({ type: 'CREATE_WORKOUT', payload: response.data })
            }
        }
        catch (err) {
            if (err.response && err.response.status >= 500 && err.response.status < 600) {
                // setError({
                //     errorState: true,
                //     message: 'Could not upload workout due to a server issue. Please try again later.',
                // });
                errorDispatch({ type: 'SERVER_ERROR' });
            } else {
                console.error('Error uploading workout:', err);
                errorDispatch({ type: 'SERVER_ERROR' });
            }
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            <label>Exercise title</label>
            <input
                style={{ background: errorState.titleError && '#FFCCCC' }}
                type="text"
                value={title}
                onChange={e => { setTitle(e.target.value) }}
                onFocus={() => errorDispatch({ type: 'RESET' })}
            />

            <label>Load (kg)</label>
            <input
             style={{ background: errorState.loadError && '#FFCCCC' }}
                type="number"
                value={load}
                onChange={e => { setLoad(e.target.value) }}
                onFocus={() => errorDispatch({ type: 'RESET' })}
            />

            <label>Reps</label>
            <input
             style={{ background: errorState.repsError && '#FFCCCC' }}
                type="number"
                value={reps}
                onChange={e => { setReps(e.target.value) }}
                onFocus={() => errorDispatch({ type: 'RESET' })}
            />

            <button>Add Workout</button>
            {errorState.error && <div className="error">
                {errorState.message}
            </div>}
        </form>
    )
}

export default WorkoutForm;