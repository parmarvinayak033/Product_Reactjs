import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';

export default function Show({ size }) {
    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    View Size
                </Typography>
            }
        >
            <Head title="View Size" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <Typography>
                            <strong>ID:</strong> {size.id}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Name:</strong> {size.name}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Status:</strong> {size.status}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Created At:</strong> {size.created_at}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Updated At:</strong> {size.updated_at}
                        </Typography>

                        <Box mt={3}>
                            <Button
                                component={Link}
                                href="/sizes"
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