import { FC } from 'react';
import './Overlay.css'
import { Label } from 'reactstrap';
interface IProps {
    show: Boolean
    children: any
}
const OverlayComponent: FC<IProps> = ({ show, children }) => {

    return (
        <div className="mb-3" style={{ position: 'relative' }}>
            {show && (
                <div className="overlay">
                    <div className="spinnerContainer">
                        <div className='d-flex align-items-center gap-3'>
                            <Label className='fw-cursiva' style={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: '900', color: '#f06100' }}>Cargando</Label>
                            <div className="spinner"></div>
                        </div>
                    </div>
                </div>
            )}
            <>
                {children}
            </>

        </div>
    );
};


export default OverlayComponent;
