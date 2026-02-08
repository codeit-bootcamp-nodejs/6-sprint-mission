module.exports = {
  apps: [
    {
      name: 'mission10',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',

      watch: false,
      autorestart: true,

      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
