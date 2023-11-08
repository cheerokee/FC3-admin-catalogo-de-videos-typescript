export class InvalidCastMemberTypeError extends Error {
  constructor(message?: string) {
    super(message || 'Type must be a valid cast member type');
    this.name = 'InvalidCastMemberTypeError';
  }
}

export default InvalidCastMemberTypeError;
