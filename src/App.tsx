import { selectCountryOptions } from '@/utils';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';


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
    if (selectedValues.length) alert(`Selected countries: ${selectedValues}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="checkbox"
        checked={selectAll}
        onChange={(e) => handleSelectAll(e.target.checked)}
      />
      <label>Seleccionar todo</label>

      {selectCountryOptions.map((option, index) => (
        <div key={index}>
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
        </div>
      ))}

      <button type="submit" >Enviar</button>
    </form>
  );
};

export default App;