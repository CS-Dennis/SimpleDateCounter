import { Box, Grid2 as Grid } from '@mui/material';
import DateCardComponent from './DateCardComponent';
import { useEffect, useState } from 'react';
import { localStorageKeys } from '../Utils/Constants';
import moment from 'moment';

export default function MyDatesComponents({ currentMoment }: { currentMoment: moment.Moment; }) {
    const [allMyDates, setAllMyDates] = useState<any>({});
    const [dateKeys, setDateKeys] = useState<string[]>([]);

    const getAllMyDates = () => {
        const allDates = JSON.parse(localStorage.getItem(localStorageKeys.myDates) || "{}");
        setAllMyDates(allDates);
        setDateKeys(Object.keys(allDates));

        console.log(allDates);
    };

    useEffect(() => {

        getAllMyDates();

    }, []);


    return (
        <>
            <Box className='font-bold text-3xl mb-2 flex justify-center'>My Dates</Box>
            <Grid container>
                {dateKeys.length > 0 &&
                    dateKeys.map(myDateKey =>
                        <Grid size={{ xs: 12, md: 4, xl: 3 }}>
                            <Box>
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
        </>
    );
}
