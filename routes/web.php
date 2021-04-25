<?php

use App\Http\Controllers\UniversallController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Events\Logout;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//Route::get('/', function () {
//    return view('welcome');
//});
//Auth::routes();
Route::get('/', function () {
    return view('welcome');
})->middleware(['auth'])->name('/');


Route::get('/login', function () {
    return view('welcome');
});
Route::get('/show', UniversallController::class);
Route::post('/show', [UniversallController::class, 'create']);

require __DIR__.'/auth.php';
