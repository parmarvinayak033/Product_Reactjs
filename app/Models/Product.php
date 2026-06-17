<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'status',
        'created_by',
        'updated_by',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function colors()
    {
        return $this->belongsToMany(
            Color::class,
            'product_colors'
        );
    }

    public function sizes()
    {
        return $this->belongsToMany(
            Size::class,
            'product_sizes'
        );
    }
}