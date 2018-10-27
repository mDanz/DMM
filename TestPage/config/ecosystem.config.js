module.exports = {
  apps: [{
    name: 'AmberGame',
    script: './node_modules/serve/bin/serve.js',
    args: '-s build_webpack -l 3000'
  }],
  deploy: {
    development: {
      user: 'ubuntu',
      host: '18.223.40.236',
      key: '~/.ssh/SenjuDev2.pem',
      ref: 'origin/develop',
      repo: 'git@bitbucket.org:senjudev/ambergame.git',
      path: '/home/ubuntu/',
      'pre-deploy': 'pm2 delete AmberGame',
      'post-deploy': 'truffle compile && npm install && npm run build_dev && pm2 startOrRestart config/ecosystem.config.js'
    },
    production: {
      user: 'ubuntu',
      host: '18.218.58.166',
      key: '~/.ssh/UbuntuDev.pem',
      ref: 'origin/master',
      repo: 'git@bitbucket.org:senjudev/ambergame.git',
      path: '/home/ubuntu/',
      'pre-deploy': 'pm2 delete AmberGame',
      'post-deploy': 'truffle compile && npm install && npm run build_prod && pm2 startOrRestart config/ecosystem.config.js'
    }
  }
}