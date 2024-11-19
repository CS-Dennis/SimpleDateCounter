import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { exportHeaders, localStorageKeys } from '../Utils/Constants';
import { getDateMoment } from '../Utils/Utils';
import moment from 'moment';
import { useRef, useState } from 'react';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';

export default function ExportButton() {
  const exportMyDates = () => {
    const exportData = exportHeaders.join(',') + '\n';

    const myDates = JSON.parse(
      localStorage.getItem(localStorageKeys.myDates) || `{}`
    );
    const dateKeys = Object.keys(myDates);
    const data = dateKeys.map((key) => {
      return (
        myDates[key].dateTitle +
        ',' +
        myDates[key].date +
        ',' +
        myDates[key].created +
        ',' +
        myDates[key].modified +
        '\n'
      );
    });

    const finalData = exportData + data.join('');

    if (dateKeys.length > 0) {
      const blob = new Blob([finalData], { type: 'text/csv' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      link.download = `Export_MyDates_${getDateMoment(moment()).format(
        'MM-DD-YYYY'
      )}.csv`;

      document.body.appendChild(link);
      link.click();
      //   console.log(finalData);
    } else {
      console.log("You don't have any dates saved yet.");
    }
  };

  const importMyDates = () => {
    console.log('import dates start');
  };

  const anchorRef = useRef<HTMLDivElement>(null);
  const options = ['Export Dates', 'Import Dates'];
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const selectedOptionClicked = () => {
    console.log(selectedOption);

    if (selectedOption === options[0]) {
      exportMyDates();
    } else if (selectedOption === options[1]) {
      importMyDates();
    }
  };

  const dropdownOptionClicked = (index: number) => {
    setSelectedOption(options[index]);
    console.log(options[index]);

    if (index === 0) {
      exportMyDates();
    } else if (index === 1) {
      importMyDates();
    }
  };

  return (
    <>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='Button group with a nested menu'
      >
        <Button onClick={() => selectedOptionClicked()}>
          {selectedOption}
        </Button>
        <Button
          size='small'
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1, width: '188px' }}
        open={showDropdown}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={() => {
                        setShowDropdown(false);
                        dropdownOptionClicked(index);
                      }}
                      disabled={index === 1 ? true : false}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
