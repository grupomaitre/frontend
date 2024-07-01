import { useState, useEffect } from 'react';

function Reloj() {
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setHora(new Date());
        }, 1000);

        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(intervalID);
    }, []); // El segundo argumento del useEffect es un array de dependencias, vacío para que se ejecute solo una vez al montar el componente.

    const formatoHora = () => {
        const horas = hora.getHours().toString().padStart(2, '0');
        const minutos = hora.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
    };
    return (
        <>
            {formatoHora()}
        </>
    );
}

export default Reloj;
