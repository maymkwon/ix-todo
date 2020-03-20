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

interface Props {
  id: string;
  placeHolder: string;
  disabled?: boolean;
  error?: boolean;
  helpText?: string;
}

export default function CInput(props: Props) {
  const [name, setName] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <FormControl disabled={false} error={false}>
      <CustomInput
        id={props.id}
        value={name}
        placeholder={props.placeHolder}
        onChange={handleChange}
        aria-describedby={`${props.id}-helper-text`}
      />
      <FormHelperText id={`${props.id}-helper-text`}>
        {props.helpText}
      </FormHelperText>
    </FormControl>
  );
}
