<?php

namespace App\Http\Controllers\Member;


use App\Http\Requests\Member\StoreRequest;
use App\Http\Requests\Member\UpdateRequest;
use App\Models\Member;

class MemberController
{
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $member = Member::create($data);

        return $member;
    }

    public function index()
    {
        $members = Member::all();

        foreach ($members as $member) {
            $member['full_name'] = $member['first_name'] . ' ' . $member['last_name'];
        }

        return $members;
    }

    public function update(UpdateRequest $request, Member $member)
    {
        $data = $request->validated();
        $fullname = explode(' ', $data['full_name']);
        $data['first_name'] = $fullname[0];
        $data['last_name'] = $fullname[1];
        unset($data['full_name']);

        $member->update($data);
        return $member;
    }

    public function delete(Member $member)
    {
        $member->delete();

        return response([]);
    }
}
