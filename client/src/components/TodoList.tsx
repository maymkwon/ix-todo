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

const options = ['Edit', 'Delete'];

const ITEM_HEIGHT = 48;

// import CommentIcon from '@material-ui/icons/Comment';
const CustomChip = withStyles(theme => ({
  root: {
    margin: theme.spacing(0.5),
  },
}))(Chip);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

// display: flex;
//     justify-content: center;
//     margin-bottom: 30px;
//     /* position: absolute; */
//     overflow: auto;
//     /* bottom: 0; */
//     height: calc(100% - 140px);

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                        <Chip
                          className={classes.chip}
                          label="Basic"
                          component="span"
                        />
                      </span>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="more"
                    aria-controls="todo-setting"
                    aria-haspopup="true"
                    onClick={handleClick}>
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
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
