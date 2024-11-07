import { Check, Close } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { isNumber } from "lodash";
import { useCallback, useState } from "react";

type EditableFieldProps =
  | {
      defaultValue: string;
      onUpdate: (newValue: string) => void;
      isNumber?: false;
    }
  | {
      defaultValue: number;
      onUpdate: (newValue: number) => void;
      isNumber: true;
    };

export const EditableField: React.FC<EditableFieldProps> = ({
  defaultValue,
  onUpdate,
  isNumber: isNumberValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    []
  );

  const handleToggleEditMode: React.MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      setIsEditMode(true);
    }, [setIsEditMode]);

  const handleClickUpdate = useCallback(() => {
    if (isNumberValue) {
      onUpdate(isNumber(value) ? value : Number.parseInt(value));
    } else {
      onUpdate(value as string);
    }
    setIsEditMode(false);
  }, [isNumberValue, onUpdate, value, setIsEditMode]);

  const handleClickDiscard = useCallback(() => {
    setValue(defaultValue);
    setIsEditMode(false);
  }, [defaultValue, setValue, setIsEditMode]);

  return (
    <>
      {isEditMode ? (
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            type={isNumberValue ? "number" : "text"}
            value={value}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickUpdate}
                  color="success"
                  edge="end"
                >
                  <Check />
                </IconButton>
                <IconButton
                  onClick={handleClickDiscard}
                  color="error"
                  edge="end"
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : (
        <div onDoubleClick={handleToggleEditMode}>
          <Typography>{defaultValue}</Typography>
        </div>
      )}
    </>
  );
};
