<?php

namespace App\Http\Controllers\Form;


use App\Http\Requests\Form\FirstStepRequest;
use App\Http\Requests\Form\SecondStepRequest;
use App\Models\Member;

class FormController
{
    public function firstStep(FirstStepRequest $request)
    {
        $data = $request->validated();

        $member = Member::where('email', $data['email'])->first();

        if ($member) {
            $member->update($data);
        } else {
            $member = Member::create($data);
        }

        $id = $member->id;

        return response()->json(['success' => true, 'id' => $id]);
    }

    public function getAllMembers()
    {
        $members = Member::all();

        foreach ($members as $member) {
            $member['full_name'] = $member['first_name'] . ' ' . $member['last_name'];
        }

        return $members;
    }

    public function secondStep(SecondStepRequest $request)
    {
        $data = $request->validated();

        $id = (int)$data['id'] ?? 0;

        $member =  Member::find($id);

        if (!$member) {
            return response()->json(['success' => false, 'error' => 'Invalid member ID']);
        }

        $member->update($data);
        $count = Member::count();

        return response()->json(['success' => true, 'count' => $count]);
    }
}
