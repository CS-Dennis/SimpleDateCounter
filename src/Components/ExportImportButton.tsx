import { exportHeaders, localStorageKeys } from '../Utils/Constants';
import { getDateMoment } from '../Utils/Utils';
import moment from 'moment';
import { useContext, useRef, useState } from 'react';
import { MyDate } from '../Types/MyDate';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../App';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

export default function ExportImportButton() {
  const context = useContext(AppContext);

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

    data[data.length - 1] = data[data.length - 1].replace('\n', '');
    console.log(data);

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

  const importMyDates = (file: File | null, index: number | null) => {
    if (index !== null) {
      console.log('selected');

      dropdownOptionClicked(index);
    }

    console.log(file?.name);
    const reader = new FileReader();

    try {
      reader.readAsText(file!);
    } catch (error) {
      console.log(error);
    }

    reader.onload = (e) => {
      const list = e.target?.result?.toString().split('\n');
      console.log(list);

      const importedMyDates: MyDate[] = [];
      const localMyDates = JSON.parse(
        localStorage.getItem(localStorageKeys.myDates) || '{}'
      );

      for (let index = 0; index < (list?.length || 0); index++) {
        if (index > 0 && list?.[index].trim() !== '') {
          const subList = list?.[index].split(',');
          importedMyDates.push({
            dateTitle: subList?.[0] || '',
            date: moment(subList?.[1]),
            created: moment(subList?.[2]),
            modified: moment(subList?.[3]),
          });

          const newMyDate = {
            dateTitle: subList?.[0] || '',
            date: moment(subList?.[1]),
            created: moment(subList?.[2]),
            modified: moment(subList?.[3]),
          };

          const uuid = uuidv4();
          localMyDates[uuid] = newMyDate;
        }
      }

      localStorage.setItem(
        localStorageKeys.myDates,
        JSON.stringify(localMyDates)
      );

      context.setMyDatesUpdated(true);
    };
  };

  const anchorRef = useRef<HTMLDivElement>(null);
  const options = ['Export Dates', 'Import Dates'];
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const selectedOptionClicked = () => {
    console.log(selectedOption);
    if (selectedOption === options[0]) {
      exportMyDates();
    }
  };

  const dropdownOptionClicked = (index: number) => {
    setSelectedOption(options[index]);
    console.log(options[index]);

    if (index === 0) {
      exportMyDates();
    }
  };

  return (
    <>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='Button group with a nested menu'
      >
        <Button component='label' onClick={() => selectedOptionClicked()}>
          {selectedOption}
          {selectedOption === options[1] && (
            <input
              type='file'
              accept='.csv'
              multiple={false}
              style={{
                display: 'none',
              }}
              onChange={(e) => {
                importMyDates(e.target.files?.[0] || null, null);
              }}
            />
          )}
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
                    <Box key={index}>
                      {index === 0 && (
                        <MenuItem
                          key={option}
                          onClick={() => {
                            setShowDropdown(false);
                            dropdownOptionClicked(index);
                          }}
                        >
                          <DownloadIcon sx={{ mr: '4px' }} />
                          {option}
                        </MenuItem>
                      )}

                      {index === 1 && (
                        <MenuItem component='label'>
                          <UploadIcon sx={{ mr: '4px' }} />
                          {option}
                          <input
                            type='file'
                            accept='.csv'
                            multiple={false}
                            style={{
                              display: 'none',
                            }}
                            onChange={(e) => {
                              setShowDropdown(false);
                              importMyDates(e.target.files?.[0] || null, index);
                            }}
                          />
                        </MenuItem>
                      )}
                    </Box>
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
