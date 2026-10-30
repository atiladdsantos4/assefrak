<div class="section">
    <div class="section-title">FOCO ENERGÉTICO</div>
    @include('relatorios.ficha_passista.partials.lista_meta', [
        'itens' => $ficha['tra_foco_energetico']['meta'] ?? [],
        'idKey' => 'foc_id_foc',
        'activeKey' => 'foc_ativo',
        'descriptionKey' => 'foc_descricao'
    ])
    <br/>
</div>
