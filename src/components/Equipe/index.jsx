import styles from './Equipe.module.css';

function Equipes(props) {
  const integrantes = props.integrantes;
  const list = integrantes.map(item =>
    <li key={item}>{item}</li>
  );

  return (
    <div className={styles.equipeContainer}>
      <h2>{props.titulo}</h2>
      <ul>
        {integrantes.map((item, idx) => (
          <li key={`${item}-${idx}`}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Equipes