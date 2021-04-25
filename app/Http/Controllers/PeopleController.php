<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\people;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
<<<<<<< HEAD
use  \App\Http\Requests\PeopleRequest;
=======

>>>>>>> 72ffac274e75a58b5f230bd127a97aeef20262ff

class PeopleController extends Controller
{
    public function index(JsonResponse $request)
    {
        dd($request->all());
        return response()->json(people::where());
    }

    public function sendForm(Request $req)
    {
        $peole = new people;
        $peole->email = $req->email;
        $peole->password = $req->password;
        $peole->save();

        return redirect('/');
    }


}
