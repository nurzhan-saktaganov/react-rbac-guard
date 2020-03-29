import RequirementPredicate from "./RequirementPredicate";
import Requirement from "./Requirement";

class RequirementAll extends RequirementPredicate {
  requirements: Requirement[];

  constructor(requirements: Requirement[]) {
    super();
    this.requirements = requirements;
  }

  isSatisfied(credentials: any) {
    return this.requirements.every((r: Requirement) => r.isSatisfied(credentials));
  }
}

export default RequirementAll;
