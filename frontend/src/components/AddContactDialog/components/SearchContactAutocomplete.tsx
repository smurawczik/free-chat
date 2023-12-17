import LocationOnIcon from "@mui/icons-material/LocationOn";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import { useEffect, useMemo, useState } from "react";
import { UserResponse } from "../../../api/types";

export const SearchContactAutocomplete = () => {
  const [value, setValue] = useState<UserResponse | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly UserResponse[]>([]);

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly UserResponse[]) => void
        ) => {
          // fetch data here
          console.log("fetching data", request, callback);
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly UserResponse[]) => {
      if (active) {
        let newOptions: readonly UserResponse[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="search-contact-autocomplete"
      // sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.email
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No users"
      onChange={(_: unknown, newValue: UserResponse | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for users"
          size="small"
          variant="filled"
          fullWidth
          sx={{
            "& .MuiFilledInput-root.MuiInputBase-root": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              paddingTop: 0.5,
              paddingBottom: 0.5,
              borderRadius: 1,
            },
            "& .MuiFilledInput-root:focus, & .MuiFilledInput-root:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderBottom: "none",
            },
            "& .MuiFilledInput-input": {
              color: "white",
            },
            "& .MuiInputBase-root-MuiFilledInput-root:hover:before, & .MuiFilledInput-underline:before":
              {
                borderBottom: "none !important",
              },
            "& .MuiFilledInput-underline:after": {
              borderBottom: "none",
            },
            "& .MuiFilledInput-underline:hover:before": {
              borderBottom: "none",
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                <Box component="span">
                  {option.firstName} {option.lastName}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {option.email}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
