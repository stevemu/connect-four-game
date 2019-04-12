class Hi {

  constructor(nameService) {
    this.nameService = nameService;
  }

  speak() {
    return `hi, ${this.nameService.getName()}`;
  }

  async speakAsync() {
    let name = await this.nameService.getNameAsync();
    return `hi, ${name}`;
  }

}

module.exports = Hi;
