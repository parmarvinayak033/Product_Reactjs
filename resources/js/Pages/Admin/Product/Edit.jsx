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

export default function Edit({
    product,
    categories,
    colors,
    sizes,
}) {
    const [data, setData] = useState({
        category_id: product.category_id || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: null,
        status: product.status || 'Active',

        colors: product.colors
            ? product.colors.map((item) => item.id)
            : [],

        sizes: product.sizes
            ? product.sizes.map((item) => item.id)
            : [],
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setData({
            ...data,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(data).forEach((key) => {

            if (Array.isArray(data[key])) {

                data[key].forEach((value) => {
                    formData.append(`${key}[]`, value);
                });

            } else if (data[key] !== null) {

                formData.append(key, data[key]);
            }
        });

formData.append('_method', 'PUT');

router.post(
    `/products/${product.id}`,
    formData
);
    };

    return (
        <AuthenticatedLayout
            header={
                <Typography variant="h5" fontWeight="bold">
                    Edit Product
                </Typography>
            }
        >
            <Head title="Edit Product" />

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

                            {product.image && (
                                <Box mt={2}>
                                    <Typography variant="body2">
                                        Current Image
                                    </Typography>

                                    <img
                                        src={`/storage/products/${product.image}`}
                                        alt={product.name}
                                        width="150"
                                        style={{
                                            borderRadius: '8px',
                                            marginTop: '10px',
                                        }}
                                    />
                                </Box>
                            )}

                            <TextField
                                type="file"
                                fullWidth
                                margin="normal"
                                name="image"
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                    Update Product
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