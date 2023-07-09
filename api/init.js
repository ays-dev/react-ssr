require('@babel/register')({
  presets: [
    ['env', {
      targets: {
        node: 'current'
      }
    }]
  ],
  plugins: [
    [
      'babel-plugin-transform-require-ignore',
      {
        extensions: ['.scss']
      }
    ]
  ]
});

require('./index');
