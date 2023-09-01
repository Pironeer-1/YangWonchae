import React from 'react';

const scaleNames = {
    c: '섭씨',
    f: '화씨',
};

function TemperatureInput(props) {
    const handleChange = (event) => {
        props.onTemperatureChange(event.target.value);
    };

    return (
        <fieldset>
            <legend>
                온도를 입력해 주세요(단위: {scaleNames[props.scale]}):
            </legend>
            <input type="text" value={props.temperature} onChange={handleChange} />
        </fieldset>
    );
}

export default TemperatureInput;