<div class="section">
    <div class="section-title">LIMPEZA E DESOBSESSÃO</div>
    @include('relatorios.ficha_passista.partials.lista_meta', [
        'itens' => $ficha['tra_limpeza']['meta'] ?? [],
        'idKey' => 'lim_id_lim',
        'activeKey' => 'lim_ativo',
        'descriptionKey' => 'lim_descricao'
    ])
    <br/>
</div>
