import './BusStop.css';
import { useState } from 'react'
import { useInterval } from '../hooks/useInterval';
import { useFetchBusStopInfo } from '../hooks/useFechBusStopInfo';


function BusStop({ id }) {
    const [buses, setBuses] = useState({ id: null, title: '', freqs: [] })
    const interval = useInterval;
    const fetchInfo = useFetchBusStopInfo;
  
    interval(() => {
        fetchInfo(id).then(info => setBuses(info));
    }, 30000);

    return (
        <>
            <h2 className="title">{buses.title}</h2>
            {
                buses.freqs.map(bus =>
                    <div key={ bus.id } className="frequency">
                    <span className={`bus-line bus-line-${bus.linea}`}>{bus.linea}</span> {bus.time}
                </div>)
            }
        </>
  );
}

export default BusStop;
