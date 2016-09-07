exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [
    'features/**/*.feature'
  ],
  baseURL: 'http://localhost:3000',
  cucumberOpts: {
    format: "summary",
    require: ['features/step_definitions/**/*_steps.js']
  }
}
