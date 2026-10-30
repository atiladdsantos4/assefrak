<div class="section" style="margin-top:5px;">
    <div class="section-title">IDENTIFICAÇÃO</div>

    <table class="grid">
        <tr>
            <th>Ficha:</th>
            <td>{{ $ficha->fie_id_fie }}</td>
            <th>Data:</th>
            <td>{{ $ficha->fie_created_at?->format('d/m/Y H:i') ?? '' }}</td>
        </tr>
        <tr>
            <th>Acolhido(a):</th>
            <td colspan="3">{{ $ficha->acolhido?->aco_name ?? '' }}</td>
        </tr>
        <tr>
            <th>Nascimento:</th>
            <td>{{ $ficha->acolhido?->aco_nascimento ?? '' }}</td>
            <th>Idade:</th>
            <td>{{ $ficha->acolhido?->aco_idade ?? '' }}</td>
        </tr>
        <tr>
            <th>Telefone:</th>
            <td>{{ $ficha->acolhido?->aco_telefone ?? '' }}</td>
            <th>E-mail:</th>
            <td>{{ $ficha->acolhido?->aco_email ?? '' }}</td>
        </tr>
        <tr>
            <th>Entrevistador(a):</th>
            <td colspan="3">{{ $ficha->colaborador?->col_name ?? '' }}</td>
        </tr>
        <tr>
            <th>Título/Função:</th>
            <td colspan="3">{{ $ficha->colaborador?->col_titulo ?? '' }}</td>
        </tr>
        <tr>
            <th>Motivo:</th>
            <td colspan="3">{{ $ficha->fie_motivo ?? '' }}</td>
        </tr>
    </table>
</div>

