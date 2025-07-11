<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Member\StoreMemberRequest;
use App\Http\Requests\Member\UpdateMemberRequest;
use App\Models\Member;
use App\Services\FileService;
use Spatie\QueryBuilder\QueryBuilder;

class MemberController
{
    public function store(StoreMemberRequest $request)
    {
        $photoPath = FileService::photoService($request);

        $data = $request->validated();
        $data['photo'] = $photoPath;

        $member = Member::create($data);

        return response()->json(['success' => true, 'id' => $member->id, 'email' => $member->email]);
    }

    public function update(UpdateMemberRequest $request, Member $member)
    {
        $photoPath = FileService::photoService($request);

        $data = $request->validated();

        $data['photo'] = $photoPath;

        $member->update($data);
        $count = Member::count();

        return response()->json(['success' => true, 'count' => $count]);
    }

    public function index()
    {
        $members = QueryBuilder::for(Member::class)
            ->allowedFilters('visibility')
            ->select('id', 'photo', 'first_name', 'last_name', 'report_subject', 'email', 'visibility')
            ->get();

        $result = [];

        foreach ($members as $member) {
            $result[] = [
                'id' => $member['id'],
                'photo' => $member['photo'],
                'full_name' => $member['first_name'].' '.$member['last_name'],
                'report_subject' => $member['report_subject'],
                'email' => $member['email'],
                'visibility' => $member['visibility'],
            ];
        }

        return response()->json(['success' => true, 'members' => $result]);
    }

    public function sharePage()
    {
        $shareConfig = config('share');
        $appConfig = config('app');

        $shareUrl = $appConfig['url'];

        $tweetText = $shareConfig['tweetText'];

        $facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u='.urlencode($shareUrl);
        $twitterUrl = 'https://twitter.com/intent/tweet?text='.urlencode($tweetText).'&url='.urlencode($shareUrl);

        return response()->json(['success' => true, 'facebookUrl' => $facebookUrl, 'twitterUrl' => $twitterUrl]);
    }

    public function toggleVisibility(Member $member)
    {
        $member->visibility = ! $member->visibility;
        $member->save();

        return response()->json([
            'success' => true,
            'visible' => $member->visibility,
        ]);
    }

    public function destroy(Member $member)
    {
        $member->delete();

        return response()->json(['success' => true]);
    }
}
