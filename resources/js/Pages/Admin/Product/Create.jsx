import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';

import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
} from '@mui/material';

export default function Create({
    categories,
    colors,
    sizes,
}) {
    const [data, setData] = useState({
        category_id: '',
        name: '',
        description: '',
        price: '',
        status: 'Active',
        colors: [],
        sizes: [],
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post('/products', data);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    Add Product
                </Typography>
            }
        >
            <Head title="Add Product" />

            <Box sx={{ py: 4, px: 3 }}>
                <Card>
                    <CardContent>

                        <form onSubmit={handleSubmit}>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={3}
                            >
                                Product Information
                            </Typography>

                            <TextField
                                select
                                fullWidth
                                margin="normal"
                                label="Category"
                                name="category_id"
                                value={data.category_id}
                                onChange={handleChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                label="Product Name"
                                margin="normal"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label="Description"
                                margin="normal"
                                multiline
                                rows={4}
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label="Price"
                                type="number"
                                margin="normal"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                            />

                            <FormControl fullWidth margin="normal">
                            <InputLabel>Colors</InputLabel>

                            <Select
                                multiple
                                value={data.colors}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        colors: e.target.value,
                                    })
                                }
                                input={<OutlinedInput label="Colors" />}
                                renderValue={(selected) =>
                                    colors
                                        .filter((color) =>
                                            selected.includes(color.id)
                                        )
                                        .map((color) => color.name)
                                        .join(', ')
                                }
                            >
                                {colors.map((color) => (
                                    <MenuItem
                                        key={color.id}
                                        value={color.id}
                                    >
                                        <Checkbox
                                            checked={data.colors.includes(
                                                color.id
                                            )}
                                        />
                                        <ListItemText
                                            primary={color.name}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                            <FormControl fullWidth margin="normal">
                            <InputLabel>Sizes</InputLabel>

                            <Select
                                multiple
                                value={data.sizes}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        sizes: e.target.value,
                                    })
                                }
                                input={<OutlinedInput label="Sizes" />}
                                renderValue={(selected) =>
                                    sizes
                                        .filter((size) =>
                                            selected.includes(size.id)
                                        )
                                        .map((size) => size.name)
                                        .join(', ')
                                }
                            >
                                {sizes.map((size) => (
                                    <MenuItem
                                        key={size.id}
                                        value={size.id}
                                    >
                                        <Checkbox
                                            checked={data.sizes.includes(
                                                size.id
                                            )}
                                        />
                                        <ListItemText
                                            primary={size.name}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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
                                    size="large"
                                    sx={{ mr: 2 }}
                                >
                                    Save Product
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