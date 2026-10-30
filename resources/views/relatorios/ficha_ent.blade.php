<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Teste da ficha</title>
</head>
<body>
    <h1>Teste da Ficha de Entrevista</h1>

    <p>Ficha: {{ $ficha->fie_id_fie }}</p>
    <p>Data: {{ $ficha->fie_created_at?->format('d/m/Y H:i') }}</p>
    <p>Acolhido: {{ $ficha->acolhido->aco_name ?? '' }}</p>
    <p>Colaborador: {{ $ficha->colaborador->col_name ?? '' }}</p>
</body>
</html>
