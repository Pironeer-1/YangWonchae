function MyButton(props) {
    const [isClicked, setIsClicked] = React.useState(false);

    // return React.createElement(
    //     'button',
    //     { onClick: () => setIsClicked(true) },
    //     isClicked ? 'Cliked!' : 'Click here!'
    // )
    return React.createElement(
        'button',
        { onClick: () => isClicked ? setIsClicked(false) : setIsClicked(true) },
        isClicked ? 'Cliked!' : 'Click here!'
    )
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(MyButton), domContainer);