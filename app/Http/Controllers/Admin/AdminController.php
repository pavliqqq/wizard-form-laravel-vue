<?php

namespace App\Http\Controllers\Admin;


use App\Http\Requests\Admin\MemberUpdateRequest;
use App\Models\Member;
use App\Services\FileService;

class AdminController
{
    public function update(MemberUpdateRequest $request, Member $member)
    {
        $data = $request->validated();

        $nameParts = preg_split('/\s+/', trim($data['full_name']));

        $data['first_name'] = $nameParts[0];
        $data['last_name'] = $nameParts[1];
        unset($data['full_name']);

        $photoPath = FileService::photoService($request, $member);
        $data['photo'] = $photoPath;

        $member->update($data);

        return response()->json(['success' => true]);
    }

    public function toggleVisibility(Member $member)
    {
        $member->visibility = !$member->visibility;
        $member->save();

        return response()->json([
            'success' => true,
            'visible' => $member->visibility,
        ]);
    }

    public function delete(Member $member)
    {
        $member->delete();

        return response()->json(['success' => true]);
    }
}
