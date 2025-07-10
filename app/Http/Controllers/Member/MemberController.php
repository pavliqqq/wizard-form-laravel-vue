<?php

namespace App\Http\Controllers\Member;


use App\Http\Requests\Form\StoreMemberRequest;
use App\Http\Requests\Form\UpdateMemberRequest;
use App\Models\Member;
use App\Services\AuthService;
use App\Services\FileService;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class MemberController
{
    public function store(StoreMemberRequest $request)
    {
        $photoPath = FileService::photoService($request);

        $data = $request->validated();
        $data['photo'] = $photoPath;

        $member = Member::create($data);

        return response()->json(['id' => $member->id]);
    }

    public function update(UpdateMemberRequest $request, Member $member)
    {
        $photoPath = FileService::photoService($request);

        $data = $request->validated();

        $data['photo'] = $photoPath;

        $member->update($data);
        $count = Member::count();

        return response()->json(['count' => $count]);
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
                'full_name' => $member['first_name'] . ' ' . $member['last_name'],
                'report_subject' => $member['report_subject'],
                'email' => $member['email'],
            ];
        }

        return response()->json(['members' => $result]);
    }


    public function thirdStep()
    {
        $shareConfig = config('share');
        $appConfig = config('app');

        $shareUrl = $appConfig['url'];

        $tweetText = $shareConfig['tweetText'];

        $facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' . urlencode($shareUrl);
        $twitterUrl = 'https://twitter.com/intent/tweet?text=' . urlencode($tweetText) . '&url=' . urlencode($shareUrl);

        return response()->json(['facebookUrl' => $facebookUrl, 'twitterUrl' => $twitterUrl]);
    }
}
