<?php

namespace App\Http\Controllers\Admin;


use App\Http\Requests\Form\FirstStepRequest;
use App\Http\Requests\Form\SecondStepRequest;
use App\Models\Member;

class AdminController
{
    public function delete(Member $member)
    {
        $member->delete();

        return response([]);
    }
}
