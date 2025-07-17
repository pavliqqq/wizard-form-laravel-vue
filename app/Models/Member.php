<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'birthdate',
        'report_subject',
        'phone',
        'country',
        'email',
        'company',
        'position',
        'about_me',
        'photo',
        'visibility',
    ];
}
