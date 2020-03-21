import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import RelationList from './RelationList';
import { SETTING_ITEM_HEIGHT } from '../common/Const';
import useTodoActions from '../common/hooks/useTodoActions';
import useTodoData from '../common/hooks/useTodoData';
import { renderText, renderDate } from '../common/utils';
import cn from 'classnames';
import Empty from './EmptyList';
import EditTodoPopup from './EditTodoPopup';
import { TodoItem } from '../store/todo/types';
import TodoListItem from './TodoListItem';
import {
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
    },
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    done: {
      textDecoration: 'line-through',
      opacity: '0.4',
    },
  })
);

type AnchorEl = {
  el: HTMLElement;
  todoInfo: TodoItem;
};

export default function TodoList() {
  const classes = useStyles();
  const { getList } = useTodoActions();
  const todoData = useTodoData();
  const [editInfo, setEditOpen] = useState<null | TodoItem>(null);
  // const [checked, setChecked] = useState([0]);

  // const [anchorEl, setAnchorEl] = useState<null | AnchorEl>(null);

  // const handleCloseSetting = () => {
  //   setAnchorEl(null);
  // };

  // const handleClosePopup = () => {
  //   setEditOpen(null);
  // };

  const handleOpenEditPopup = (todoInfo: TodoItem) => {
    setEditOpen(todoInfo);
  };
  const handleCloseEditPopup = () => {
    setEditOpen(null);
  };

  useEffect(() => {
    getList({ pageNo: 1, pageSize: 5 });
    return () => {};
  }, []);

  if (todoData.contents.length === 0) {
    return <Empty />;
  }
  return (
    <div className={classes.wrap}>
      <List className={classes.root} style={{ margin: '30px 0' }}>
        {todoData.contents.map(todo => {
          return (
            <TodoListItem
              key={todo.id}
              data={todo}
              relTodos={todoData.relTodos[todo.id]}
              onClickEditOpenPopup={handleOpenEditPopup}
            />
          );
        })}
      </List>
      <EditTodoPopup
        open={editInfo !== null}
        handleClose={handleCloseEditPopup}
        data={editInfo}
      />
      <div style={{ position: 'absolute', bottom: 0 }}>aaa</div>
    </div>
  );
}
