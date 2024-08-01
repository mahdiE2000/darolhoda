<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir='rtl'>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#303C54"/>

    <title>دارالهدی</title>

    <link rel="manifest" href="/manifest.webmanifest">

    @viteReactRefresh
    @vite('resources/js/index.jsx')
</head>

<body>
    <div id="app"></div>
</body>

</html>
