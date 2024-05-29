<?php

use App\Http\Controllers\CrudController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('create', [CrudController::class, 'createCrud']);
Route::get('show', [CrudController::class, 'showCrud']);
Route::get('crud/{id}', [CrudController::class, 'Crud']);
Route::put('edit/{id}', [CrudController::class, 'editCrud']);
Route::delete('delete/{id}', [CrudController::class, 'deleteCrud']);
Route::get('/search', [CrudController::class, 'searchCrud']);
