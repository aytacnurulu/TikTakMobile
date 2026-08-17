module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // digər plugin-lər (module-resolver daxil) əvvəl
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: { '@': './src' },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg'],
      },
    ],
    'react-native-reanimated/plugin', // mütləq sonuncu
  ],
};
