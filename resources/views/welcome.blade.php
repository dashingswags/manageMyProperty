<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Manage My Property</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="{{asset('/css/app.css')}}">
        <link rel="stylesheet" type="text/css" href="{{asset('/css/custom.css')}}">
        <script src="https://use.fontawesome.com/0b7d633a13.js"></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
    <script type="text/javascript" src="{{asset('/js/app.js')}}"></script>
</html>
