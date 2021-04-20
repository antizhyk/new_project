<?php

namespace App\Http\Controllers;

use App\Models\people;
use Illuminate\Http\JsonResponse;

class PeopleController extends Controller
{
    public function index() :JsonResponse
    {
        return response()->json(people::all());
    }
}
