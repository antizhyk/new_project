<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weight extends Model
{
    use HasFactory;
    public function attribute()
    {
        return $this->morphMany(Attribute::class, 'attributable');
    }
}
