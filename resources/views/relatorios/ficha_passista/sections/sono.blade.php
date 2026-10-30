<div class="section">
    <div class="section-title">SONO</div>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_sono']['meta'] ?? [],
        'idKey' => 'cos_id_cos',
        'activeKey' => 'cos_ativo',
        'descriptionKey' => 'cos_descricao'
    ])
    <br/>
    <strong class="description-label">Descrição:</strong>
    <p class="description">{{ $ficha['fie_desc_sono'] }}</p>
</div>
