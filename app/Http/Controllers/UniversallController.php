<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Attribute;
use App\Models\Price;
use App\Models\Videocard;
use App\Models\Weight;
use App\Models\Color;
use App\Models\Dualsim;





class UniversallController extends Controller

{

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function __invoke()
    {
        $products = Product::first();
//       $products->productType->attributes()->get()->each(function ($value) {
//            dd($value->colors->toArray(), $value->price->toArray());
//        });
//        dd($products->attributes()->first()->productType()->get());
//        $products = ProductType::findOrFail(1)->attributes  ;

        $products = Attribute::first()->productType;
        dd($products);
      return response()->json(Product::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
//        $product = new Product();
//        $product->name='iphoneXR';
//        $product->productType()->associate(ProductType::first());

        $attribute = new Attribute();//Создаем объект который нследует модель Атрибут, в которой у меня и прописаны связи
        //first() возвращает
        $attribute->productType()->associate(ProductType::first());//вызываем связующий метод и сохраняем
        $attribute->product()->associate(Product::find(3));//заданный id тоже для примера
        Color::find(2)->attribute()->save($attribute);//это пример
        dd($attribute->toArray());
//        $product->productType->attributes()
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
