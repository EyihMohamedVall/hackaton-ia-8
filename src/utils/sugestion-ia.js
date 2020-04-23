const brain = require('brain.js');

const ciriculumTrainingSet = require('../constants/curiculum-training-set');
const vocationTrainingSet = require('../constants/vocation-training-set');

class SuggestionIA {
  async trainModels() {
    this.ciriculumNet = new brain.recurrent.LSTM()
    await this.ciriculumNet.train(ciriculumTrainingSet, {
      log: (error) => console.log(error),
      logPeriod: 1000
    });
    this.vocationNet = new brain.recurrent.LSTM()
    await this.vocationNet.train(vocationTrainingSet, {
      log: (error) => console.log(error),
      logPeriod: 100  
    });
  }

  async getCiriculum(competences) {
    const ciriculum = await this.ciriculumNet.run(competences)
    return ciriculum
  }

  async getVocation(objectifs, interests) {
    const data = [{objectifs, interests}]
    const vocation = await this.vocationNet.run(data)
    return vocation
  }
}

module.exports = new SuggestionIA();
