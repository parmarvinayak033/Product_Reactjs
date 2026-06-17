<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = [
        'name',
        'status',
        'created_by',
        'updated_by',
    ];

    public function products()
    {
        return $this->belongsToMany(
            Product::class,
            'product_sizes'
        );
    }
}