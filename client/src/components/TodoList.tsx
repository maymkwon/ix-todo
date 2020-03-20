import React from 'react';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
  Chip,
  Menu,
  MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import RelationList from './RelationList';
import { SETTING_ITEM_HEIGHT } from '../common/Const';
// var groupBy = function(xs, key) {
//   return xs.reduce(function(rv, x) {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
// };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function TodoList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickSetting = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSetting = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
      }}>
      <div>
        <List className={classes.root} style={{ margin: '30px 0' }}>
          {[0, 1, 2, 3, 4, 5].map(value => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                divider
                onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={
                    <Typography display="block" component="span" variant="h4">
                      to Scott, Alex, Jennifer
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        gutterBottom
                        color="textSecondary">
                        <Typography
                          display="block"
                          component="span"
                          variant="body2">
                          등록일 : 2020-11-22 12:00:00
                        </Typography>
                        <Typography
                          display="block"
                          component="span"
                          variant="body2">
                          수정일 : 2020-11-22 12:00:00
                        </Typography>
                      </Typography>
                      <span>
                        <RelationList />
                      </span>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="more"
                    aria-controls="todo-setting"
                    aria-haspopup="true"
                    onClick={handleClickSetting}>
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Menu
          id="todo-setting"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseSetting}
          PaperProps={{
            style: {
              maxHeight: SETTING_ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}>
          <MenuItem onClick={handleCloseSetting}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseSetting}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Delete</Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
