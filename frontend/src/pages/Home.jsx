import WorkoutDetails from "../components/WorkoutDetails";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useEffect} from "react";
import axios from "axios";
import WorkoutForm from "../components/WorkoutForm";

// ...

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/workouts');
                dispatch({ type: 'SET_WORKOUTS', payload: response.data });
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, []);

    const noWorkouts = <p className="no-workouts">No workouts available</p>;

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))
                ) : (
                    noWorkouts
                )}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
