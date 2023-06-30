# White label плагин

Для встраивания плагина, надо добавить код к себе.

Для синхронной загрузки:
```html
    <script 
        src="http://whitelabelplugin.tte.stage.tui.local/widget.js"
        id="fs-flight-search-widget-Script"
        data-config="{'name': 'w1', 'config': {'targetElementId': 'root','account': '<USER_UUID>','modules' : ['search']}}"
    ></script> 
```

Для асинхронной загрузки:
```html
<script> 
        (function (w, d, s, o, f, js, fjs) {
            w['fs-flight-search-widget'] = o; w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'w1', 'http://whitelabelplugin.tte.stage.tui.local/widget.js'));
        w1('init', {'targetElementId': 'root','account': '<USER_UUID>','modules' : ['search']});
    </script>
```

Где ```<USER_UUID>``` = uuid пользователя, который надо сгенерировать