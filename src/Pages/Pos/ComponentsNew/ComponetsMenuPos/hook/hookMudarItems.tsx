import { useEffect, useState } from 'react';
import { BuscarMesa } from '../../../Helpers/ApiMesas';

// Custom hook para el caso 0
const useCase0Logic = (activeInputIndex: any, inputValues: any, inputRefs: any, setInputDisabledcuenta: any, dispatch: any, setNewCart: any, setInputValues: any) => {
    useEffect(() => {
        if (activeInputIndex === 0) {
            BuscarMesa(inputValues[0]).then((res: any) => {
                if (/^[a-zA-Z0-9]*$/.test(inputValues[0]) === false || inputValues[0].length === 0) {
                    inputRefs.current[0].current?.focus();
                    setInputValues((prevInputValues: any) => {
                        const newInputValues = [...prevInputValues];
                        newInputValues[1] = '';
                        return newInputValues;
                    });
                    return;
                }

                if (res.status) {
                    setInputDisabledcuenta(true);
                    dispatch(setNewCart(res.product));
                    setTimeout(() => {
                        inputRefs.current[1].current?.focus();
                        inputRefs.current[1].current?.select();
                    }, 100);
                    return;
                } else {
                    dispatch(setNewCart([]));
                }
            });
        }
    }, [activeInputIndex, inputValues, inputRefs, setInputDisabledcuenta, dispatch, setNewCart, BuscarMesa]);
}
export const useCase1Logic = (activeInputIndex: any, inputValues: any, inputRefs: any, setInputValues: any, ClearInputKeyBoard: any) => {
    const res: any = BuscarMesa(inputValues)
    if (res.message === "Mesa no encontrada") {
        ClearInputKeyBoard(inputValues)
        /*     setTimeout(() => {
                inputRefs.current[1].current?.focus();
            }, 100) */
    }
    return  ClearInputKeyBoard(inputValues)

}
// Custom hook para el caso 1
/* const useCase1Logic = (activeInputIndex: any, inputValues: any, inputRefs: any, setProductLeft: any, setShowConfirMudarItem: any, setInputValues: any) => {
    useEffect(() => {
        if (activeInputIndex === 1) {
            if (/^[a-zA-Z0-9]*$/.test(inputValues[1]) === false || inputValues[1].length === 0) {
                inputRefs.current[1].current?.focus();
                setInputValues((prevInputValues: any) => {
                    const newInputValues = [...prevInputValues];
                    newInputValues[1] = '';
                    return newInputValues;
                });
                return;
            }

            BuscarMesa(inputValues[1]).then((res: any) => {
                if (res.status) {
                    setProductLeft(res.product);
                    return;
                }
                if (res.message === "Cuenta sin items") {
                    setShowConfirMudarItem(true);
                    inputRefs.current[1].current?.focus();
                    return;
                }
                if (res.message === 'Mesa no encontrada') {
                    inputRefs.current[1].current?.focus();
                    setInputValues((prevInputValues: any) => {
                        const newInputValues = [...prevInputValues];
                        newInputValues[1] = '';
                        return newInputValues;
                    });
                }
            });
        }
    }, [activeInputIndex, inputValues, inputRefs, setProductLeft, setShowConfirMudarItem, setInputValues, BuscarMesa]);
}
 */
// Custom hook para el caso 2
const useCase2Logic = (activeInputIndex: any, inputRefs: any) => {
    useEffect(() => {
        if (activeInputIndex === 2) {
            setTimeout(() => {
                inputRefs.current[3].current?.focus();
                inputRefs.current[3].current?.select();
            }, 100);
        }
    }, [activeInputIndex, inputRefs]);
}

// Custom hook para el caso 3
const useCase3Logic = (activeInputIndex: any, inputRefs: any) => {
    useEffect(() => {
        if (activeInputIndex === 3) {
            inputRefs.current[3].current?.focus();
        }
    }, [activeInputIndex, inputRefs]);
}
export { useCase0Logic, useCase2Logic, useCase3Logic }