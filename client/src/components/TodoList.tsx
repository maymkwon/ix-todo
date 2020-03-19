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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(100% - 140px)',
        overflow: 'auto',
      }}>
      <Paper elevation={3}>
        <List className={classes.root} style={{ marginBottom: 30 }}>
          {[0, 1, 2, 3].map(value => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
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
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
