import React from 'react';
import {
  createStyles,
  Theme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const CustomInput = withStyles({
  root: {
    color: '#fff',
    fontSize: '250%',
  },
  input: { textAlign: 'center' },
  underline: {
    '&:hover:not(.Mui-disabled):before': { borderBottom: '1px solid #fff' },
    '&:before': {
      borderBottom: '1px solid #fff',
    },
    '&:after': {
      borderBottom: '3px solid #ffe812',
    },
  },
})(Input);

interface ICInput {
  id: string;
  placeHolder: string;
  disabled?: boolean;
  error?: boolean;
  helpText?: string;
  onSubmit: (title: string) => void;
}

export default function CInput(props: ICInput) {
  const [title, setTitle] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Do code here
      e.preventDefault();
      props.onSubmit(title);
    }
  };

  return (
    <FormControl disabled={false} error={false}>
      <CustomInput
        id={props.id}
        value={title}
        placeholder={props.placeHolder}
        onChange={handleChange}
        aria-describedby={`${props.id}-helper-text`}
        onKeyPress={handleKeyPress}
      />
      <FormHelperText id={`${props.id}-helper-text`}>
        {props.helpText}
      </FormHelperText>
    </FormControl>
  );
}
