@extends('layouts.app')

@section('content')

<legend>Podgląd puszki <a href="{{ url()->previous() }}" class="btn btn-default pull-right">Wróć do poprzedniej strony</a></legend>

<table class="table table-striped table-hover">
    <tbody>
    <tr>
        <td>Wolontariusz</td>
        <td>{{ $box->collector->firstName }} {{ $box->collector->lastName }}</td>
    </tr>
    <tr>
        <td>Numer identyfikatora</td>
        <td>{{ $box->collectorIdentifier }}</td>
    </tr>
    <tr>
        <td>Numer na puszce</td>
        <td>{{ $box->boxNumber }}/{{ $box->collectorIdentifier }}</td>
    </tr>
    <tr>
        <td>Status</td>
        @if($box->is_confirmed)
            <td>Rozliczona</td>
        @elseif($box->is_counted)
            <td>Oczekuje na potwierdzenie</td>
        @elseif($box->is_given_to_collector)
            <td>Wydana wolontariuszowi</td>
        @endif
    </tr>
    </tbody>
</table>

<table class="table table-striped table-hover">
    <tbody>
    <tr>
        <td>Ilość monet 1gr</td>
        <td>{{ $box->count_1gr }}</td>
    </tr>
    <tr>
        <td>Ilość monet 2gr</td>
        <td>{{ $box->count_2gr }}</td>
    </tr>
    <tr>
        <td>Ilość monet 5gr</td>
        <td>{{ $box->count_5gr }}</td>
    </tr>
    <tr>
        <td>Ilość monet 10gr</td>
        <td>{{ $box->count_10gr }}</td>
    </tr>
    <tr>
        <td>Ilość monet 20gr</td>
        <td>{{ $box->count_20gr }}</td>
    </tr>
    <tr>
        <td>Ilość monet 50gr</td>
        <td>{{ $box->count_50gr }}</td>
    </tr>
    <tr>
        <td>Ilość monet 1zł</td>
        <td>{{ $box->count_1zl }}</td>
    </tr>
    <tr>
        <td>Ilość monet 2zł</td>
        <td>{{ $box->count_2zl }}</td>
    </tr>
    <tr>
        <td>Ilość monet 5zł</td>
        <td>{{ $box->count_5zl }}</td>
    </tr>
    <tr>
        <td>Ilość banknotów 10zł</td>
        <td>{{ $box->count_10zl }}</td>
    </tr>
    <tr>
        <td>Ilość banknotów 20zł</td>
        <td>{{ $box->count_20zl }}</td>
    </tr>
    <tr>
        <td>Ilość banknotów 50zł</td>
        <td>{{ $box->count_50zl }}</td>
    </tr>
    <tr>
        <td>Ilość banknotów 100zł</td>
        <td>{{ $box->count_100zl }}</td>
    </tr>
    <tr>
        <td>Ilość banknotów 200zł</td>
        <td>{{ $box->count_200zl }}</td>
    </tr>
    <tr>
        <td>Ilość banknotów 500zł</td>
        <td>{{ $box->count_500zl }}</td>
    </tr>
    <tr>
        <td>Ilość Euro</td>
        <td>{{ $box->amount_EUR }} EUR</td>
    </tr>
    <tr>
        <td>Ilość Funtów Brytyjskich</td>
        <td>{{ $box->amount_GBP }} GBP</td>
    </tr>
    <tr>
        <td>Ilość Dolarów Amerykańskich</td>
        <td>{{ $box->amount_USD }} USD</td>
    </tr>
    <tr>
        <td>Inne</td>
        <td>{{ $box->comment }}</td>
    </tr>
    <tr>
        <td>Ilość Polskich Złotych (bez walut obcych)</td>
        <td>{{ $box->amount_PLN }} PLN</td>
    </tr>
    </tbody>
</table>
@endsection