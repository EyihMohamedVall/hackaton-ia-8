const SuggestionIA = require('./src/utils/sugestion-ia');
const app = require('./src/app');

(async () => {
  await SuggestionIA.trainModels();

  app.listen(8000, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Api running on port 8000`);
    });
})();
