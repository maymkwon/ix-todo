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
    done: {
      textDecoration: 'line-through',
      opacity: '0.4',
    },
  })
);

interface ITodoListItem {
  data: TodoItem;
  relTodos: TodoItem[];
  onClickEditOpenPopup: (data: TodoItem) => void;
}

export default function TodoListItem(props: ITodoListItem) {
  const classes = useStyles();
  const { getList, requestEditTodo, requestDeleteTodo } = useTodoActions();
  // const [editOpen, setEditOpen] = useState<null | TodoItem>(null);
  // const [checked, setChecked] = useState([0]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const settingOpen = Boolean(anchorEl);

  const handleClickSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorEl(null);
  };

  const handleEditState = (todoInfo: TodoItem) => () => {
    // props.relTodos;
    let allDone = true;
    if (props.relTodos && props.relTodos.length !== 0) {
      allDone = props.relTodos.every(o => o.done);
    }

    const parentTodos = [];
    if (allDone) {
      const newTodoInfo = { ...todoInfo };
      newTodoInfo.done = !newTodoInfo.done;
      requestEditTodo(newTodoInfo);
    }
  };
  const handleDeleteTodo = (id: number) => {
    // const newTodoInfo = { ...todoInfo };
    // newTodoInfo.done = !newTodoInfo.done;
    requestDeleteTodo({ id });
  };

  const handleOpenEdit = (todoInfo: TodoItem) => {
    props.onClickEditOpenPopup(todoInfo);
    handleCloseSetting();
  };

  // const handleClickOpenEditPopup = () => {
  //   if (anchorEl) {
  //     setEditOpen(anchorEl);
  //     handleCloseSetting();
  //   }
  // };

  // const handleClosePopup = () => {
  //   setEditOpen(null);
  // };

  // useEffect(() => {
  //   getList({ pageNo: 1, pageSize: 5 });
  //   return () => {};
  // }, []);

  const { id, title, done, createdAt, updatedAt } = props.data;
  const labelId = `todoCheck-list-label-${id}`;
  //  const allDone = props.relTodos.every(o => o.done);
  return (
    <React.Fragment>
      <ListItem
        role={undefined}
        dense
        button
        divider
        onClick={handleEditState(props.data)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={done}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={
            <Typography
              display="block"
              className={cn({ [classes.done]: done })}
              component="span"
              variant="h4">
              {renderText(title)}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography component="span" gutterBottom color="textSecondary">
                <Typography display="block" component="span" variant="body2">
                  등록일 : {renderDate(createdAt)}
                </Typography>
                <Typography display="block" component="span" variant="body2">
                  수정일 : {renderDate(updatedAt)}
                </Typography>
              </Typography>
              <span>
                <RelationList relTodos={props.relTodos} />
              </span>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="more"
            aria-controls="todo-setting"
            aria-haspopup="true"
            disabled={done}
            onClick={e => handleClickSetting(e)}>
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu
        id="todo-setting"
        anchorEl={anchorEl}
        open={settingOpen}
        onClose={handleCloseSetting}
        PaperProps={{
          style: {
            maxHeight: SETTING_ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}>
        <MenuItem onClick={() => handleOpenEdit(props.data)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteTodo(id)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
