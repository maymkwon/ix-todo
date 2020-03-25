import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  InputBase,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import debounce from 'lodash/debounce';
import { ISearchParams } from '../store/todo/types';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface ISearchInput {
  handleSearch: (option: any) => void;
  params: ISearchParams;
}

const radioOption = [
  { title: '전체', value: '' },
  { title: '완료', value: '1' },
  { title: '미완료', value: '0' },
];
const initParams = {
  keyword: '',
  done: undefined,
};
export default function SearchInput(props: ISearchInput) {
  const classes = useStyles();
  const [searchOption, setSearchOption] = useState<ISearchParams>(initParams);

  useEffect(() => {
    setSearchOption(props.params);
  }, [props.params]);

  const delayedQuery = useRef(debounce((q: any) => props.handleSearch(q), 500))
    .current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newOptions = {
      ...searchOption,
      [name]: value,
    };
    setParams(newOptions);
  };

  const setParams = (newOptions: ISearchParams) => {
    setSearchOption(newOptions);
    delayedQuery(newOptions);
  };

  // 액션을 만들까..
  const handleInit = () => {
    setParams(initParams);
  };

  if (!searchOption) {
    return null;
  }
  return (
    <div>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          name="keyword"
          value={searchOption!.keyword}
          placeholder="Search TODO"
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Search TODO' }}
        />
        {searchOption!.keyword && searchOption!.keyword.length !== 0 && (
          <IconButton onClick={handleInit}>
            <Clear />
          </IconButton>
        )}
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div>
        <RadioGroup
          row
          aria-label="position"
          name="done"
          value={searchOption.done ? searchOption.done : ''}
          onChange={handleChange}>
          {radioOption.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio color="primary" />}
                label={option.title}
                labelPlacement="start"
              />
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
