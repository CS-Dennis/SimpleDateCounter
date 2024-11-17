import { Box, Button, Grid2 as Grid, Modal, TextField } from '@mui/material';
import DateCardComponent from './DateCardComponent';
import { useEffect, useState } from 'react';
import { localStorageKeys } from '../Utils/Constants';
import moment from 'moment';
import { deleteMyDate, getDateMoment, getMyDateByKey, updateMyDate } from '../Utils/Utils';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function MyDatesComponents({ currentMoment, newMyDateAdded, setNewMyDateAdded }:
    {
        currentMoment: moment.Moment;
        newMyDateAdded: boolean;
        setNewMyDateAdded: (newMyDateAdded: boolean) => void;
    }
) {
    const [allMyDates, setAllMyDates] = useState<any>({});
    const [dateKeys, setDateKeys] = useState<string[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedMyDateKey, setSelectedMyDateKey] = useState<string>("");
    const [selectedMyDate, setSelectedMyDate] = useState<any>();

    const [formChanged, setFormChanged] = useState(false);
    const [updatedDateTilte, setUpdatedDateTilte] = useState<string | null>(null);
    const [updatedDate, setUpdatedDate] = useState<moment.Moment | null>(null);


    const getAllMyDates = () => {
        const allDates = JSON.parse(localStorage.getItem(localStorageKeys.myDates) || "{}");
        setAllMyDates(allDates);
        setDateKeys(Object.keys(allDates));
        // console.log(allDates);
    };

    const openUpdateModal = (myDateKey: string) => {
        setSelectedMyDateKey(myDateKey);
        setSelectedMyDate(getMyDateByKey(myDateKey));
        console.log(getMyDateByKey(myDateKey));
        setShowModal(true);
    };

    const updatingMyDateForm = () => {
        if (!formChanged) {
            setFormChanged(true);
        }
    };

    const updateMyDateForm = () => {
        var newMyDate = { ...selectedMyDate[selectedMyDateKey], modified: moment().toISOString() };

        if (updatedDateTilte !== null) {
            newMyDate = { ...newMyDate, dateTitle: updatedDateTilte };
        }

        if (updatedDate !== null) {
            newMyDate = { ...newMyDate, date: updatedDate.toISOString() };
        }

        updateMyDate(selectedMyDateKey, newMyDate);

        getAllMyDates();
        setShowModal(false);
    };

    const deleteMyDateOnForm = () => {
        console.log(selectedMyDateKey);
        deleteMyDate(selectedMyDateKey);
        getAllMyDates();
        setShowModal(false);
    };

    const resetMyDateForm = () => {
        setUpdatedDateTilte(null);
        setUpdatedDate(null);
        setSelectedMyDateKey("");
        setShowModal(false);
    };

    useEffect(() => {
        getAllMyDates();
    }, []);

    useEffect(() => {
        if (newMyDateAdded) {
            getAllMyDates();
            setNewMyDateAdded(false);
            console.log("getallmydates");

        }
        console.log(newMyDateAdded);

    }, [newMyDateAdded]);


    return (
        <>
            <Box className='font-bold text-3xl mb-2 flex justify-center'>My Dates</Box>
            <Grid container>
                {dateKeys.length > 0 &&
                    dateKeys.map(myDateKey =>
                        <Grid key={myDateKey} size={{ xs: 12, md: 4, xl: 3 }}>
                            <Box key={myDateKey} onClick={() => openUpdateModal(myDateKey)}>
                                <DateCardComponent
                                    currentMoment={currentMoment}
                                    nextMoment={moment(allMyDates[myDateKey].date) || moment()}
                                    dateName={allMyDates[myDateKey].dateTitle}
                                />
                            </Box>
                        </Grid>
                    )
                }
            </Grid>

            {/* Update MyDate Form */}
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <Box className='absolute m-auto left-0 top-0 bottom-0 right-0 w-10/12 min-h-fit bg-matrix_green text-matrix_white_green'>
                    <Box className='p-4'>
                        {selectedMyDate && selectedMyDateKey !== "" &&
                            <>
                                <Box className='text-lg text-matrix_jade_green flex justify-center font-bold'>
                                    Update My Date<br />{selectedMyDateKey}
                                </Box>
                                <Box className='mt-4'>
                                    <TextField
                                        defaultValue={selectedMyDate[selectedMyDateKey].dateTitle}
                                        label="Date Title"
                                        placeholder='Date Title'
                                        className='w-full'
                                        onChange={(e) => { updatingMyDateForm(); setUpdatedDateTilte(e.target.value); }}
                                    />
                                </Box>
                                <Box className='mt-4'>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <MobileDatePicker
                                            className="w-full"
                                            slotProps={{
                                                actionBar: {
                                                    actions: ["today", "accept"],
                                                },
                                            }}
                                            label='Date Picker'
                                            defaultValue={moment(selectedMyDate[selectedMyDateKey].date)}

                                            onChange={(e) => { updatingMyDateForm(); setUpdatedDate(getDateMoment(e || moment())); }}
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box className='mt-4 flex justify-between'>
                                    <Box>
                                        <Button variant='contained' color='error' onClick={() => deleteMyDateOnForm()}>Delete</Button>
                                    </Box>
                                    <Box className='flex justify-end'>
                                        <Button variant='contained' sx={{ marginRight: "2em" }} onClick={() => resetMyDateForm()}>Cancel</Button>
                                        <Button variant='contained' disabled={!formChanged ? true : false} onClick={() => updateMyDateForm()}>Update</Button>
                                    </Box>
                                </Box>
                            </>
                        }
                    </Box>
                </Box>

            </Modal>
        </>
    );
}
