import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

const CustomInput = withStyles({
  root: {
    fontSize: '250%',
  },
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
  value: string | null;
  onChange: (data: string) => void;
  disabled?: boolean;
  error?: boolean;
  helpText?: string;
}

export default function CInput(props: ICInput) {
  const [valueState, setValueState] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueState(value);
    props.onChange(value);
  };

  return (
    <FormControl disabled={false} error={false}>
      <CustomInput
        id={props.id}
        defaultValue={props.value}
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
