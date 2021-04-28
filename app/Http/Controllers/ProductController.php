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
use Illuminate\Database\Eloquent\Model;
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
        $products = Product::paginate(3);//Получаю первые три записи

        $res = [];//Создаю массив для добавления


        for ($i = 0; $i < count($products); ++$i) {
            $product = $products[$i];//Создаю переменную в которую вкладываю значение продукта
            $res[$i] = ['Name' => $product->name, 'Type' => ProductType::find($product->product_type_id), 'Id' => $product->id]; //В массив для добавления
            //Добавля массив из имени продукта, типа продукта (который нахожу по ключу), id продукта
            $attributes = $product->productType->attributes()->get();//В эту переменную устанавливаю атрибуты товара, добавляя их
            // через функцию связи таблицы attributes()

            foreach ($attributes as $attribute) {//Далее я начинаю их перебирать
                $model = $attribute->attributable_type;//находим по id названия атрибутов и их значения и добавляем в переменную
                $type = substr($model, strrpos($model, '\\') + 1);
                $res[$i][$type] = $attribute->attributable->value; //значения атрибутов в массив для добавления
            }
        }
        //dd($res);
        return $res;//возвращаем массив продуктов с атрибутами
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
dd($request->color);
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
    public function show(Request $request)
    {

        $search = $request->search;
        $product = Product::query()->where('name', 'LIKE', $search)->firstOrFail();
        $productName = $product->name;
        $productId = $product->id;
        $proustType = $product->productType;
        $attributes = $product->attributes;
        $attributableId = $attributes[0]->attributable_id;
        $weight = Weight::find(12)->value('value');
        $color = Color::find(12)->value('value');
        $price = Price::find(12)->value('value');
        $dualSim = Dualsim::find(12)->value('value');
        $video = Videocard::find(12)->value('value');
        //dd([$weight, $color, $price, $dualSim, $video]);
        $res = [
            'Name' => $productName,
            'Type' => $proustType,
            'Id' => $productId,
            'Weight' => $weight,
            'Color' => $color,
            'Videocard' => $video,
            'Dualsim' => $dualSim
            ];
        //dd($res);

        return $res;
    }
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
        $product = Product::find($id);//Находит продукт по id
        if (!$product) {
            return [];//если такого нет то возвращает ничего
        }

        foreach ($product->attributes()->get() as $attribute) {
            $attribute->attributable->delete();//если есть то сначала ищем и убираем атрибуты
        }

        $product->delete();//а затем удаляем сам продукт
    }
}
