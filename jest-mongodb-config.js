module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '4.0.2',
        skipMD5: true
      },
      instance: {
        dbName: 'testdb'
      },
      autoStart: false
    }
  };