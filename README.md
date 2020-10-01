# GULP BOILER PLATE

## Старт проекта

    npm i

	gulp run

## Архитектура стилей

    scss/
    |
    |– base/
    |   |- _base.scss // Общие стили
    |   |– _reset.scss
    |   |– _fonts.scss
    |   …
    |
    |– components/
    |   |– _buttons.scss
    |   |– _carousel.scss
    |   |– _cover.scss
    |   |– _dropdown.scss
    |   …
    |
    |– helpers/
    |   |– _variables.scss
    |   |– _functions.scss
    |   |– _mixins.scss
    |   |– _placeholders.scss
    |
    |– layout/
    |   |– _navigation.scss
    |   |– _grid.scss
    |   |– _header.scss
    |   |– _footer.scss
    |   |– _sidebar.scss
    |   |– _forms.scss
    |   …
    |
    |– pages ## если REACT, то containers
    |   |– _home.scss
    |   |– _contact.scss
    |   …
    |
    |– themes/ ## Опционально
    |   |– _theme.scss
    |   |– _admin.scss
    |   …
    |
    |– vendors/
    |   |– _bootstrap.scss
    |   |– _semantic-ui.scss
    |   …
    |
    `– main.scss

---

# Основные требования к scss компонентам

- Ко всем button, a, input, textarea должны быть описаны состояния :hover, :active, :focus и др.
- button может замениться на a (ссылка) без искажения стилей
- названия классов и переменных через дефис
- **Вложенность селекторов не должна быть больше 3!** (:before, :after за вложенности не считаем)

    .page-container {
    	.content {
    		.profile {
    			// Стоп!
    		}
    	}
    }

- Порядок написания стилей для элемента:

		.btn {
			@include transition(background 0.5s ease); // include
			background: #e2e2e2; // Стили элемента
			font-weight: bold;

			&:after, &:before { // Псевдоэлементы  
				content: '';
			}

			&.additional-class { // Стили для дополнительных классов элемента
				some_style: style;
			}

			.icon { // Дочерние элементы
				margin-right: 10px;
			}
		}

- директиву @extend следует избегать!

## Подключение шрифтов

Первое свойство src отвечает за изначальный шрифт, во втором свойстве подключается шрифт в различных форматах (По надобности)

P.S. Шрифты в разных форматах нужны для нормальной поддержки, некоторые браузеры не поддерживают шрифты определенного формата (Например IE не все поддерживает)

**Font converter:** 

[Online font converter](https://onlinefontconverter.com/)

    $stolzl: "../fonts/stolzl";
    
    // stolzl regular
    @font-face {
    	font-family: "stolzl";
    	font-style: normal;
    	font-weight: 400;
    	src: url("#{$stolzl}/Stolzl-Regular.eot");
    	src: url("#{$stolzl}/Stolzl-Regular.woff2") format("woff2"),
    	url("#{$stolzl}/Stolzl-Regular.woff") format("woff"),
    	url("#{$stolzl}/Stolzl-Regular.otf") format("opentype"),
    	url("#{$stolzl}/Stolzl-Regular.ttf") format("truetype"),
    	url("#{$stolzl}/Stolzl-Regular.svg#Stolzl-Regular") format("svg");
    }

Миксин на шрифт:

    @mixin stolzl-regular {
    	-webkit-font-smoothing: antialiased;
    	-moz-osx-font-smoothing: grayscale;
    	font: {
    		family: "stolzl";
    		weight: 400;
    	}
    }
