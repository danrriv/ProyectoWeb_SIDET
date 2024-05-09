import { Customer } from './customer/customer';

describe('Customers', () => {
  it('should create an instance', () => {
    expect(new Customer()).toBeTruthy();
  });
});
