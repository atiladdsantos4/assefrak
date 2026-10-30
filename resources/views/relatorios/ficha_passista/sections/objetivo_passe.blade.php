<div class="section">
    <div class="section-title">OBJETIVO DO PASSE</div>
    @include('relatorios.ficha_passista.partials.lista_meta', [
        'itens' => $ficha['tra_passe']['meta'] ?? [],
        'idKey' => 'pas_id_pas',
        'activeKey' => 'pas_ativo',
        'descriptionKey' => 'pas_descricao'
    ])
    <br/>
</div>
