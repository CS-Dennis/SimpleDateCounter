import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  Modal,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { AppContext, env, supabase_client } from '../App';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { constants } from '../Utils/Constants';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { getDateMoment, saveMyDate } from '../Utils/Utils';
import { MyDate } from '../Types/MyDate';
import ExportImportButton from '../Components/ExportImportButton';
import AuthorComponent from '../Components/AuthorComponent';
import DateClockGroupComponent from '../Components/DateClockGroupComponent';
import LoginForm from '../Components/LoginForm';
import LoadingComponent from '../Components/LoadingComponent';
import HolidaysComponent from '../Components/HolidaysComponent';
import MyDatesComponents from '../Components/MyDatesComponents';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  const context = useContext(AppContext);
  const [tab, setTab] = useState(1);

  const [showModal, setShowModal] = useState(false);

  // my date object
  const [dateTitle, setDateTitle] = useState('');
  const [missingDateTitle, setMissingDateTitle] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(getDateMoment(moment()));
  const [newMyDateAdded, setNewMyDateAdded] = useState<boolean>(false);
  const [shiftDateEnabled, setShiftDateEnabled] = useState(false);
  const [shiftedDate, setShiftedDate] = useState<moment.Moment>(selectedDate);
  const [shiftNumDays, setShiftNumDays] = useState<number>(0);

  useEffect(() => {
    var temp = moment(selectedDate);
    temp = moment(temp.add(shiftNumDays, 'days').toISOString());
    if (env == 'dev') {
      console.log(temp);
    }
    setShiftedDate(temp);
  }, [shiftNumDays, selectedDate]);

  const resetModalForm = () => {
    setDateTitle('');
    setSelectedDate(getDateMoment(moment()));
    setNewMyDateAdded(false);
  };

  const saveDate = async () => {
    if (dateTitle.trim() === '') {
      setMissingDateTitle(true);
      console.log('error');
      return;
    }

    // saveMyDate();
    const newMyDate: MyDate = {
      date: shiftDateEnabled ? shiftedDate : selectedDate,
      dateTitle: dateTitle,
      created: moment(),
      modified: moment(),
    };

    if (context.session?.access_token) {
      await saveDateOnline(newMyDate);
      if (env === 'dev') {
        console.log('dev saved date online');
      }
    } else {
      saveMyDate(newMyDate);
    }
    setShowModal(false);
    setNewMyDateAdded(true);
    setMissingDateTitle(false);
    setShiftDateEnabled(false);
  };

  const saveDateOnline = async (newMyData: MyDate) => {
    const userId = context.session?.user.id;
    const savedDate = await supabase_client
      .from('MyDates')
      .insert({
        date: newMyData.date.toISOString(),
        dateTitle: newMyData.dateTitle,
        user_id: userId,
        created_at: newMyData.created.toISOString(),
        modified: newMyData.modified.toISOString(),
      })
      .select();

    if (savedDate.error) {
      console.log(savedDate.error);
    }
    setNewMyDateAdded(true);
  };

  const toggleTheme = () => {
    const newTheme = !context.appTheme.matrixTheme;
    context.setAppTheme({
      matrixTheme: newTheme,
    });
    localStorage.setItem('matrixTheme', newTheme.toString());
  };

  return (
    <>
      {!context.authComplete && <LoadingComponent />}
      {context.authComplete && (
        <>
          <Grid
            container
            className={
              context.appTheme.matrixTheme ? `dark-theme` : `light-theme`
            }
          >
            <Grid size={{ xs: 12, md: 'grow', lg: 1 }}></Grid>
            <Grid size={{ xs: 12, md: 11, lg: 10 }}>
              <Box className='min-h-screen pb-10'>
                <Box
                  className={`flex place-content-between fixed m-auto top-0 left-0 right-0 w-full z-50 ${
                    context.appTheme.matrixTheme ? 'bg-matrix_dark' : 'bg-white'
                  }`}
                >
                  <Box className='ml-10'>
                    <Box className='font-bold text-lg'>
                      {context.appTheme.matrixTheme
                        ? 'Theme: Matrix'
                        : 'Theme: Light'}
                    </Box>
                    <Switch
                      checked={localStorage.getItem('matrixTheme') === 'true'}
                      onChange={() => toggleTheme()}
                    />
                  </Box>

                  <Box className='self-center mr-4 flex'>
                    <Box className='mr-4'>
                      {!context.session?.access_token && <ExportImportButton />}
                    </Box>

                    <Button
                      variant='contained'
                      onClick={() => {
                        setShowModal(true);
                        resetModalForm();
                      }}
                    >
                      Add Date
                    </Button>
                    {!context.session?.access_token && (
                      <Tooltip
                        className='ml-1'
                        title={
                          <Box className='whitespace-break-spaces'>
                            {constants.addDateButtonHelpText}
                          </Box>
                        }
                      >
                        <HelpOutlineIcon />
                      </Tooltip>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{ marginTop: '96px' }}
                  className='flex justify-between mx-10'
                >
                  <AuthorComponent />
                  <LoginForm />
                </Box>

                <Box>
                  <DateClockGroupComponent />

                  <Tabs
                    value={tab}
                    onChange={(_e, value) => setTab(value)}
                    centered
                  >
                    <Tab label='Holidays' />
                    <Tab label='My Dates' />
                  </Tabs>

                  {tab === 0 && (
                    <Box className='mt-4'>
                      <HolidaysComponent currentMoment={moment()} />
                    </Box>
                  )}

                  {tab === 1 && (
                    <Box className='mt-4'>
                      <MyDatesComponents
                        currentMoment={moment()}
                        newMyDateAdded={newMyDateAdded}
                        setNewMyDateAdded={setNewMyDateAdded}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 'grow', lg: 1 }}></Grid>
          </Grid>

          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <Box
              className={`absolute m-auto left-0 top-0 bottom-0 right-0 w-10/12 min-h-fit ${
                context.appTheme.matrixTheme
                  ? 'bg-matrix_green'
                  : 'bg-matrix_white_green'
              } ${
                context.appTheme.matrixTheme
                  ? 'text-matrix_white_green'
                  : 'text-matrix_dark'
              }`}
            >
              <Box className='p-4'>
                <Box
                  className={`flex justify-center font-bold ${
                    context.appTheme.matrixTheme
                      ? 'text-matrix_jade_green'
                      : 'text-matrix_dark'
                  }`}
                >
                  Add A New Date
                </Box>
                <Box className='mt-4'>
                  <TextField
                    placeholder='Date Title'
                    label={`${
                      missingDateTitle ? 'Missing Date Title' : 'Date Title'
                    }`}
                    className='w-full'
                    onChange={(e) => setDateTitle(e.target.value)}
                    error={missingDateTitle ? true : false}
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
                      label={`Date Picker ${
                        shiftDateEnabled ? '(Init Date)' : ''
                      }`}
                      defaultValue={moment()}
                      onChange={(target) =>
                        setSelectedDate(getDateMoment(target || moment()))
                      }
                    />
                  </LocalizationProvider>

                  <Box className='mt-4'>
                    <Box>
                      <Button
                        variant='contained'
                        onClick={() => setShiftDateEnabled(!shiftDateEnabled)}
                      >
                        Shift Date by a # of Days
                      </Button>
                    </Box>

                    {shiftDateEnabled && (
                      <Box>
                        <Box className='flex mt-4'>
                          <IconButton
                            className='self-center'
                            onClick={() => setShiftNumDays((p) => p - 1)}
                          >
                            <RemoveIcon
                              className={`${
                                context.appTheme.matrixTheme
                                  ? 'text-matrix_jade_green'
                                  : 'text-matrix_dark'
                              }`}
                            />
                          </IconButton>

                          <TextField
                            defaultValue={0}
                            type='number'
                            value={shiftNumDays}
                            onChange={(e) => {
                              setShiftNumDays(parseInt(e.target.value));
                            }}
                            sx={{ marginX: '20px' }}
                          />

                          <IconButton
                            className='self-center'
                            onClick={() => setShiftNumDays((p) => p + 1)}
                          >
                            <AddIcon
                              className={`${
                                context.appTheme.matrixTheme
                                  ? 'text-matrix_jade_green'
                                  : 'text-matrix_dark'
                              }`}
                            />
                          </IconButton>
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
                              label='Final Date'
                              disabled
                              // defaultValue={moment()}
                              value={shiftedDate}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box className='flex place-content-end mt-4'>
                  <Button
                    variant='contained'
                    sx={{ marginRight: 4 }}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant='contained' onClick={() => saveDate()}>
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
