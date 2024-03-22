import { selectCountryOptions } from '@/utils';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import './App.css';
import reactLogo from './assets/react.svg';
import { Item } from './components';
import viteLogo from '/vite.svg';


interface FormValues {
  [key: string]: string;
}

const App: React.FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>();
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    selectCountryOptions.forEach(option => {
      setValue(option.value, checked ? option.value : '');
    });
  };

  const handleIndividualChange = (value: string, checked: boolean) => {
    setValue(value, checked ? value : '');
    const allChecked = selectCountryOptions.every(option => watch(option.value) !== '');
    setSelectAll(allChecked);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const selectedValues = Object.values(data).filter(value => value !== '');
    if (selectedValues.length) alert(`Submitted countries: ${selectedValues}`);
  };

  return (
    <div style={{ width: '100%' }}>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Vite + React + Ricardo Ferrari</h1>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-center',
          flexDirection: 'column',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ flexDirection: 'column', alignItems: 'flex-center' }}
        >
          <Item>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <label>Seleccionar todo</label>
          </Item>

          {selectCountryOptions.map((option, index) => (
            <Item key={index}>
              <Controller
                name={option.value}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={selectAll || field.value === option.value}
                    onChange={(e) => {
                      handleIndividualChange(option.value, e.target.checked);
                    }}
                  />
                )}
              />
              <label>{option.label}</label>
            </Item>
          ))}

          <Button type="submit" variant={"contained"} sx={{ mt: 3, mb: 2 }}>
            Enviar
          </Button>
        </Box>
      </Box>
    </div >
  );
};

export default App;