import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField, 
    Pagination,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

export default function Index({ products, filters }) {
    const [search, setSearch] = useState(
        filters?.search || ''
    );

    const handleSearch = () => {
        router.get(
            '/products',
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${id}`);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    Product Management
                </Typography>
            }
        >
            <Head title="Products" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card elevation={3}>
                    <CardContent>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                        >
                            <Typography variant="h5" fontWeight="bold">
                                Products
                            </Typography>

                            <Button
                                component={Link}
                                href="/products/create"
                                variant="contained"
                                startIcon={<AddIcon />}
                            >
                                Add Product
                            </Button>
                        </Box>

                        <Box
                            display="flex"
                            gap={2}
                            mb={3}
                        >
                            <TextField
                                label="Search Product"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                size="small"
                            />

                            <Button
                                variant="contained"
                                startIcon={<SearchIcon />}
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>ID</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Name</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Category</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Colors</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Sizes</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Description</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Price</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Image</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Status</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Actions</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                              <TableBody>
                                    {products.data.length > 0 ? (
                                        products.data.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>{product.id}</TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>
                                                    {product.category?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {product.colors
                                                        ?.map((item) => item.name)
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>
                                                    {product.sizes
                                                        ?.map((item) => item.name)
                                                        .join(', ')}
                                                </TableCell>
                                                <TableCell>{product.description}</TableCell>
                                                <TableCell>{product.price}</TableCell>
                                                <TableCell>
                                                    {product.image ? (
                                                        <img
                                                            src={`/storage/products/${product.image}`}
                                                            alt={product.name}
                                                            width="60"
                                                            height="60"
                                                            style={{
                                                                objectFit: 'cover',
                                                                borderRadius: '5px',
                                                            }}
                                                        />
                                                    ) : (
                                                        'No Image'
                                                    )}
                                                </TableCell>
                                                <TableCell>{product.status}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        component={Link}
                                                        href={`/products/${product.id}`}
                                                        variant="contained"
                                                        color="info"
                                                        size="small"
                                                        startIcon={<VisibilityIcon />}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        component={Link}
                                                        href={`/products/${product.id}/edit`}
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<EditIcon />}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                No Records Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box
                            display="flex"
                            justifyContent="center"
                            mt={3}
                            >
                            <Pagination
                                count={products.last_page}
                                page={products.current_page}
                                onChange={(event, page) =>
                                    router.get(
                                        '/products',
                                        {
                                            page,
                                            search,
                                        },
                                        {
                                            preserveState: true,
                                        }
                                    )
                                }
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </AuthenticatedLayout>
    );
}