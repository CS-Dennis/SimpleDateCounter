import { Box, Button, IconButton, Modal } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { appDescription, email, linkedin, version } from '../Utils/Constants';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export default function AuthorComponent() {
  const context = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Box>
        <Button
          startIcon={<InfoOutlinedIcon />}
          onClick={() => setShowModal(true)}
        >
          About
        </Button>
      </Box>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          className={`absolute m-auto left-0 top-0 bottom-0 right-0 w-10/12 min-h-fit p-6
                    ${
                      context.appTheme.matrixTheme
                        ? 'bg-matrix_green text-matrix_jade_green'
                        : 'bg-matrix_white_green text-matrix_dark'
                    }`}
        >
          <Box className='absolute right-0 top-0 mt-4 mr-4'>
            <IconButton
              color={`${
                context.appTheme.matrixTheme ? 'primary' : 'secondary'
              }`}
              onClick={() => setShowModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className='font-bold flex justify-center text-lg'>
            Date Counter (ver. {version[0]})
          </Box>

          <Box className='justify-center text-left mt-6'>
            <Box>{appDescription}</Box>
            <Box>{`Name: Nan Ye`}</Box>
            <Box>{`Email: ${email}`}</Box>
            <Box>
              {`LinkedIn: `}
              <Link to={linkedin} target='_blank'>
                {linkedin}
              </Link>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
