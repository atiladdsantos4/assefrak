<div class="section">
    <div class="section-title">INDICADORES DE GRAVIDADE</div>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_gravidade']['meta'] ?? [],
        'idKey' => 'gac_id_gac',
        'activeKey' => 'gac_ativo',
        'descriptionKey' => 'gac_descricao'
    ])
    <br/>
    <strong class="description-label">Descrição:</strong>
    <p class="description">{{ $ficha['fie_desc_gravidade'] }}</p>
</div>
