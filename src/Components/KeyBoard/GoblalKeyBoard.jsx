
import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";



const GoblalKeyBoard = ({ showKeyBoard }) => {
    const [inputs, setInputs] = useState({});
    const [layoutName, setLayoutName] = useState("default");
    const [inputName, setInputName] = useState("default");
    const keyboard = useRef();

    const onChangeAll = inputs => {

        setInputs({ ...inputs });
        console.log("Inputs changed", inputs);
    };

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
    };

    const onKeyPress = button => {
        console.log("Button pressed", button);
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    const onChangeInput = event => {
        const inputVal = event.target.value;

        setInputs({
            ...inputs,
            [inputName]: inputVal
        });

        keyboard.current.setInput(inputVal);
    };

    const getInputValue = inputName => {
        return inputs[inputName] || "";
    };

    return (
        <>
            {showKeyBoard && <div className="App">
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    inputName={inputName}
                    layoutName={layoutName}
                    onChangeAll={onChangeAll}
                    onKeyPress={onKeyPress}
                />
            </div>}
        </>
    );
}
export default GoblalKeyBoard;
