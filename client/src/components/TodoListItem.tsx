import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import RelationList from './RelationList';
import { SETTING_ITEM_HEIGHT } from '../common/Const';
import useTodoActions from '../common/hooks/useTodoActions';
import { renderText, renderDate } from '../common/utils';
import cn from 'classnames';
import { TodoItem, TypeTodoItem, TypeTodoEdit } from '../store/todo/types';
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    done: {
      textDecoration: 'line-through',
      opacity: '0.4',
    },
    relChild: {
      backgroundColor: 'green',
      color: '#fff',
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
  const { requestEditTodo, requestDeleteTodo } = useTodoActions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const settingOpen = Boolean(anchorEl);

  const handleClickSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorEl(null);
  };

  const handleEditState = (todoInfo: TypeTodoEdit) => () => {
    let allDone = true;
    if (props.relTodos && props.relTodos.length !== 0) {
      allDone = props.relTodos.every(o => o.done);
    }

    if (allDone) {
      const newTodoInfo = { ...todoInfo };
      newTodoInfo.done = !newTodoInfo.done;
      requestEditTodo(newTodoInfo);
    }
  };
  const handleDeleteTodo = (id: number) => {
    requestDeleteTodo({ id });
  };

  const handleOpenEdit = (todoInfo: TodoItem) => {
    props.onClickEditOpenPopup(todoInfo);
    handleCloseSetting();
  };

  const { id, title, done, createdAt, updatedAt } = props.data;
  const labelId = `todoCheck-list-label-${id}`;
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
              {props.data.relId && <Chip label="child todo" />}
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
          <Typography variant="inherit">수정</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteTodo(id)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">삭제</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
