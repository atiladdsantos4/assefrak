@php
    $colunas = 2;
@endphp
<table class="item-list">
    @foreach(array_chunk($itens, $colunas) as $linha)
        <tr>
            @foreach($linha as $item)
                <td style="width:50%;">
                    <span class="mark">
                        <img
                            src="{{ public_path('assets/img/' . (($item[$activeKey] ?? false) ? 'check.png' : 'uncheck.png')) }}"
                            style="width: 12px; height: 12px; position:relative; top:5px;"
                            alt=""
                        >
                    </span>&nbsp;
                    <span class="{{ ($item[$activeKey] ?? false) ? 'checked' : '' }}">{{ $item[$descriptionKey] ?? '' }}</span>
                </td>
            @endforeach
            @if(count($linha) < $colunas)
                <td style="width:50%;"></td>
            @endif
        </tr>
    @endforeach
</table>
