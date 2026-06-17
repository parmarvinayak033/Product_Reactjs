import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

export default function Index({ colors, filters }) {

    const [search, setSearch] = useState(
        filters?.search || ''
    );

    const handleSearch = () => {
        router.get(
            '/colors',
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this color?')) {
            router.delete(`/colors/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    Color Management
                </Typography>
            }
        >
            <Head title="Colors" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                        >
                            <Typography variant="h5" fontWeight="bold">
                                Colors
                            </Typography>

                            <Button
                                component={Link}
                                href="/colors/create"
                                variant="contained"
                                startIcon={<AddIcon />}
                            >
                                Add Color
                            </Button>
                        </Box>

                        <Box display="flex" gap={2} mb={3}>
                            <TextField
                                label="Search Name or Status"
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
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {colors.data.length > 0 ? (
                                        colors.data.map((color) => (
                                            <TableRow key={color.id}>
                                                <TableCell>{color.id}</TableCell>
                                                <TableCell>{color.name}</TableCell>
                                                <TableCell>{color.status}</TableCell>

                                                <TableCell>

                                                    <Button
                                                        component={Link}
                                                        href={`/colors/${color.id}`}
                                                        size="small"
                                                        variant="contained"
                                                        color="info"
                                                        startIcon={<VisibilityIcon />}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        View
                                                    </Button>

                                                    <Button
                                                        component={Link}
                                                        href={`/colors/${color.id}/edit`}
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<EditIcon />}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="contained"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => handleDelete(color.id)}
                                                    >
                                                        Delete
                                                    </Button>

                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No Records Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>

                            </Table>
                        </TableContainer>

                        <Box display="flex" justifyContent="center" mt={3}>
                            <Pagination
                                count={colors.last_page}
                                page={colors.current_page}
                                onChange={(event, page) =>
                                    router.get(
                                        '/colors',
                                        { page, search },
                                        { preserveState: true }
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