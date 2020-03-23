import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PAGE_SIZE } from '../common/Const';
import useTodoActions from '../common/hooks/useTodoActions';
import useAllTodoData from '../common/hooks/useAllTodoData';
import Empty from './EmptyList';
import EditTodoPopup from './EditTodoPopup';
import { TodoItem, TypeTodoItem } from '../store/todo/types';
import TodoListItem from './TodoListItem';
import { List } from '@material-ui/core';
import Pagination from './Pagination';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
    },
    list: {
      width: '100%',
      maxWidth: 500,
      margin: '30px 0px 40px',
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
  const { getAllList } = useTodoActions();
  const todoAllData = useAllTodoData();
  const [listData, setListdata] = useState<TodoItem[]>([]);
  const [editInfo, setEditOpen] = useState<null | TodoItem>(null);

  const handleOpenEditPopup = (todoInfo: TodoItem) => {
    setEditOpen(todoInfo);
  };

  const handleCloseEditPopup = () => {
    setEditOpen(null);
  };

  const handlePageChange = (listData: TodoItem[]) => {
    setListdata(listData);
  };

  useEffect(() => {
    getAllList();
  }, []);

  if (todoAllData.contents.length === 0) {
    return <Empty />;
  }
  return (
    <div className={classes.wrap}>
      <List className={classes.list}>
        {listData.map(todo => {
          return (
            <TodoListItem
              key={todo.id}
              data={todo}
              relTodos={todoAllData.relTodos[todo.id]}
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
      <div style={{ position: 'absolute', bottom: 0 }}>
        <Pagination
          items={todoAllData.contents}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
}
