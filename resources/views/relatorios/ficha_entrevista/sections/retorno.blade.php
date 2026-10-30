
<div class="section">

    <div class="section-title">
        AVALIAÇÃO
    </div>

    <div class="movimentacao-box">

        <div class="movimentacao-title">
            MOVIMENTAÇÃO
        </div>

        <table class="movimentacao-table">
            <thead>
                <tr>
                    <th class="col-tipo">Sequência</th>
                    <th class="col-tipo">Colaborador</th>
                    <th class="col-descricao">Descrição do Evento</th>
                    <th class="col-data">Data Retorno</th>
                    <th class="col-data">Criado em</th>
                </tr>
            </thead>

            <tbody>
                @forelse($retorno as $item)
                    <tr>
                       <td class="tipo">
                            {{ ($item->fir_sequencia ?? 'Não informado') . 'º RETORNO' }}
                       </td>

                       <td class="tipo">
                            {{ optional($item->colaborador)->col_name ?? 'Não informado' }}
                        </td>

                        <td class="descricao">
                            {{ $item->fir_observacao }}
                        </td>

                        <td class="descricao">
                            {{ $item->fir_data_retorno }}
                        </td>

                        <td class="data">
                            {{ $item->fir_created_at
                                ? \Carbon\Carbon::parse($item->fir_created_at)->format('d/m/Y')
                                : '-' }}
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="sem-registros">
                            Não há registros de ocorrências.
                        </td>
                    </tr>
                @endforelse
            </tbody>

        </table>

    </div>

</div>
