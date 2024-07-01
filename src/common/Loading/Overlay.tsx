import './Overlay.css'; // Estilos del overlay

const Overlay = () => {
  // Si show es false, no se mostrará el overlay
  /*   if (!show) return null; */

  return (
    <div className="overlay"/*  onClick={onClick} */>
      <div className="spinnerContainer">
        <div className="spinner"></div>
        <div className="loader">
          <p className='text-black'>Espere..</p>
          <div className="words">
            <span className="word">Obteniendo Datos</span>
            <span className="word">Obteniendo Datos</span>
            <span className="word">Obteniendo Datos</span>
            <span className="word">Obteniendo Datos</span>
            <span className="word">Obteniendo Datos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;