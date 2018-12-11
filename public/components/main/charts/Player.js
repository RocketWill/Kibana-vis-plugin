export default class Player {
  constructor(fullName, age, gender, hairColor) {
      this.fullName = fullName
      this.age = age
      this.gender = gender
      this.hairColor = hairColor
  }

  static test() {
    console.log('hello world');
  }

  toString() {
      return 'Name: '+this.fullName+', Age:'+this.age
  }
}