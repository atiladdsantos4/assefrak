<div class="section">
    <div class="section-title">ORIENTAÇÕES E ENCAMINHAMENTOS</div>
    <strong>Dia(s) de passe</strong>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_diapasse']['meta'] ?? [],
        'idKey' => 'dip_id_dip',
        'activeKey' => 'dip_ativo',
        'descriptionKey' => 'dip_descricao'
    ])
    <hr>
    <br/>
    <strong>Orientações para casa</strong>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_orientacoes_casa']['meta'] ?? [],
        'idKey' => 'orc_id_orc',
        'activeKey' => 'orc_ativo',
        'descriptionKey' => 'orc_descricao'
    ])
    <hr>
    <br/>
    <strong>Orientações externas / encaminhamentos</strong>
    @include('relatorios.ficha_entrevista.partials.lista_meta', [
        'itens' => $ficha['fie_orientacoes_externa']['meta'] ?? [],
        'idKey' => 'ori_id_ori',
        'activeKey' => 'ori_ativo',
        'descriptionKey' => 'ori_descricao'
    ])
</div>
