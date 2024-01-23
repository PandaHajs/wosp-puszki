<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Wosp') }}</title>

    <script type="text/javascript" src="{{ asset('js\jquery-3.2.1.min.js') }}"></script>
    <!-- Styles -->
    @vite(['resources/sass/app.scss'])
    @yield('styles')
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/liczymy') }}">
                        <img src="{{ asset('images/logo_wosp.png') }}" height="30px">
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="{{ route('main') }}">Strona główna</a></li>

                        <!-- Authentication Links -->
                        @guest
                            <li><a href="{{ route('login') }}">Logowanie</a></li>
                        @else

                            @if(Auth::user()->hasAnyRole(['admin', 'superadmin']))
                                <li>
                                    <a href="{{ route('box.verify.list') }}">
                                        <b>Przeliczone puszki</b>
                                    </a>
                                </li>
                            @endif
                            @if(Auth::user()->hasAnyRole(['collectorcoordinator', 'admin', 'superadmin']))

                                {{-- Użytkownicy --}}
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                                        Administracja <span class="caret"></span>
                                    </a>

                                    <ul class="dropdown-menu">
                                        @if(Auth::user()->hasAnyRole(['superadmin']))
                                            <li>
                                                <a href="{{ route('user.create') }}">
                                                    Dodaj użytkownika
                                                </a>

                                            </li>
                                            <li>
                                                <a href="{{ route('user.list') }}">
                                                    Lista użytkowników
                                                </a>
                                            </li>
                                        @endif
                                        <li>
                                            <a href="{{ route('logs.all') }}">
                                                Logi
                                            </a>
                                        </li>
                                        <li class="divider"></li>
                                        {{-- Wolontariusze --}}
                                        <li>
                                            <a href="{{ route('collector.list') }}">
                                                Lista wolontariuszy
                                            </a>
                                        </li>
                                        @if(Auth::user()->hasAnyRole(['superadmin']))
                                        <li>
                                            <a href="{{ route('collector.create') }}">
                                                Dodaj wolontariusza
                                            </a>
                                        </li>
                                        @endif
                                    </ul>
                                </li>
                            @endif
                            {{-- Puszki --}}
                                @if(Auth::user()->hasAnyRole(['collectorcoordinator', 'admin', 'superadmin']))

                                <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                                    Puszki <span class="caret"></span>
                                </a>

                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="{{ route('box.create') }}">
                                                Wydaj puszkę
                                            </a>
                                            <a href="{{ route('box.find') }}">
                                                Rozlicz puszkę
                                            </a>
                                            {{-- Dla adminów --}}
                                            <a href="{{ route('box.list') }}">
                                                Wszystkie puszki
                                            </a>
                                            <a href="{{ route('box.list.away') }}">
                                                Lista puszek <b>nierozliczonych</b>
                                            </a>
                                        </li>
                                    </ul>
                                @else
                                    <li>
                                        <a href="{{ route('box.find') }}">
                                            Rozlicz puszkę
                                        </a>
                                    </li>
                                @endif

                            </li>
                            {{-- Logowanie --}}
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true">
                                    Użytkownik: {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Wyloguj
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        {{-- Wiadomości i błędy --}}
        {{-- TODO Rework, duplicate code --}}
        <div class="container">
            @if(isset($message))
                <p class="alert alert-success col-sm-12" style="margin-left:2%;margin-right:2%; width:96%">{{ $message }}</p>
            @endif
            @if(isset($error))
                <p class="alert alert-danger col-sm-12" style="margin-left:2%;margin-right:2%; width:96%">{{ $error }}</p>
            @endif

            @if(Session::has('message'))
                <p class="alert alert-success col-sm-12" style="margin-left:2%;margin-right:2%; width:96%">{{ Session::get('message') }}</p>
            @endif
            @if(Session::has('error'))
                <p class="alert alert-danger col-sm-12" style="margin-left:2%;margin-right:2%; width:96%">{{ Session::get('error') }}</p>
            @endif

            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
        <br>

        <div class="container-fluid" id="content">
            @yield('content')
        </div>
    </div>

    <!-- Scripts -->
    @vite('resources/js/app.js')
    @stack('scripts')
</body>
</html>
