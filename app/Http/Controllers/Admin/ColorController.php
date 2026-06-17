<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ColorController extends Controller
{
    public function index(Request $request)
    {
        $colors = Color::query()
            ->where('status', '!=', 'Deleted')
            ->when($request->search, function ($query) use ($request) {

                $search = $request->search;

                $query->where(function ($q) use ($search) {

                    $q->where('name', 'like', "%{$search}%");

                    if (
                        strtolower($search) === 'active' ||
                        strtolower($search) === 'inactive'
                    ) {
                        $q->orWhere('status', ucfirst(strtolower($search)));
                    }
                });
            })
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Admin/Color/Index', [
            'colors' => $colors,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Color/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        Color::create([
            'name' => $request->name,
            'status' => $request->status,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('colors.index')
            ->with('success', 'Color created successfully');
    }

    public function show(Color $color)
    {
        return Inertia::render('Admin/Color/Show', [
            'color' => $color,
        ]);
    }

    public function edit(Color $color)
    {
        return Inertia::render('Admin/Color/Edit', [
            'color' => $color,
        ]);
    }

    public function update(Request $request, Color $color)
    {
        $request->validate([
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        $color->update([
            'name' => $request->name,
            'status' => $request->status,
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('colors.index')
            ->with('success', 'Color updated successfully');
    }

    public function destroy(Color $color)
    {
        $color->update([
            'status' => 'Deleted',
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('colors.index')
            ->with('success', 'Color deleted successfully');
    }
}