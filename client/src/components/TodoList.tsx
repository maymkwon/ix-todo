import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useTodoActions from '../common/hooks/useTodoActions';
import useAllTodoData from '../common/hooks/useAllTodoData';
import Empty from './EmptyList';
import EditTodoPopup from './EditTodoPopup';
import { TodoItem } from '../store/todo/types';
import TodoListItem from './TodoListItem';
import { List } from '@material-ui/core';
import Pagination from './Pagination';
import SearchInput from './SearchInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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

export default function TodoList() {
  const classes = useStyles();
  const { getAllList, setSearchParams } = useTodoActions();
  const { contents, params, relTodos } = useAllTodoData();
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
    getAllList(params);
  }, [getAllList]);

  return (
    <>
      <div className={classes.wrap}>
        <SearchInput handleSearch={setSearchParams} params={params} />
        {contents.length === 0 ? (
          <Empty />
        ) : (
          <React.Fragment>
            <List className={classes.list}>
              {listData.map(todo => {
                return (
                  <TodoListItem
                    key={todo.id}
                    data={todo}
                    relTodos={relTodos[todo.id]}
                    onClickEditOpenPopup={handleOpenEditPopup}
                  />
                );
              })}
            </List>
            <div style={{ position: 'absolute', bottom: 0 }}>
              <Pagination items={contents} onChangePage={handlePageChange} />
            </div>
          </React.Fragment>
        )}

        <EditTodoPopup
          open={editInfo !== null}
          handleClose={handleCloseEditPopup}
          data={editInfo}
        />
      </div>
    </>
  );
}
