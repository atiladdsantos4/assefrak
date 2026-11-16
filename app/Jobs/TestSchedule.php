<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class TestSchedule implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
       file_put_contents(
            storage_path('logs/test-schedule.txt'),
            now() . PHP_EOL,
            FILE_APPEND
        );

       logger()->info('TestSchedule executed: ' . now());
       //logger()->info('TestSchedule executed: ' . now());
    }
}
