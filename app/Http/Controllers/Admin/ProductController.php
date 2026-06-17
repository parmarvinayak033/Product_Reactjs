<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Color;
use App\Models\Size;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
   public function index(Request $request)
    {
        $products = Product::with([
            'category',
            'colors',
            'sizes'
        ])
            ->where('status', '!=', 'Deleted')
            ->when($request->search, function ($query) use ($request) {
               $search = $request->search;

                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
                    ->orWhere('status', $search);
                });
            })
            ->latest()
            ->paginate(4)
            ->withQueryString();

        return Inertia::render('Admin/Product/Index', [
            'products' => $products,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

   public function create()
    {
        return Inertia::render('Admin/Product/Create', [
            'categories' => Category::where('status', 'Active')
                ->orderBy('name')
                ->get(),

            'colors' => Color::where('status', 'Active')
                ->orderBy('name')
                ->get(),

            'sizes' => Size::where('status', 'Active')
                ->orderBy('name')
                ->get(),
        ]);
    }

  public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'name' => 'required|max:255',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'required',
            'colors' => 'required|array',
            'sizes' => 'required|array',
        ]);

        $imageName = null;

        if ($request->hasFile('image')) {

            $imageName = time() . '_' .
                $request->file('image')->getClientOriginalName();

            $request->file('image')->storeAs(
                'products',
                $imageName,
                'public'
            );
        }

        $product = Product::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imageName,
            'status' => $request->status,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        $product->colors()->sync($request->colors);
        $product->sizes()->sync($request->sizes);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product created successfully');
    }

    public function edit(Product $product)
    {
        $product->load('colors', 'sizes');

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,

            'categories' => Category::where('status', 'Active')
                ->orderBy('name')
                ->get(),

            'colors' => Color::where('status', 'Active')
                ->orderBy('name')
                ->get(),

            'sizes' => Size::where('status', 'Active')
                ->orderBy('name')
                ->get(),
        ]);
    }

   public function update(Request $request, Product $product)
    {
        $request->validate([
            'category_id' => 'required',
            'name' => 'required|max:255',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => 'required',
            'colors' => 'required|array',
            'sizes' => 'required|array',
        ]);

        $imageName = $product->image;

        if ($request->hasFile('image')) {

            if (
                $product->image &&
                Storage::disk('public')->exists(
                    'products/' . $product->image
                )
            ) {
                Storage::disk('public')->delete(
                    'products/' . $product->image
                );
            }

            $imageName = time() . '_' .
                $request->file('image')->getClientOriginalName();

            $request->file('image')->storeAs(
                'products',
                $imageName,
                'public'
            );
        }

        $product->update([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $imageName,
            'status' => $request->status,
            'updated_by' => Auth::id(),
        ]);

        $product->colors()->sync($request->colors);
        $product->sizes()->sync($request->sizes);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product updated successfully');
    }
    public function destroy(Product $product)
    {
        $product->update([
            'status' => 'Deleted',
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product deleted successfully');
    }
   public function show(Product $product)
    {
        $product->load(
            'category',
            'colors',
            'sizes'
        );

        return Inertia::render('Admin/Product/Show', [
            'product' => $product
        ]);
    }
}