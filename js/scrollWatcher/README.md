#### Example usage
```js
scrollWatcher({
  target: document.getElementById('a'),
  scenes: [
    {
      offset: 100,
      action: function(target) {
        colorize(target, 'pink');
      },
      reset: function(target) {
        colorize(target, 'red');
      }
    },
    {
      offset: 400,
      action: function(target) {
        colorize(target, 'blue');
      },
      reset: function(target) {
        colorize(target, 'pink');
      }
    },
    {
      offset: 700,
      action: function(target) {
        target.style.transition = 'opacity .5s';
        target.style.opacity = '0';
      },
      reset: function(target) {
        target.style.opacity = '1';
      }
    }
  ]
});
```

#### See [jsfiddle](https://jsfiddle.net/nawawishkid/8kyaxL86/)
