import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
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
        router.post('/sizes', data);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    Add Size
                </Typography>
            }
        >
            <Head title="Add Size" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <form onSubmit={handleSubmit}>

                            <TextField
                                fullWidth
                                label="Size Name"
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
                                    Save Size
                                </Button>
                                 <Button
                                    component={Link}
                                    href="/sizes"
                                    variant="outlined"
                                    size="large"
                                >
                                    Back
                                </Button>
                            </Box>

                        </form>

                    </CardContent>
                </Card>
            </Box>
        </AuthenticatedLayout>
    );
}