import { Box, Typography } from '@mui/material';

const TextCard = () => {
    return (
        <Box
            sx={{
                width: 200,
                backgroundColor: 'background.paper',
                borderRadius: 4,
                padding: 2,
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography
                variant='body2'
                sx={{ fontWeight: 600, marginBottom: 1 }}
            >
                Deposit to Escrow
            </Typography>
            <Typography
                variant='subtitle2'
                sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 400 }}
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. It has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
            </Typography>
        </Box>
    );
};

export default TextCard;
