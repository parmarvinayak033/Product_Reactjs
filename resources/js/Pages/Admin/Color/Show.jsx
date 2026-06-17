import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';

export default function Show({ color }) {
    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    View Color
                </Typography>
            }
        >
            <Head title="View Color" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <Typography>
                            <strong>ID:</strong> {color.id}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Name:</strong> {color.name}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Status:</strong> {color.status}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Created At:</strong> {color.created_at}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Updated At:</strong> {color.updated_at}
                        </Typography>

                        <Box mt={3}>
                            <Button
                                component={Link}
                                href="/colors"
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