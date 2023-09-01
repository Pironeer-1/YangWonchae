import React, { useState } from 'react';

function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);

    const increaseCounter = () => setCount((count) => count + 1);
    const decreaseCounter = () => setCount((count) => Math.max(count - 1, 0));

    return [count, increaseCounter, decreaseCounter];
}

export default useCounter;