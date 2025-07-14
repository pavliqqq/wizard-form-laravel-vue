<?php

namespace App\Console\Commands;

use App\Services\FileService;
use Illuminate\Console\Command;

class CopyDefaultImage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:default-image';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copy default image to storage';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        FileService::defaultImageCopy();
        $this->info('Default image copied successfully or already exists.');

        return self::SUCCESS;
    }
}
