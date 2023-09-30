export class InvalidUpdateDataError extends Error {
  constructor(message?: string) {
    super(message || 'Update data must be a valid object. Please look at the update dto type');
    this.name = 'InvalidUpdateDataError';
  }
}

export default InvalidUpdateDataError;
