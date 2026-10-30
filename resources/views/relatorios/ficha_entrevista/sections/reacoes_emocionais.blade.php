<div class="section">
    <div class="section-title">REAÇÕES EMOCIONAIS</div>
    <strong>Reativos</strong>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_reativos']['meta'] ?? [],
        'idKey' => 'cpr_id_cpr',
        'activeKey' => 'cpr_ativo',
        'descriptionKey' => 'cpr_descricao'
    ])
    <br/>
    <strong class="description-label">Descrição dos reativos:</strong>
    <p class="description">{{ $ficha['fie_desc_reativos'] }}</p>
    <hr>
    <strong>Passivos</strong>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_passivos']['meta'] ?? [],
        'idKey' => 'cpp_id_cpp',
        'activeKey' => 'cpp_ativo',
        'descriptionKey' => 'cpp_descricao'
    ])
    <br/>
    <strong class="description-label">Descrição dos passivos:</strong>
    <p class="description">{{ $ficha['fie_desc_passivos'] }}</p>
</div>
