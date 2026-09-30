<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\PrecoLivro;

class datavigorExist implements ValidationRule
{
    private $datavigor;
    private $livro;

    public function __construct($datavigor,$livro){
       $this->datavigor = $datavigor;
       $this->livro = $livro;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $teste = $value;
        $exist = PrecoLivro::where('prl_data_vigor',$this->datavigor)
        ->where('prl_id_liv',$this->livro)
        ->exists(); //
        if($exist) {
            $fail('Preço já existente para data de vigor informada');
        }
    }
}
/*
        public function passes($attribute, $value)
        {
            // Your validation logic here
            $existe = Escopo::where('esc_posicao',$value)->exists();
            return $existe == false;
            //$value == 'escopo_posicao';
        }

        public function message()
        {
            return 'A posição do escopo já foi definida';
        }
*/
