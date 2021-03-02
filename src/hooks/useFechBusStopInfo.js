
export function useFetchBusStopInfo(busStopId) {
    const apiUrl = `http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/transporte-urbano/poste/tuzsa-${busStopId}.json`
    return fetch(apiUrl)
        .catch (e => {
            console.log(e);
            return null;
            })
        .then((response) => response ? response.json() : { id: null, title: '', destinos: [] })
        .then((data) => {
            if(!data) { return null }
            const busesInfo = {
                id: data.id,
                title: data.title,
                freqs: []
            }
            data.destinos.map((d) =>
                busesInfo.freqs.push(
                    { linea: d.linea, time: d.primero },
                    { linea: d.linea, time: d.segundo }
                )
            );
            busesInfo.freqs.sort((a, b) => {
                const minutesA = a.time.replace(" minutos.", "").replace("Sin estimacin.", 999);
                const minutesB = b.time.replace(" minutos.", "").replace("Sin estimacin.", 999);
                return minutesA - minutesB;
            });
            return (busesInfo);
        });
}