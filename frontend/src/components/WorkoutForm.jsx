import { useState } from "react";
import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState({
        errorState: false,
        message: ''
    })

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (title.trim() === '' || !isNaN(title)) {
                setError(prevState => {
                    return {
                        ...prevState,
                        errorState: true,
                        message: 'Valid title is required'
                    }
                })
            }
            else if (load.trim() === '' || typeof +load !== 'number') {
                setError(prevState => {
                    return {
                        ...prevState,
                        errorState: true,
                        message: 'Valid load value is required'
                    }
                })
            }
            else if (reps.trim() === '' || typeof +reps !== 'number') {
                setError(prevState => {
                    return {
                        ...prevState,
                        errorState: true,
                        message: 'Valid reps value is required'
                    }
                })
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
                setError({
                    errorState: true,
                    message: 'Could not upload workout due to a server issue. Please try again later.',
                });
            } else {
                console.error('Error uploading workout:', err);
                setError({
                    errorState: true,
                    message: 'An unexpected error occurred. Please try again.',
                });
            }
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>
            <label>Exercise title</label>
            <input
                type="text"
                value={title}
                onChange={e => { setTitle(e.target.value) }}
                onFocus={() => setError(prevState => { return { ...prevState, errorState: false } })}
            />

            <label>Load (kg)</label>
            <input
                type="number"
                value={load}
                onChange={e => { setLoad(e.target.value) }}
                onFocus={() => setError(prevState => { return { ...prevState, errorState: false } })}
            />

            <label>Reps</label>
            <input
                type="number"
                value={reps}
                onChange={e => { setReps(e.target.value) }}
                onFocus={() => setError(prevState => { return { ...prevState, errorState: false } })}
            />

            <button>Add Workout</button>
            {error.errorState && <div className="error">
                {error.message}
            </div>}
        </form>
    )
}

export default WorkoutForm;