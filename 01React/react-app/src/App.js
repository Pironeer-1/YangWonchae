import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  return <header>
    <h1><a href='/' onClick={function(event) {
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis =  [];
  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
    <li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event => {
        event.preventDefault();
        // props.onChangeMode(event.target.id);
        props.onChangeMode(t.id);
      }}>{t.title}</a>
    </li>
    );
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    {id: 1, title: 'html', body: 'html is...'},
    {id: 2, title: 'css', body: 'css is...'},
    {id: 3, title: 'javascript', body: 'javascript is...'},
  ]
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') {
    for(let i = 0; i < topics.length; i++) {
      if(topics[i].id === id) {
        const title = topics[i].title;
        const body = topics[i].body;
        content = <Article title={title} body={body}></Article>
      }
    }
  }
  return (
    <div>
      <Header title="REACT" onChangeMode={function() {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
