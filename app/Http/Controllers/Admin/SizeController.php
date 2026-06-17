<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SizeController extends Controller
{
    public function index(Request $request)
    {
        $sizes = Size::query()
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

        return Inertia::render('Admin/Size/Index', [
            'sizes' => $sizes,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Size/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        Size::create([
            'name' => $request->name,
            'status' => $request->status,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('sizes.index')
            ->with('success', 'Size created successfully');
    }

    public function show(Size $size)
    {
        return Inertia::render('Admin/Size/Show', [
            'size' => $size,
        ]);
    }

    public function edit(Size $size)
    {
        return Inertia::render('Admin/Size/Edit', [
            'size' => $size,
        ]);
    }

    public function update(Request $request, Size $size)
    {
        $request->validate([
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        $size->update([
            'name' => $request->name,
            'status' => $request->status,
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('sizes.index')
            ->with('success', 'Size updated successfully');
    }

    public function destroy(Size $size)
    {
        $size->update([
            'status' => 'Deleted',
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('sizes.index')
            ->with('success', 'Size deleted successfully');
    }
}