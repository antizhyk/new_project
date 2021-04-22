<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
     public function addProduct(Request $req)
        {
            $peole = new Product;
            $peole->email = $req->email;
            $peole->password = $req->password;
            $peole->save();

            return redirect('/');
        }
}
