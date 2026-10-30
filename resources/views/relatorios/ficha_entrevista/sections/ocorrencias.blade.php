
<div class="section">

    <div class="section-title">
        INFORMAÇÕES E OCORRÊNCIAS DURANTE OS PASSES
    </div>

    <div class="movimentacao-box">

        <div class="movimentacao-title">
            MOVIMENTAÇÃO
        </div>

        <table class="movimentacao-table">

            <thead>
                <tr>
                    <th class="col-tipo">Tipo Ocorrência</th>
                    <th class="col-descricao">Descrição do Evento</th>
                    <th class="col-data">Data</th>
                </tr>
            </thead>

            <tbody>
                @forelse($ocorrencia as $item)
                    <tr>
                        <td class="tipo">
                            {{ optional($item->tipoocorrencia)->top_descricao ?? 'Não informado' }}
                        </td>

                        <td class="descricao">
                            {{ $item->ocp_descricao }}
                        </td>

                        <td class="data">
                            {{ $item->ocp_created_at
                                ? \Carbon\Carbon::parse($item->ocp_created_at)->format('d/m/Y')
                                : '-' }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" class="sem-registros">
                            Não há registros de ocorrências.
                        </td>
                    </tr>
                @endforelse
            </tbody>

        </table>

    </div>

</div>
