<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;
    public function attributable()
    {
        return $this->morphTo();
    }

//    public function productType(){
//        return $this->hasOne(ProductType::class, 'id');
//    }

    public function productType(){
        return $this->belongsTo(ProductType::class);
    }

    public function price(){
        return $this->hasOne(Price::class, 'id', 'attributable_id');
    }

    public function colors(){
        return $this->hasOne(Color::class, 'id', 'attributable_id');
    }
    public function dualsim(){
        return $this->hasOne(Dualsim::class, 'id', 'attributable_id');
    }
    public function weight(){
        return $this->hasOne(Weight::class, 'id', 'attributable_id');
    }

    public function video(){
        return $this->hasOne(Videocard::class, 'id', 'attributable_id');
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
