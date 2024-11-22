import { useContext, useState } from 'react';
import { AppContext, supabase_client } from '../App';
import { Box, Button, Modal } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function LoginForm() {
  const context = useContext(AppContext);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const logout = async () => {
    const { error } = await supabase_client.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      {context.session === null && (
        <Button
          variant='contained'
          sx={{ textTransform: 'capitalize' }}
          onClick={() => setShowLoginForm(true)}
        >
          Login
        </Button>
      )}

      {context.session !== null && (
        <Button
          variant='outlined'
          sx={{ textTransform: 'capitalize' }}
          onClick={() => logout()}
        >
          Log out
        </Button>
      )}

      {context.session === null && (
        <Modal
          open={showLoginForm}
          onClose={() => setShowLoginForm(false)}
          className='w-9/12 h-fit m-auto left-0 right-0 top-0 bottom-0'
        >
          <Box className='bg-white p-10'>
            <Auth
              supabaseClient={supabase_client}
              providers={[]}
              appearance={{ theme: ThemeSupa }}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}
