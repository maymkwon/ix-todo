import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import TodoList from './components/TodoList';
import TodoMain from './components/TodoMain';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomCssBaseline from './common/CustomCssBaseline';
const useStyles = makeStyles({
  wrap: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ffe812',
    minWidth: 1280,
    '& > div': {
      flex: 1,
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  leftBox: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '0 50px',
  },
  rightBox: {
    position: 'relative',
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <CustomCssBaseline />
      <div className={classes.wrap}>
        <div className={cn(classes.section, classes.leftBox)}>
          <TodoMain />
        </div>
        <div className={cn(classes.section, classes.rightBox)}>
          {/* <Empty /> */}
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
