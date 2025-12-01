const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: 'http://localhost',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      
      on('task', {
        async seedDB() {
          const { exec } = require('child_process');
          return new Promise((resolve, reject) => {
            exec('cd ../services/express && npx ts-node src/scripts/seed.ts', (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error: ${error}`);
                return reject(error);
              }
              console.log(`stdout: ${stdout}`);
              console.error(`stderr: ${stderr}`);
              resolve(null);
            });
          });
        },
      });

      return config;
    },
  },
});
