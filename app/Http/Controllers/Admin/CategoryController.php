<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::query()
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

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        Category::create([
            'name' => $request->name,
            'status' => $request->status,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category created successfully');
    }

    public function show(Category $category)
    {
        return Inertia::render('Admin/Category/Show', [
            'category' => $category,
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Category/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|max:255',
            'status' => 'required',
        ]);

        $category->update([
            'name' => $request->name,
            'status' => $request->status,
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        $category->update([
            'status' => 'Deleted',
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category deleted successfully');
    }
}