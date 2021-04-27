<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
 * @package App\Models
 */
class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

//    public function attributes()
//    {
//        return $this->morphMany(Attribute::class, 'attributable');
//    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }
    public function attributes()
    {
        return $this->hasMany(Attribute::class, 'product_id', 'id');
    }
}
