import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskPortal = ({ service }) => {
    const [taskers, setTaskers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTaskers = async () => {
            try {
                setLoading(true);
                setError(null);

                
                const response = await axios.get(`/taskers/service/${service}/`);
                setTaskers(response.data);
            } catch (err) {
                setError('Failed to fetch taskers');
            } finally {
                setLoading(false);
            }
        };

        fetchTaskers();
    }, [service]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <h1>Taskers for {service}</h1>
            {taskers.length > 0 ? (
                <ul>
                    {taskers.map(tasker => (
                        <li key={tasker.id}>{tasker.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No taskers available for this service.</p>
            )}
        </>
    );
}

export default TaskPortal;
