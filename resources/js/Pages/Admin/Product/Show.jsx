import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';

export default function Show({ product }) {
    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    View Product
                </Typography>
            }
        >
            <Head title="View Product" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <Typography>
                            <strong>ID:</strong> {product.id}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Category:</strong>{' '}
                            {product.category?.name}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Name:</strong>{' '}
                            {product.name}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Description:</strong>{' '}
                            {product.description}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Price:</strong>{' '}
                            {product.price}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Image:</strong>
                        </Typography>

                        {product.image ? (
                            <Box mt={1}>
                                <img
                                    src={`/storage/products/${product.image}`}
                                    alt={product.name}
                                    width="250"
                                    style={{
                                        borderRadius: '8px',
                                    }}
                                />
                            </Box>
                        ) : (
                            <Typography>No Image</Typography>
                        )}

                        <Typography sx={{ mt: 2 }}>
                            <strong>Colors:</strong>{' '}
                            {product.colors
                                ?.map((item) => item.name)
                                .join(', ')}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Sizes:</strong>{' '}
                            {product.sizes
                                ?.map((item) => item.name)
                                .join(', ')}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Status:</strong>{' '}
                            {product.status}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Created At:</strong>{' '}
                            {product.created_at}
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            <strong>Updated At:</strong>{' '}
                            {product.updated_at}
                        </Typography>

                        <Box mt={3}>
                            <Button
                                component={Link}
                                href="/products"
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