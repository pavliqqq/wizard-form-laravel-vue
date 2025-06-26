<?php

namespace App\Http\Controllers\Form;


use App\Http\Requests\Form\FirstStepRequest;
use App\Http\Requests\Form\SecondStepRequest;
use App\Models\Member;
use App\Services\FileService;

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
        $members = Member::select('id', 'photo', 'first_name', 'last_name', 'report_subject', 'email')->get();
        $result = [];

        foreach ($members as $member) {
            $result[] = [
                'photo' => $member['photo'],
                'full_name' => $member['first_name'] . ' ' . $member['last_name'],
                'report_subject' => $member['report_subject'],
                'email' => $member['email'],
            ];
        }

        return response()->json(['members' => $result]);
    }

    public function secondStep(SecondStepRequest $request)
    {
        $data = $request->validated();

        $id = (int)$data['id'] ?? 0;

        $member = Member::find($id);

        if (!$member) {
            return response()->json(['success' => false, 'error' => 'Invalid member ID']);
        }

        $photoPath = FileService::photoService($request, $member);
        $data['photo'] = $photoPath;

        $member->update($data);
        $count = Member::count();

        return response()->json(['success' => true, 'count' => $count]);
    }
}
