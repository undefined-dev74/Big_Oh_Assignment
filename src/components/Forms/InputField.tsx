import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  control: any;
  label: string;
  type?: string;
  placeholder?: string;
};
export const FormInput = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
    />
  );
};
