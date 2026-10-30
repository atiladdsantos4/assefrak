<div class="section">
    <div class="section-title">ALERTAS DE SEGURANÇA (Reações do corpo físico)</div>
    @include('relatorios.ficha_passista.partials.lista_meta', [
        'itens' => $ficha['tra_alerta']['meta'] ?? [],
        'idKey' => 'ale_id_ale',
        'activeKey' => 'ale_ativo',
        'descriptionKey' => 'ale_descricao'
    ])
    <br/>
</div>
