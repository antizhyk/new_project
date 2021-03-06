<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Color;
use App\Models\Dualsim;
use App\Models\Price;
use App\Models\Product;
use App\Models\Attribute;
use App\Models\ProductType;
use App\Models\Videocard;
use App\Models\Weight;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::paginate(3);

        $res = [];


        for ($i = 0; $i < count($products); ++$i) {
            $product = $products[$i];
            $res[$i] = ['Name' => $product->name, 'Type' => ProductType::find($product->product_type_id), 'Id' => $product->id];
            $attributes = $product->productType->attributes()->get();
            foreach ($attributes as $attribute) {
                $model = $attribute->attributable_type;
                $type = substr($model, strrpos($model, '\\') + 1);

                $res[$i][$type] = $attribute->attributable->value;
            }
        }

        return $res;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        // Create product
        $product = new Product();
        $product->name = $request->name;
        $product->product_type_id = $request->type_id;
        $product->save();

        $attributes = [
            ['class' => Weight::class, 'value' => $request->weight],
            ['class' => Price::class, 'value' => $request->price],
            ['class' => Color::class, 'value' => $request->color],
            ['class' => Videocard::class, 'value' => $request->videocard],
            ['class' => Dualsim::class, 'value' => $request->dualsim],
        ];

        foreach ($attributes as $attrib) {
            $attribute = new Attribute();
            $attribute->product_type_id = $request->type_id;
            $attribute->product_id = $product->id;

            $new_attrib = new $attrib['class']();
            $new_attrib->value = $attrib['value'];
            $new_attrib->save();
            $new_attrib->attribute()->save($attribute);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        // If product isn't stored, return empty result
        if (!$product) return [];

        $res = ['Name' => $product->name, 'Type' => ProductType::find($product->product_type_id), 'Id' => $product->id];

        $attributes = $product->productType->attributes()->get();
        foreach ($attributes as $attribute) {
            $model = $attribute->attributable_type;
            $type = substr($model, strrpos($model, '\\') + 1);

            $res[$type] = $attribute->attributable->value;
        }

        return $res;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        // Update product
        // $product = Product::find($id);

        // if (!$product) return response("Couldn't find product with the given id")->status(404);

        // $product->name = $request->name;
        // $product->product_type_id = $request->type_id;
        // $product->save();

        // $savedAttrib = $product->attributes();

        // foreach ($attributes as $attrib) {
        //     $attribute->product_type_id = $request->type_id;
        //     $attribute->product_id = $product->id;

        //     $new_attrib = new $attrib['class']();
        //     $new_attrib->value = $attrib['value'];
        //     $new_attrib->save();
        //     $new_attrib->attribute()->save($attribute);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return [];
        }

        foreach ($product->attributes()->get() as $attribute) {
            $attribute->attributable->delete();
        }

        $product->delete();
    }
}
