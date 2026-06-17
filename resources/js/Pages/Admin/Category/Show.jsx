import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';

export default function Show({ category }) {
    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    View Category
                </Typography>
            }
        >
            <Head title="View Category" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <Typography variant="h6" gutterBottom>
                            Category Details
                        </Typography>

                        <Typography>
                            <strong>ID:</strong> {category.id}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Name:</strong> {category.name}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Status:</strong> {category.status}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Created At:</strong> {category.created_at}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Updated At:</strong> {category.updated_at}
                        </Typography>

                        <Box mt={3}>
                            <Button
                                component={Link}
                                href="/categories"
                                variant="contained"
                            >
                                Back
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Box>
        </AuthenticatedLayout>
    );
}