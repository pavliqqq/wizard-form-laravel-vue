<?php

namespace App\Providers;

use App\Models\Member;
use App\Observers\DeleteOldFilesObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->singleton(DeleteOldFilesObserver::class, function () {
            return new DeleteOldFilesObserver(['photo'], config('file.defaultImagePath'));
        });
    }

    public function boot()
    {
        Member::observe(app(DeleteOldFilesObserver::class));
    }
}
