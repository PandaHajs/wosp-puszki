@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <h1 style="text-align: center;font-size: 3em">
            Zebraliśmy (razem z walutami obcymi):<br>
            <span style="">{{ \App\totalCollected() }}zł</span>
        </h1>
        <br>
    </div>
    <div class="row">
        <div class="col-sm-6" id="puszka-daj">
            {{-- Przycisk "Wydaj puszkę" --}}
            <a class="btn btn-success btn-lg btn-block" href="{{ route('box.create') }}">
                Wydaj puszkę wolontariuszowi
            </a>
        </div>
        <div class="col-sm-6" id="puszka-rozlicz">
            {{-- Przycisk "Rozlicz puszkę" --}}
            <a class="btn btn-info btn-lg btn-block" href="{{ route('box.find') }}">
                Rozlicz puszkę
            </a>
        </div>
    </div>
</div>
@endsection