<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    // List Colors
    public function index(Request $request)
    {
        $colors = Color::query()
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
            'message' => 'Colors fetched successfully',
            'colors' => $colors->items(),
            'pagination' => [
                'current_page' => $colors->currentPage(),
                'last_page' => $colors->lastPage(),
                'per_page' => $colors->perPage(),
                'total' => $colors->total(),
            ]
        ]);
    }

    // Show Single Color
    public function show(Color $color)
    {
        return response()->json([
            'success' => true,
            'message' => 'Color fetched successfully',
            'data' => $color,
        ]);
    }

    // Create Color
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|string',
        ]);

        $color = Color::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Color created successfully',
            'data' => $color,
        ], 201);
    }

    // Update Color
    public function update(Request $request, Color $color)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'status' => 'sometimes|string',
        ]);

        $color->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Color updated successfully',
            'data' => $color,
        ]);
    }

    // Delete Color (Soft Delete)
    public function destroy(Color $color)
    {
        $color->update([
            'status' => 'Deleted',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Color deleted successfully',
        ]);
    }
}