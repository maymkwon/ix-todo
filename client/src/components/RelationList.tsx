import React from 'react';
import { Chip } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
// relTodos;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

export default function RelationList() {
  const classes = useStyles();
  return (
    <React.Fragment>
      {[1, 2].map(relTodo => {
        return (
          <Chip
            key={relTodo}
            className={classes.chip}
            label="Basic"
            component="span"
          />
        );
      })}
    </React.Fragment>
  );
}
