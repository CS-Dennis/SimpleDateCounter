import ClockComponent from "../Components/ClockComponent";
import DateComponent from "../Components/DateComponent";
import { Box, Button, Grid2 as Grid, Modal, Switch, Tab, Tabs, TextField, Tooltip } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import TimeZoneComponent from "../Components/TimeZoneComponent";
import DateCounterComponent from "../Components/DateCounterComponent";
import HolidaysComponent from "../Components/HolidaysComponent";
import { AppContext } from "../App";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { constants } from "../Utils/Constants";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { getDateMoment, saveMyDate } from "../Utils/Utils";
import { MyDate } from "../Types/MyDate";
import MyDatesComponents from "../Components/MyDatesComponents";

export default function Home() {
  const context = useContext(AppContext);

  const [currentMoment, setCurrentMoment] = useState<moment.Moment>(moment());
  const [showModal, setShowModal] = useState(false);

  // my date object
  const [dateTitle, setDateTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(getDateMoment(moment()));
  const [newMyDateAdded, setNewMyDateAdded] = useState<boolean>(false);

  const [tab, setTab] = useState(0);

  const resetModalForm = () => {
    setDateTitle("");
    setSelectedDate(getDateMoment(moment()));
    setNewMyDateAdded(false);
  };

  const saveDate = () => {
    // saveMyDate();
    const newMyDate: MyDate = {
      date: selectedDate,
      dateTitle: dateTitle,
      created: moment(),
      modified: moment()
    };

    saveMyDate(newMyDate);
    setShowModal(false);
    setNewMyDateAdded(true);
  };

  const toggleTheme = () => {
    const newTheme = !context.appTheme.matrixTheme;
    context.setAppTheme({
      matrixTheme: newTheme,
    });
    localStorage.setItem("matrixTheme", newTheme.toString());
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentMoment(moment());
    }, 1000);
  }, []);

  return (
    <>
      <Grid
        container
        className={context.appTheme.matrixTheme ? `dark-theme` : `light-theme`}
      >
        <Grid size={{ xs: 12, md: 'grow', lg: 1 }}></Grid>
        <Grid size={{ xs: 12, md: 11, lg: 10 }}>
          <Box className='min-h-screen pb-10'>
            <Box className={`flex place-content-between fixed m-auto top-0 left-0 right-0 w-full z-50 ${context.appTheme.matrixTheme ? 'bg-matrix_dark' : 'bg-white'}`}>
              <Box className="ml-10">
                <Box className='font-bold text-lg'>
                  {context.appTheme.matrixTheme
                    ? "Theme: Matrix"
                    : "Theme: Light"}
                </Box>
                <Switch
                  checked={localStorage.getItem("matrixTheme") === "true"}
                  onChange={() => toggleTheme()}
                />
              </Box>

              <Box className="self-center mr-4">
                <Button variant="contained" onClick={() => { setShowModal(true); resetModalForm(); }} >Add My Date</Button>
                <Tooltip className="ml-1" title={
                  <Box className="whitespace-break-spaces">{constants.addDateButtonHelpText}</Box>
                } >
                  <HelpOutlineIcon />
                </Tooltip>
              </Box>
            </Box>

            <Box className='flex justify-center mt-10'>
              <DateComponent currentMoment={currentMoment} />
            </Box>
            <Box className='flex justify-center'>
              <ClockComponent currentMoment={currentMoment} />
            </Box>
            <Box>
              <TimeZoneComponent currentMoment={currentMoment} />
            </Box>

            <Box className='mt-10'>
              <DateCounterComponent />
            </Box>

            <Tabs value={tab} onChange={(_e, value) => setTab(value)} centered>
              <Tab label="Holidays" />
              <Tab label="My Dates" />
            </Tabs>

            {
              tab === 0 && <Box className='mt-4'>
                <HolidaysComponent currentMoment={currentMoment} />
              </Box>
            }

            {
              tab === 1 &&
              <Box className="mt-4">
                <MyDatesComponents currentMoment={currentMoment} newMyDateAdded={newMyDateAdded} setNewMyDateAdded={setNewMyDateAdded} />
              </Box>
            }
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 'grow', lg: 1 }}></Grid>
      </Grid>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Box className="absolute m-auto left-0 top-0 bottom-0 right-0 w-10/12 min-h-fit bg-matrix_green text-matrix_white_green">
          <Box className="p-4">
            <Box className="text-matrix_jade_green flex justify-center font-bold">
              Add A New Date
            </Box>
            <Box className="mt-4">
              <TextField placeholder="Date Title" label="Date Title" className="w-full" onChange={(e) => setDateTitle(e.target.value)} />
            </Box>

            <Box className="mt-4">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  className="w-full"
                  slotProps={{
                    actionBar: {
                      actions: ["today", "accept"],
                    },
                  }}
                  label='Date Picker'
                  defaultValue={moment()}

                  onChange={(target) => setSelectedDate(getDateMoment(target || moment()))}
                />
              </LocalizationProvider>
            </Box>

            <Box className="flex place-content-end mt-4">
              <Button variant="contained" sx={{ marginRight: 4 }} onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="contained" onClick={() => saveDate()}>Save</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
