const { FeeRepository } = require('./repository');

class FeeService {
  private repository;

  constructor() {
    this.repository = new FeeRepository();
  }

  async CreateFee(args: any) {
    const Fee = await this.repository.CreateFee(args);
    return Fee;
  }

  async GetAllFees(args: { page: number; limit: number }) {
    const Fees = await this.repository.GetAllFees(args);
    return Fees;
  }

  async GetFeeById(id: number) {
    const Fee = await this.repository.GetFeeById(id);
    return Fee;
  }

  async UpdateFee(id: number, args: any) {
    const Fee = await this.repository.UpdateFee(id, args);
    return Fee;
  }
}

module.exports = FeeService;
