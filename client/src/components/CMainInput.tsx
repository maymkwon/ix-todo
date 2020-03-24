import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { TypeTodoCreate } from '../store/todo/types';

// 메인에서 쓰는 인풋을 따로 만듬

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

interface CMainInput {
  id: string;
  placeHolder: string;
  disabled?: boolean;
  error?: boolean;
  onSubmit: (data: TypeTodoCreate) => void;
}

export default function CMainInput(props: CMainInput) {
  const [title, setTitle] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.onSubmit({ title, callback: () => setTitle('') });
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
    </FormControl>
  );
}
