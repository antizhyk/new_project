<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $data['image'] = $this->imageSaver->upload($request, null, 'product');
        $product = Product::create($data);
        return redirect()->route('admin.product.show', ['product' => $product->id])->with('success', 'Новый товар успешно создан');
    }


    //public static function getProductType () {
    // $types = model\ProductType::all();
    // if ($request->product_type == $types[$request->product_type) {
    // retun static::$type id;
    //}
    //
}
