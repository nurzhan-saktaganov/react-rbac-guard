import RequirementPredicate from "./RequirementPredicate";
import Requirement from "./Requirement";

class RequirementAny implements RequirementPredicate {
  requirements: Requirement[];

  constructor(requirements: Requirement[]) {
    this.requirements = requirements;
  }

  isSatisfied(credentials: any) {
    return this.requirements.some((r: Requirement) => r.isSatisfied(credentials));
  }
}

export default RequirementAny;
