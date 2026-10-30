<div class="section">
    <div class="section-title">CONDIÇÕES PERCEBIDAS</div>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_percebidas']['meta'] ?? [],
        'idKey' => 'cor_id_cor',
        'activeKey' => 'cor_ativo',
        'descriptionKey' => 'cor_descricao'
    ])
    <br/>
    <strong class="description-label">Descrição:</strong>
    <p class="description">{{ $ficha['fie_desc_percebidas'] }}</p>
</div>
