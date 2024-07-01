import React from 'react';
import { Spinner } from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loader = (props: any) => {
    return (
        <React.Fragment>
            <div className="d-flex justify-content-center align-items-center mx-2 py-2 mt-2">
                <span className={props.classText}>{props.text || 'Cargando'}</span>
                <Spinner color="primary"> Loading... </Spinner>
            </div>
            {toast.error(props.error, { position: "top-right", hideProgressBar: false, progress: undefined, toastId: "" })}
        </React.Fragment>
    );
};

export default Loader;
