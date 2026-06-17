<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // ✅ List products
    public function index(Request $request)
    {
        $products = Product::with(['category','colors','sizes'])
            ->where('status', '!=', 'Deleted')
            ->when($request->search, function ($query) use ($request) {
                $search = $request->search;

                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('price', 'like', "%{$search}%")
                      ->orWhere('status', $search);

                    $q->orWhereHas('category', fn($cat) => $cat->where('name', 'like', "%{$search}%"));
                    $q->orWhereHas('colors', fn($color) => $color->where('name', 'like', "%{$search}%"));
                    $q->orWhereHas('sizes', fn($size) => $size->where('name', 'like', "%{$search}%"));
                });
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Products fetched successfully',
            'products' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ]
        ]);
    }

    // ✅ Show single product
    public function show(Product $product)
    {
        $product->load(['category','colors','sizes']);

        return response()->json([
            'success' => true,
            'message' => 'Product details fetched successfully',
            'data' => $product,
        ]);
    }

    // ✅ Insert product (POST)
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|numeric',
            'status'      => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'color_ids'   => 'array',
            'size_ids'    => 'array',
        ]);

        $product = Product::create($data);

        if (!empty($data['color_ids'])) {
            $product->colors()->sync($data['color_ids']);
        }
        if (!empty($data['size_ids'])) {
            $product->sizes()->sync($data['size_ids']);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product->load(['category','colors','sizes']),
        ], 201);
    }

    // ✅ Update product (PUT/PATCH)
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'sometimes|numeric',
            'status'      => 'sometimes|string',
            'category_id' => 'sometimes|exists:categories,id',
            'color_ids'   => 'array',
            'size_ids'    => 'array',
        ]);

        $product->update($data);

        if (isset($data['color_ids'])) {
            $product->colors()->sync($data['color_ids']);
        }
        if (isset($data['size_ids'])) {
            $product->sizes()->sync($data['size_ids']);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $product->load(['category','colors','sizes']),
        ]);
    }

    // ✅ Delete product (DELETE)
    public function destroy(Product $product)
    {
        $product->update([
            'status'=>'Deleted',
        ]);

        return response()->json([
            'success'=>true,
            'message'=>'product deleted successfully',
        ]);
    }
}
