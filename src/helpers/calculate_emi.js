function calculate_emi(principal, interest_rate, repayment_period) {
  let i = interest_rate / (12 * 100);
  let n = repayment_period * 12;
  let emi = (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  
  return Math.round(emi);
}
let principal = 50000;
let interest_rate = 6;
let repayment_period = 1;
let emi = calculate_emi(principal, interest_rate, repayment_period);
console.log(emi);