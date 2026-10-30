<header>
    <div style="text-align:center;">
        <img class="banner-entrevista" src="{{ public_path('assets/img/logo_passista.png') }}" alt="Logo">
    </div>
    <div class="rule"></div>
    <div style="text-align:right;" class="small">
        Emissão: {{ \Carbon\Carbon::now()->format('d/m/Y H:i:s') }}
    </div>
</header>
