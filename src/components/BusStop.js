import './BusStop.css';
import { useEffect, useState } from 'react'
import { useInterval } from '../hooks/useInterval';
import { useFetchBusStopInfo } from '../hooks/useFechBusStopInfo';


function BusStop({ id }) {
    const [buses, setBuses] = useState({ id: null, title: '', freqs: [] })
    const interval = useInterval;
    const fetchInfo = useFetchBusStopInfo;
  
    useEffect(() => {
        fetchInfo(id).then(info => setBuses(info));
    }, [id, fetchInfo])

    interval(() => {
        fetchInfo(id).then(info => setBuses(info));
    }, 30000);

    return (
        <>
            <h2 className="title">{buses.title}</h2>
            {
                buses.freqs.map((bus, i) =>
                    <div key={ `${bus.id}-${i}` } className="frequency">
                    <span className={`bus-line bus-line-${bus.linea}`}>{bus.linea}</span> {bus.time}
                </div>)
            }
        </>
  );
}

export default BusStop;
