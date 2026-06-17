<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    // List Sizes
    public function index(Request $request)
    {
        $sizes = Size::query()
            ->where('status', '!=', 'Deleted')
            ->when($request->search, function ($query) use ($request) {

                $search = $request->search;

                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('status', $search);
                });
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Sizes fetched successfully',
            'sizes' => $sizes->items(),
            'pagination' => [
                'current_page' => $sizes->currentPage(),
                'last_page' => $sizes->lastPage(),
                'per_page' => $sizes->perPage(),
                'total' => $sizes->total(),
            ]
        ]);
    }

    // Show Single Size
    public function show(Size $size)
    {
        return response()->json([
            'success' => true,
            'message' => 'Size fetched successfully',
            'data' => $size,
        ]);
    }

    // Create Size
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string',
        ]);

        $size = Size::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Size created successfully',
            'data' => $size,
        ], 201);
    }

    // Update Size
    public function update(Request $request, Size $size)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'status' => 'sometimes|string',
        ]);

        $size->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Size updated successfully',
            'data' => $size,
        ]);
    }

    // Delete Size (Soft Delete)
    public function destroy(Size $size)
    {
        $size->update([
            'status' => 'Deleted',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Size deleted successfully',
        ]);
    }
}