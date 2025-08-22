import { useState, useMemo, useRef } from 'react'
import './App.css'
import Equipes from './components/Equipe'

const TEAM_SIZE = 3;

function App() {
  const [integrantes, setIntegrantes] = useState([]);
  const [integrante, setIntegrante] = useState('');
  const inputRef = useRef(null);

  function chunk(list, size) {
    const out = [];
    for (let i = 0; i < list.length; i += size) {
      out.push(list.slice(i, i + size));
    }
    return out;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  const equipes = useMemo(() => {
    const base = shuffle(integrantes);
    //const base = integrantes;
    return chunk(base, TEAM_SIZE);
  }, [integrantes]);

  function AddPerson() {
    if (!integrante) {
      alert('vazio')
      return;
    }
    setIntegrantes([...integrantes, integrante])
    setIntegrante('');
    inputRef.current.focus();
  }

  function handleKeyDown(e) {
    if (event.key == 'Enter') {
      setIntegrantes([...integrantes, integrante])
      setIntegrante('');
      inputRef.current.focus();
    }
  }

  return (
    <>
      <h1>Embaralhador de Equipes</h1>
      <div className='btnContainer'>
        <input ref={inputRef} type="text" value={integrante} onChange={e => { setIntegrante(e.target.value) }} onKeyDown={handleKeyDown} />
        <button onClick={AddPerson}>Adicionar</button>
      </div>

      <div className='equipesContainer'>
        {equipes.map((grupo, idx) => (
          <Equipes key={idx} titulo={`Equipe ${idx + 1}`} integrantes={grupo} />
        ))}
      </div>
    </>
  )
}

export default App
