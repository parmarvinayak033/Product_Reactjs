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

        router.post('/categories', data);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    Add Category
                </Typography>
            }
        >
            <Head title="Add Category" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <form onSubmit={handleSubmit}>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={3}
                            >
                                Category Information
                            </Typography>

                            <TextField
                                fullWidth
                                label="Category Name"
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
                                <MenuItem value="Active">
                                    Active
                                </MenuItem>

                                <MenuItem value="InActive">
                                    InActive
                                </MenuItem>
                            </TextField>

                            <Box mt={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Save Category
                                </Button>
                                <Button
                                    component={Link}
                                    href="/products"
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