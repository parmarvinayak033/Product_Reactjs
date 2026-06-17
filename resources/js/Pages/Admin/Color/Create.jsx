import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
} from '@mui/material';

export default function Create() {

    const [data, setData] = useState({
        name: '',
        status: 'Active',
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/colors', data);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    Add Color
                </Typography>
            }
        >
            <Head title="Add Color" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <form onSubmit={handleSubmit}>

                            <TextField
                                fullWidth
                                label="Color Name"
                                margin="normal"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />

                            <TextField
                                select
                                fullWidth
                                label="Status"
                                margin="normal"
                                name="status"
                                value={data.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="InActive">InActive</MenuItem>
                            </TextField>

                            <Box mt={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Save Color
                                </Button>
                            </Box>

                        </form>

                    </CardContent>
                </Card>
            </Box>
        </AuthenticatedLayout>
    );
}