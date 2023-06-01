import styles from './Stopper.module.scss';

import Button from '../Button/Button';

import { useState } from 'react';

const Stopper = () => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState();

  const parseTime = time => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

    if (time > 3600000) {
      hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      time -= 3600000 * Math.floor((time / (1000 * 60 * 60)) % 24);
    }

    if (time > 60000) {
      minutes = Math.floor((time / (1000 * 60)) % 60);
      time -= 60000 * minutes;
    }

    if (time > 1000) {
      seconds = Math.floor((time / 1000) % 60);
      time -= 1000 * seconds;
    }

    if (time < 10) {
      milliseconds = '00' + time;
    } else if (time < 100) {
      milliseconds = '0' + time;
    } else {
      milliseconds = time;
    }

    return `
      ${hours < 10 ? '0' + hours : hours}
      :
      ${minutes < 10 ? '0' + minutes : minutes}
      :
      ${seconds < 10 ? '0' + seconds : seconds}.${milliseconds}
    `;
  };

  const handles = {
    start: () => {
      setTimer(setInterval(() => {
        setTime(prevValue => prevValue + 1);
      }, 1));
    },

    stop: () => {
      if (timer) {
        clearInterval(timer);
      }
    },

    reset: () => {
      if (time !== 0) {
        setTime(0);
      }

      if (timer) {
        clearInterval(timer);
      }
    }
  };

  return (
    <form className={styles.form}>
      <p className={styles.time}>{parseTime(time)}</p>
      <Button action={handles.start}>Start</Button>
      <Button action={handles.stop}>Stop</Button>
      <Button action={handles.reset}>Reset</Button>
    </form>
  )
};

export default Stopper;
