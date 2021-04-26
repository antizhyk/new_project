<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth')->get('/me', function (Request $request) {
    return response()->json(Auth::user());
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth'], function () {//Если пользователь авторизован
    // Product types routes
    Route::get('/product_type', [ProductTypeController::class, 'get']);
    Route::post('/product_type', [ProductTypeController::class, 'post']);

    // Product routes
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);

    Route::get('/products/{id}', [ProductController::class, 'show']);
    // Route::put('/products/{id}', [ProductController::class, 'update']);
});

//// Used for authentication on the frontend
//Route::get('/profile', [ProfileController::class, 'get']);


