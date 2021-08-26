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
  {code: "US", label: "United States"},
  {code: "AL", label:"Alabama"},
  {code: "AK", label:"Alaska"},
  {code: "AS", label: "American Samoa"},
  {code: "AZ", label:"Arizona"},
  {code: "AR", label:"Arkansas"},
  {code: "CA", label:"California"},
  {code: "CO", label:"Colorado"},
  {code: "CT", label:"Connecticut"},
  {code: "DE", label:"Delaware"},
  {code: "DC", label:"District Of Columbia"},
  {code: "FM", label:"Federated States Of Micronesia"},
  {code: "FL", label: "Florida"},
  {code: "GA", label:"Georgia"},
  {code: "GU", label:"Guam"},
  {code: "HI", label: "Hawaii"},
  {code: "ID", label:"Idaho"},
  {code: "IL", label:"Illinois"},
  {code: "IN", label:"Indiana"},
  {code: "IA", label:"Iowa"},
  {code: "KS", label:"Kansas"},
  {code: "KY", label:"Kentucky"},
  {code: "LA", label:"Louisiana"},
  {code: "ME", label:"Maine"},
  {code: "MH", label:"Marshall Islands"},
  {code: "MD", label:"Maryland"},
  {code: "MA", label:"Massachusetts"},
  {code: "MI", label:"Michigan"},
  {code: "MN", label:"Minnesota"},
  {code: "MS", label:"Mississippi"},
  {code: "MO", label:"Missouri"},
  {code: "MT", label:"Montana"},
  {code: "NE", label:"Nebraska"},
  {code: "NV", label:"Nevada"},
  {code: "NH", label:"New Hampshire"},
  {code: "NJ", label:"New Jersey"},
  {code: "NM", label:"New Mexico"},
  {code: "NY", label:"New York"},
  {code: "NC", label:"North Carolina"},
  {code: "ND", label:"North Dakota"},
  {code: "MP", label:"Northern Mariana Islands"},
  {code: "OH", label:"Ohio"},
  {code: "OK", label:"Oklahoma"},
  {code: "OR", label:"Oregon"},
  {code: "PW", label:"Palau"},
  {code: "PA", label:"Pennsylvania"},
  {code: "PR", label:"Puerto Rico"},
  {code: "RI", label:"Rhode Island"},
  {code: "SC", label:"South Carolina"},
  {code: "SD", label:"South Dakota"},
  {code: "TN", label:"Tennessee"},
  {code: "TX", label:"Texas"},
  {code: "UT", label:"Utah"},
  {code: "VT", label:"Vermont"},
  {code: "VI", label:"Virgin Islands"},
  {code: "VA", label:"Virginia"},
  {code: "WA", label:"Washington"},
  {code: "WV", label:"West Virginia"},
  {code: "WI", label:"Wisconsin"},
  {code: "WY", label:"Wyoming"}
];
