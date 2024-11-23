import {
  Box,
  Button,
  ButtonGroup,
  Grid2 as Grid,
  IconButton,
  Modal,
  TextField,
} from '@mui/material';
import DateCardComponent from './DateCardComponent';
import { useContext, useEffect, useState } from 'react';
import { localStorageKeys } from '../Utils/Constants';
import moment from 'moment';
import {
  deleteMyDate,
  getDateMoment,
  getMyDateByKey,
  updateMyDate,
} from '../Utils/Utils';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AppContext, env, supabase_client } from '../App';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { v4 as uuidv4 } from 'uuid';

export default function MyDatesComponents({
  currentMoment,
  newMyDateAdded,
  setNewMyDateAdded,
}: {
  currentMoment: moment.Moment;
  newMyDateAdded: boolean;
  setNewMyDateAdded: (newMyDateAdded: boolean) => void;
}) {
  const context = useContext(AppContext);

  const [allMyDates, setAllMyDates] = useState<any>({});
  const [dateKeys, setDateKeys] = useState<string[]>([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const [selectedMyDateKey, setSelectedMyDateKey] = useState<string>('');
  const [selectedMyDate, setSelectedMyDate] = useState<any>();

  const [formChanged, setFormChanged] = useState(false);
  const [updatedDateTilte, setUpdatedDateTilte] = useState<string | null>(null);
  const [updatedDate, setUpdatedDate] = useState<moment.Moment | null>(null);

  const getAllMyDates = async () => {
    const allDates = JSON.parse(
      localStorage.getItem(localStorageKeys.myDates) || '{}'
    );
    if (env === 'dev') {
      console.log('dev', allDates);
    }

    setAllMyDates(allDates);
    setDateKeys(Object.keys(allDates));
  };

  const openUpdateModal = (myDateKey: string) => {
    setSelectedMyDateKey(myDateKey);
    // if online
    if (context.session?.access_token) {
      setSelectedMyDate({
        [allMyDates[myDateKey].id]: allMyDates[myDateKey],
      });
      if (env === 'dev') {
        console.log('dev', {
          [allMyDates[myDateKey].id]: allMyDates[myDateKey],
        });
      }
    }
    // if offline
    else {
      setSelectedMyDate(getMyDateByKey(myDateKey));
    }
    setShowEditModal(true);
  };

  const updatingMyDateForm = () => {
    if (!formChanged) {
      setFormChanged(true);
    }
  };

  const updateMyDateForm = async () => {
    var newMyDate = {
      ...selectedMyDate[selectedMyDateKey],
      modified: moment().toISOString(),
    };

    if (updatedDateTilte !== null) {
      newMyDate = { ...newMyDate, dateTitle: updatedDateTilte };
    }

    if (updatedDate !== null) {
      newMyDate = { ...newMyDate, date: updatedDate.toISOString() };
    }

    // online
    if (context.session?.access_token) {
      const { data, error } = await supabase_client
        .from('MyDates')
        .update({ ...newMyDate })
        .eq('id', selectedMyDateKey)
        .select();
      if (error) {
        console.log(error);
      }
      if (env === 'dev') {
        console.log('dev updated ', data);
      }
      getAllMyDatesOnline();
    }
    // offline
    else {
      updateMyDate(selectedMyDateKey, newMyDate);
      getAllMyDates();
    }

    setShowEditModal(false);
  };

  const deleteMyDateOnForm = () => {
    deleteMyDate(selectedMyDateKey);
    getAllMyDates();
    setShowEditModal(false);
  };

  const resetMyDateForm = () => {
    setUpdatedDateTilte(null);
    setUpdatedDate(null);
    setSelectedMyDateKey('');
    setShowEditModal(false);
  };

  const deleteAllDates = () => {
    setShowClearModal(false);
    localStorage.setItem(localStorageKeys.myDates, '');
    getAllMyDates();
  };

  const sortMyDates = (type: string) => {
    const myDates = JSON.parse(
      localStorage.getItem(localStorageKeys.myDates) || ''
    );
    const keys = Object.keys(myDates);

    var myDatesList = keys.map((key) => myDates[key]);

    if (type === 'asc') {
      myDatesList = myDatesList.sort(
        (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
      );
    } else if (type === 'desc') {
      myDatesList = myDatesList.sort(
        (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
      );
    }

    const newMyDates: any = {};
    myDatesList.forEach((myDate) => {
      const uuid = uuidv4();
      newMyDates[uuid] = myDate;
    });

    localStorage.setItem(localStorageKeys.myDates, JSON.stringify(newMyDates));
    getAllMyDates();
  };

  // operations for logged in users
  const getAllMyDatesOnline = async () => {
    const { data } = await supabase_client.from('MyDates').select();

    // transforma data format
    var transformedData: any = {};
    data?.forEach((row) => {
      transformedData = { ...transformedData, [row.id]: row };
    });

    setAllMyDates(transformedData);
    setDateKeys(Object.keys(transformedData || ''));
    if (env === 'dev') {
      console.log('dev data', transformedData);
    }
  };

  useEffect(() => {
    // online
    if (context.session?.access_token) {
      getAllMyDatesOnline();
    }
    // offline
    else {
      getAllMyDates();
      if (newMyDateAdded) {
        setNewMyDateAdded(false);
      }

      if (context.myDatesUpdated) {
        context.setMyDatesUpdated(false);
      }
    }
  }, [context.session?.access_token, newMyDateAdded, context.myDatesUpdated]);

  return (
    <>
      <Box className='font-bold text-3xl mb-2 justify-center'>
        <Box className='flex justify-center'>My Dates</Box>
        <Box className='flex justify-between'>
          <Box className='ml-2'>
            <ButtonGroup variant='outlined' aria-label='Basic button group'>
              <Button onClick={() => sortMyDates('asc')}>Asc</Button>
              <Button onClick={() => sortMyDates('desc')}>Desc</Button>
            </ButtonGroup>
          </Box>
          <Box>
            <IconButton color='primary' onClick={() => setShowClearModal(true)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Grid container>
        {dateKeys.length > 0 &&
          dateKeys.map((myDateKey) => (
            <Grid key={myDateKey} size={{ xs: 12, md: 4, xl: 3 }}>
              <Box key={myDateKey} onClick={() => openUpdateModal(myDateKey)}>
                <DateCardComponent
                  currentMoment={currentMoment}
                  nextMoment={moment(allMyDates[myDateKey].date) || moment()}
                  dateName={allMyDates[myDateKey].dateTitle}
                />
              </Box>
            </Grid>
          ))}
      </Grid>

      {/* Update MyDate offline Form */}
      {!context.session?.access_token && (
        <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
          <Box
            className={`absolute m-auto left-0 top-0 bottom-0 right-0 w-10/12 min-h-fit 
                    ${
                      context.appTheme.matrixTheme
                        ? 'bg-matrix_green'
                        : 'bg-matrix_white_green'
                    }`}
          >
            <Box className='p-4'>
              {selectedMyDate && selectedMyDateKey !== '' && (
                <>
                  <Box
                    className={`text-lg flex justify-center font-bold
                                    ${
                                      context.appTheme.matrixTheme
                                        ? 'text-matrix_jade_green'
                                        : 'text-matrix_dark'
                                    }`}
                  >
                    Update My Date
                  </Box>
                  <Box className='mt-4'>
                    <TextField
                      defaultValue={selectedMyDate[selectedMyDateKey].dateTitle}
                      label='Date Title'
                      placeholder='Date Title'
                      className='w-full'
                      onChange={(e) => {
                        updatingMyDateForm();
                        setUpdatedDateTilte(e.target.value);
                      }}
                    />
                  </Box>
                  <Box className='mt-4'>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <MobileDatePicker
                        className='w-full'
                        slotProps={{
                          actionBar: {
                            actions: ['today', 'accept'],
                          },
                        }}
                        label='Date Picker'
                        defaultValue={moment(
                          selectedMyDate[selectedMyDateKey].date
                        )}
                        onChange={(e) => {
                          updatingMyDateForm();
                          setUpdatedDate(getDateMoment(e || moment()));
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box className='mt-4 flex justify-between'>
                    <Box>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => deleteMyDateOnForm()}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Box className='flex justify-end'>
                      <Button
                        variant='contained'
                        sx={{ marginRight: '2em' }}
                        onClick={() => resetMyDateForm()}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant='contained'
                        disabled={!formChanged ? true : false}
                        onClick={() => updateMyDateForm()}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Modal>
      )}

      {/* update myDate online form */}
      {context.session?.access_token && (
        <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
          <Box
            className={`absolute m-auto left-0 top-0 bottom-0 right-0 w-10/12 min-h-fit 
                  ${
                    context.appTheme.matrixTheme
                      ? 'bg-matrix_green'
                      : 'bg-matrix_white_green'
                  }`}
          >
            <Box className='p-4'>
              <>
                <Box
                  className={`text-lg flex justify-center font-bold
                                  ${
                                    context.appTheme.matrixTheme
                                      ? 'text-matrix_jade_green'
                                      : 'text-matrix_dark'
                                  }`}
                >
                  Update My Date
                </Box>
                <Box className='mt-4'>
                  <TextField
                    defaultValue={allMyDates[selectedMyDateKey]?.dateTitle}
                    label='Date Title'
                    placeholder='Date Title'
                    className='w-full'
                    onChange={(e) => {
                      updatingMyDateForm();
                      setUpdatedDateTilte(e.target.value);
                    }}
                  />
                </Box>
                <Box className='mt-4'>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileDatePicker
                      className='w-full'
                      slotProps={{
                        actionBar: {
                          actions: ['today', 'accept'],
                        },
                      }}
                      label='Date Picker'
                      defaultValue={moment(allMyDates[selectedMyDateKey]?.date)}
                      onChange={(e) => {
                        updatingMyDateForm();
                        setUpdatedDate(getDateMoment(e || moment()));
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                <Box className='mt-4 flex justify-between'>
                  <Box>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => deleteMyDateOnForm()}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Box className='flex justify-end'>
                    <Button
                      variant='contained'
                      sx={{ marginRight: '2em' }}
                      onClick={() => resetMyDateForm()}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant='contained'
                      disabled={!formChanged ? true : false}
                      onClick={() => updateMyDateForm()}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </>
            </Box>
          </Box>
        </Modal>
      )}

      {/* modal for clearing all dates */}
      <Modal open={showClearModal} onClose={() => setShowClearModal(false)}>
        <Box
          className={`absolute m-auto left-0 top-0 bottom-0 right-0 w-10/12 min-h-fit p-6
                    ${
                      context.appTheme.matrixTheme
                        ? 'bg-matrix_green'
                        : 'bg-matrix_white_green'
                    }`}
        >
          <Box
            className={`flex justify-center text-lg font-bold ${
              context.appTheme.matrixTheme
                ? 'text-matrix_jade_green'
                : 'text-matrix_dark'
            }`}
          >
            Delete All Dates?
          </Box>
          <Box className='mt-4 flex justify-evenly'>
            <Button
              variant='contained'
              onClick={() => setShowClearModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => deleteAllDates()}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
