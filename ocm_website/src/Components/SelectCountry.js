/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CountrySelect({handleChange, location}) {
  const classes = useStyles();

  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: "100%" }}
      options={countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      renderOption={(option) => (
        <React.Fragment>
          {option.label}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={<EditLocationIcon />}
          variant="outlined"
          placeholder="Country"
          value={location}
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
  );
}

const countries = [
  {label: "United States"},
  {label:"Alabama"},
  {label:"Alaska"},
  {label: "American Samoa"},
  {label:"Arizona"},
  {label:"Arkansas"},
  {label:"California"},
  {label:"Colorado"},
  {label:"Connecticut"},
  {label:"Delaware"},
  {label:"District Of Columbia"},
  {label:"Federated States Of Micronesia"},
  {label: "Florida"},
  {label:"Georgia"},
  {label:"Guam"},
  {label: "Hawaii"},
  {label:"Idaho"},
  {label:"Illinois"},
  {label:"Indiana"},
  {label:"Iowa"},
  {label:"Kansas"},
  {label:"Kentucky"},
  {label:"Louisiana"},
  {label:"Maine"},
  {label:"Marshall Islands"},
  {label:"Maryland"},
  {label:"Massachusetts"},
  {label:"Michigan"},
  {label:"Minnesota"},
  {label:"Mississippi"},
  {label:"Missouri"},
  {label:"Montana"},
  {label:"Nebraska"},
  {label:"Nevada"},
  {label:"New Hampshire"},
  {label:"New Jersey"},
  {label:"New Mexico"},
  {label:"New York"},
  {label:"North Carolina"},
  {label:"North Dakota"},
  {label:"Northern Mariana Islands"},
  {label:"Ohio"},
  {label:"Oklahoma"},
  {label:"Oregon"},
  {label:"Palau"},
  {label:"Pennsylvania"},
  {label:"Puerto Rico"},
  {label:"Rhode Island"},
  {label:"South Carolina"},
  {label:"South Dakota"},
  {label:"Tennessee"},
  {label:"Texas"},
  {label:"Utah"},
  {label:"Vermont"},
  {label:"Virgin Islands"},
  {label:"Virginia"},
  {label:"Washington"},
  {label:"West Virginia"},
  {label:"Wisconsin"},
  {label:"Wyoming"}
];
