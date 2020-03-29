import RequirementPredicate from "./RequirementPredicate";
import Requirement from "./Requirement";

class RequirementNot implements RequirementPredicate {
  requirement: Requirement;

  constructor(requirement: Requirement) {
    this.requirement = requirement;
  }

  isSatisfied(credentials: any) {
    return !this.requirement.isSatisfied(credentials);
  }
}

export default RequirementNot;
