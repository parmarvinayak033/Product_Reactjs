<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // List Categories
    public function index(Request $request)
    {
        $categories = Category::query()
            ->where('status', '!=', 'Deleted')
            ->when($request->search, function ($query) use ($request) {

                $search = $request->search;

                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('status', $search);
                });
            })
            ->latest()
            ->paginate(6);

        return response()->json([
            'success' => true,
            'message' => 'Categories fetched successfully',
            'categories' => $categories->items(),
            'pagination' => [
                'current_page' => $categories->currentPage(),
                'last_page' => $categories->lastPage(),
                'per_page' => $categories->perPage(),
                'total' => $categories->total(),
            ]
        ]);
    }

    // Show Single Category
    public function show(Category $category)
    {
        return response()->json([
            'success' => true,
            'message' => 'Category fetched successfully',
            'data' => $category,
        ]);
    }

    // Create Category
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'   => 'required|string|max:255',
            'status' => 'required|string',
        ]);

        $category = Category::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    // Update Category
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name'   => 'sometimes|string|max:255',
            'status' => 'sometimes|string',
        ]);

        $category->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category,
        ]);
    }

    // Delete Category (Soft Delete using status)
    public function destroy(Category $category)
    {
        $category->update([
            'status' => 'Deleted'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ]);
    }
}