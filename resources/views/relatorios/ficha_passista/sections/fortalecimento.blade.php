<div class="section">
    <div class="section-title">FORTALECIMENTO/REFAZIMENTO</div>
    @include('relatorios.ficha_passista.partials.lista_meta', [
        'itens' => $ficha['tra_fortalecimento']['meta'] ?? [],
        'idKey' => 'for_id_for',
        'activeKey' => 'for_ativo',
        'descriptionKey' => 'for_descricao'
    ])
    <br/>
</div>
