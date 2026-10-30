<div class="section">
    <div class="section-title">CONDIÇÃO ENERGÉTICA OBSERVADA</div>
    @include('relatorios.ficha_passista.partials.lista_meta', [
        'itens' => $ficha['tra_cond_energetica']['meta'] ?? [],
        'idKey' => 'coe_id_coe',
        'activeKey' => 'coe_ativo',
        'descriptionKey' => 'coe_descricao'
    ])
    <br/>
</div>
