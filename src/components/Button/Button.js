import styles from './Button.module.scss';

const Button = props => {
  return (
    <button className={styles.button} onClick={props.action} type="button">{props.children}</button>
  );
}

export default Button;