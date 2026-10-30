<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Attribute\AsCommand;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Attributes\Description;

#[Signature('app:criar-api {model}')]
#[Description('Cria um Controller API Resource e um Resource para o modelo informado')]
class CriarApi extends Command
{

    public function handle(): int
    {
        $model = $this->argument('model');


        $this->info("Criando Model {$model}...");

        Artisan::call('make:model', [
            'name' => $model,
        ], $this->output);

        $this->info("Criando Controller para {$model}...");

        $controllerResult = Artisan::call('make:controller', [
            'name' => "Api/{$model}Controller",
            '--resource' => true,
            '--model' => $model,
             '--force' => true,
        ], $this->output);

        if ($controllerResult !== 0) {
            $this->error('Falha ao criar o Controller.');

            return self::FAILURE;
        }

        $this->info("Criando Resource para {$model}...");

        $resourceResult = Artisan::call('make:resource', [
            'name' => "{$model}Resource",
        ], $this->output);

        if ($resourceResult !== 0) {
            $this->error('Falha ao criar o Resource.');

            return self::FAILURE;
        }

        $this->info('Controller e Resource criados com sucesso!');

        return self::SUCCESS;
    }

}
