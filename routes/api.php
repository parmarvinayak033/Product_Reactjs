<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\SizeController;
use App\Http\Controllers\Api\ColorController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and assigned to the "api"
| middleware group. Build something great!
|
*/

// Example route to test API
Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from API!',
    ]);
});

//product
Route::get('/products/list', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::post('/products/store', [ProductController::class, 'store']);         // insert
Route::put('/products/update/{product}', [ProductController::class, 'update']); // update
Route::delete('/products/delete/{product}', [ProductController::class, 'destroy']); // delete

//category
Route::get('/categories/list', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::post('/categories/store', [CategoryController::class, 'store']);
Route::put('/categories/update/{category}', [CategoryController::class, 'update']);
Route::delete('/categories/delete/{category}', [CategoryController::class, 'destroy']);

//size
Route::get('/sizes/list', [SizeController::class, 'index']);
Route::get('/sizes/{size}', [SizeController::class, 'show']);
Route::post('/sizes/store', [SizeController::class, 'store']);
Route::put('/sizes/update/{size}', [SizeController::class, 'update']);
Route::delete('/sizes/delete/{size}', [SizeController::class, 'destroy']);

//color
Route::get('/colors/list', [ColorController::class, 'index']);
Route::get('/colors/{color}', [ColorController::class, 'show']);
Route::post('/colors/store', [ColorController::class, 'store']);
Route::put('/colors/update/{color}', [ColorController::class, 'update']);
Route::delete('/colors/delete/{color}', [ColorController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return $request->user();
});
