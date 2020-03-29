import RequirementPredicate from "./RequirementPredicate";

class RequirementNot extends RequirementPredicate {
  constructor(requirements: any) {
    super(...[requirements]);
    this.requirements = requirements;
  }

  isSatisfied(credentials: any) {
    return !this.requirements.isSatisfied(credentials);
  }
}

export default RequirementNot;
