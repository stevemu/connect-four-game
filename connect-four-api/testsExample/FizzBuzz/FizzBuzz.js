class FizzBuzz {

  perform(n) {

    if (n % 5 === 0 && n % 3 === 0) {
      return "FizzBuzz";
    } else if (n % 5 === 0 && n % 16 !== 0) {
      return "Buzz";
    } else if (n % 3 === 0 && n % 16 !== 0) {
      return "Fizz";
    } else if (n % 16 === 0) {
      return "ddd";
    } else {
      return n;
    }

  }

}

module.exports = FizzBuzz;
