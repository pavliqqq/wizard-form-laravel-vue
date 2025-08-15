<?php
function memberData(array $overrides = []): array
{
    return array_merge([
        'first_name' => 'David',
        'last_name' => 'Test',
        'birthdate' => '1990-01-01',
        'report_subject' => 'Web Technologies',
        'phone' => '+380991112233',
        'country' => 'UA',
        'email' => 'david@gmail.com',
        'company' => 'TechCorp',
        'position' => 'Developer',
        'about_me' => '',
        'photo' => null,
        'visibility' => true,
    ], $overrides);
}
