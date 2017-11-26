# addScreenSizeClassName
Add screen-size code, e.g. lg, md, sm, and sx, based on window.innerWidth, to the specified element.

Use with no options:
```javascript
addScreenSizeClassName.init();
```

Use with options:
```javascript
addScreenSizeClassName.init({
    breakPoint: {
        xl: 1360,
        lg: 1200,
        md: 1024,
        sm: 768,
        xs: 0
    },
    target: 'html, body, header'
});
```
