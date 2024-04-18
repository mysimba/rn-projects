module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-sqlite-storage': {
      platforms: {
        android: {
          sourceDir:
            '../node_modules/react-native-sqlite-storage/platforms/android-native',
          packageImportPath: 'import org.pgsqlite.SQLitePluginPackage;',
          packageInstance: 'new SQLitePluginPackage()',
        },
      },
    },
  },
};
