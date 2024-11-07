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
import classes from "./EditableField.module.css";

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

  const handleEditKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (event.key === "Enter") {
          handleClickUpdate();
        }
      },
      [handleClickUpdate]
    );

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
            onKeyDown={handleEditKeyDown}
            autoFocus
            onBlur={handleClickDiscard}
            className={classes.editTextField}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClickUpdate}
                  color="success"
                  edge="end"
                >
                  <Check />
                </IconButton>
                <IconButton
                  onMouseDown={(e) => e.preventDefault()}
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
        <div
          className={classes.staticTextField}
          onDoubleClick={handleToggleEditMode}
        >
          <Typography>{defaultValue}</Typography>
        </div>
      )}
    </>
  );
};
