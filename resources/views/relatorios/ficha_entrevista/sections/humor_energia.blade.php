<div class="section">
    <div class="section-title">HUMOR E ENERGIA</div>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_humor']['meta'] ?? [],
        'idKey' => 'hue_id_hue',
        'activeKey' => 'hue_ativo',
        'descriptionKey' => 'hue_descricao'
    ])
    <br/>
    <strong class="description-label">Descrição:</strong>
    <p class="description">{{ $ficha['fie_desc_humor'] }}</p>
</div>
