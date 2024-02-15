import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();
    const handleClick = async () => {
        const response = await axios.delete(`http://localhost:4000/api/workouts/${workout._id}`)
        if (response) {
            dispatch({ type: 'DELETE', payload: response.data })
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick}><DeleteOutlineIcon /></span>
        </div>

    )
}

export default WorkoutDetails;