import React, { useState, useEffect } from 'react';
import { TodoItem, TypeTodoEdit } from '../store/todo/types';
import useTodoActions from '../common/hooks/useTodoActions';
import useAllTodoData from '../common/hooks/useAllTodoData';
import CInput from './CInput';
import RelationList from './RelationList';
import {
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Switch,
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core';

interface IEditPopupProps {
  open: boolean;
  handleClose: () => void;
  data: TodoItem | null;
}

export default function EditTodoPopup({
  open,
  handleClose,
  data,
}: IEditPopupProps) {
  const [title, setTitle] = useState('');
  const [isDone, setDone] = useState(false);
  const [relTodo, setRelTodo] = useState(0);
  const { requestEditTodo } = useTodoActions();
  const allData = useAllTodoData();

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDone(e.target.checked);
  };

  const handleRelTodo = (e: React.ChangeEvent<{ value: unknown }>) => {
    setRelTodo(e.target.value as number);
  };

  const handleSubmit = () => {
    if (data) {
      const reqData: TypeTodoEdit = {
        id: data.id,
        title,
        done: isDone,
        callback: () => handleClose(),
      };
      if (relTodo) {
        reqData.relId = relTodo;
      }
      requestEditTodo(reqData);
    }
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDone(data.done);
    }
    return () => {
      setTitle('');
      setRelTodo(0);
    };
  }, [data]);

  const todoOptions =
    data &&
    allData &&
    allData.contents.filter(e => e.id !== data.id && data.relId === null);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth>
      <DialogTitle id="form-dialog-title">
        수정 {data && data.relId && <Chip label="child todo" />}
      </DialogTitle>
      <DialogContent>
        <CInput
          id="edit-todo-text"
          placeHolder="Email Address"
          value={title}
          onChange={(text: any) => setTitle(text)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isDone}
              onChange={handleStatusChange}
              name="checkedB"
              color="primary"
            />
          }
          label="완료 여부"
        />
        {data &&
        !allData.relTodos[data.id] &&
        todoOptions &&
        todoOptions.length ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={relTodo}
            onChange={handleRelTodo}>
            <MenuItem value={0}>부모 TODO 선택</MenuItem>;
            {todoOptions.map(todo => {
              return (
                <MenuItem key={todo.id} value={todo.id}>
                  {todo.title}
                </MenuItem>
              );
            })}
          </Select>
        ) : null}

        {data && <RelationList relTodos={allData.relTodos[data.id]} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSubmit} color="primary">
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
}
