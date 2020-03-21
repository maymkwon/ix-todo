import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import CInput from './CInput';

const useStyles = makeStyles({
  clock: {
    fontWeight: 600,
  },
});

function TodoMain() {
  const classes = useStyles();
  const [time, setTime] = useState({ h: '00', m: '00' });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setTime({
        h: hours < 10 ? `0${hours}` : hours.toString(),
        m: minutes < 10 ? `0${minutes}` : minutes.toString(),
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <Typography
        className={cn(classes.clock)}
        variant="h1"
        component="h2"
        align="center">
        {`${time.h}:${time.m}`}
      </Typography>
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        안녕하세요 방문자님!
      </Typography>
      <CInput id="todo-text" placeHolder="뭐 하지?" />
    </React.Fragment>
  );
}

export default TodoMain;
