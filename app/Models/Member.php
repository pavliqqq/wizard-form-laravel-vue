<?php

namespace App\Models;

use App\Observers\DeleteOldFilesObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([DeleteOldFilesObserver::class])]
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
        'visibility'
    ];
}
