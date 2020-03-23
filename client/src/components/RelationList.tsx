import React from 'react';
import { Chip } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { TodoItem } from '../store/todo/types';
import cn from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
    },
    done: {
      textDecoration: 'line-through',
      opacity: '0.4',
    },
  })
);

interface IRelationList {
  relTodos: TodoItem[];
}
export default function RelationList(props: IRelationList) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {props.relTodos &&
        props.relTodos.map(relTodo => {
          return (
            <Chip
              key={relTodo.id}
              className={cn(classes.chip, { [classes.done]: relTodo.done })}
              label={relTodo.title}
              component="span"
            />
          );
        })}
    </React.Fragment>
  );
}
